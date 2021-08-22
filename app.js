require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

// ####################################
// ## Iteration 1: Spotify API Setup ##
// ####################################

// ### Require spotify-web-api-node package ###
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// ### Setting the spotify-api ###
const spotifyApi = new SpotifyWebApi({
   clientId: process.env.CLIENT_ID,
   clientSecret: process.env.CLIENT_SECRET
});

// ### Retrieve access token ###
spotifyApi
   .clientCredentialsGrant()
   .then(data => spotifyApi.setAccessToken(data.body['access_token']))
   .catch(error => console.log('Something went wrong when retrieving an access token', error));

// ### Route handlers ###

app.get('/', (req, res) => res.render('index'));

app.get('/artist-search', (req, res) => {
   const artist = req.query.artist;
   spotifyApi
      .searchArtists(artist)
      .then(data => {
         // console.log('The received data from the API: ', data.body.artists);
         res.render('artist-search-results', { data: data.body.artists.items });
      })
      .catch(err => console.log('The error while searching artists occurred: ', err));
});

app.get('/albums/:artistId', (req, res) => {
   // console.log(req.params);
   const artistId = req.params.artistId;
   spotifyApi
      .getArtistAlbums(artistId)
      .then(data => {
         // console.log('Artist albums', data.body.items);
         res.render('albums', { data: data.body.items });
      })
      .catch(err => console.log('The error while getting the artist\'s album occured: ', err));
});

app.get('/tracks/:albumId', (req, res) => {
   // console.log(req.params);
   const albumId = req.params.albumId;
   spotifyApi
      .getAlbumTracks(albumId)
      .then(data => {
         // console.log(data.body.items);
         res.render('tracks', { data: data.body.items });
      })
      .catch(err => console.log('The error while getting the album\'s tracks occured: ', err));
})

app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
