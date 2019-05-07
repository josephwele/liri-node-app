//requiring the packeges
require("dotenv").config();
var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);
// grap the input from the user her process.argv.length-1 is used not to include the actress name
var input = process.argv.slice(2, process.argv.length - 1).join("");
// inorder to get the last input from the user
var search = process.argv[process.argv.length - 1];
console.log(input, search)