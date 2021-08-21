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

app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
