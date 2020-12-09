const request = require("request");
const fs = require("fs");
const prompt = require('prompt-sync')();


var searchWord = prompt("Enter Search Word: ");

request(`https://icanhazdadjoke.com/search?term=${searchWord}`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}, function (err, res, body) {
    if (!err && res.statusCode == 200) {
        var jokesBody = JSON.parse(body);

        var jokes = jokesBody.results.map((joke) => {
            return joke.joke
        });

        var index = Math.floor(Math.random() * jokes.length);
        console.log(jokes[index]);

        fs.writeFile("jokes.txt", jokes[index], (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("File added successfully!");
            }
        })
    } else {
        console.log('No jokes where found for that keyword!');
    }
});