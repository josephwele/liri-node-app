//requiring the packeges
var fs = require('fs')
require("dotenv").config()
var keys = require("./keys.js")
var axios = require('axios')
var moment = require('moment')
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify)
    // grap the input from the user her process.argv.length-1 is used not to include the actress name
var input = process.argv[2];
// inorder to get the last input from the user
var search = process.argv.slice(3, process.argv.length).join("+");
//fetching data by using axios inculind the user search on the url
//check user input by if condition
if (input === "movie-this") {
    //if user do put something
    if (search !== "") {
        var url = `http://www.omdbapi.com/?t=${search}&y=&plot=short&apikey=e757fda1`;
        fetch(url);
    } // if user does not put anything mr.Nobody will be displayed
    else {
        url = `http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=e757fda1`
        fetch(url);
    }
} else if (input === "spotify-this-song") {
    if (search !== "") {
        spotifySeach(search);
    } else {
        search = "The+Sign"
        spotifySeach(search);
    }

} else {
    console.log("errror");
}

function fetch(url) {
    axios.get(url)
        .then(function(response) {
            var data = `
                    * The movie Title ${response.data.Title}
                    * Year the movie came out ${response.data.Year}
                    * IMDB Rating of the movie ${response.data.imdbRating}
                    * Rotten Tomatoes Rating of the movie ${response.data.Ratings[1].Value}
                    * Country where the movie was produced ${response.data.Country}
                    * Language of the movie ${response.data.Language}
                    * Plot of the movie ${response.data.Plot}
                    * Actors in the movie ${response.data.Actors}
                    ====================================================================`;
            console.log(data);
            fs.appendFile('log.txt', data, function(err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("NOte:Search history added to log.text")
                }
            })

        })


}

function spotifySeach(search) {
    spotify.search({ type: 'track', query: `${search}` }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var data = `
        Name of the song: ${data.tracks.items[0].name}
        Artist's Name:${data.tracks.items[0].artists[0].name}
        Link to the song:${data.tracks.items[0].external_urls.spotify}
        release date:${moment(data.tracks.items[0].album.release_date).format("dddd MMMM Do YYYY")}
        Album Name:${data.tracks.items[0].album.name}
        ============================================================================================`
        console.log(data);
        fs.appendFile('log.txt', data, function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("NOte:Search history added to log.text")
            }
        })

    });

}