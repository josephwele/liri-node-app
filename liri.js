//requiring the packeges
require("dotenv").config()
var keys = require("./keys.js")
var axios = require('axios')
    //var spotify = new Spotify(keys.spotify);
    // grap the input from the user her process.argv.length-1 is used not to include the actress name
var input = process.argv[2];
// inorder to get the last input from the user
var search = process.argv.slice(3, process.argv.length).join("+");
//fetching data by using axios inculind the user search on the url
if (input === "movie-this" && search !== "") {
    var url = `http://www.omdbapi.com/?t=${search}&y=&plot=short&apikey=e757fda1`;
    fetch(url);
} else {
    url = `http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=e757fda1`
    fetch(url);
}




function fetch(url) {
    axios.get(url)
        .then(function(response) {
            console.log(`*The movie rating is:${response.data.Title}
 * Year the movie came out ${response.data.Year}
 * IMDB Rating of the movie ${response.data.imdbRating}
 * Rotten Tomatoes Rating of the movie ${response.data.Ratings[1].Value}
 * Country where the movie was produced ${response.data.Country}
 * Language of the movie ${response.data.Language}
 * Plot of the movie ${response.data.Plot}
 * Actors in the movie ${response.data.Actors}`);

        })
}