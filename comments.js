//Create web server
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');

//Read file
let comments = fs.readFileSync('comments.json');
let commentsData = JSON.parse(comments);

//Create web server
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Get comments
app.get('/comments', (req, res) => {
    res.send(commentsData);
});

//Post comments
app.post('/comments', (req, res) => {
    //Create comment object
    let comment = {
        name: req.body.name,
        comment: req.body.comment,
        date: new Date()
    }
    //Push comment to array
    commentsData.push(comment);
    //Write comment to file
    fs.writeFileSync('comments.json', JSON.stringify(commentsData));
    //Send response
    res.send(comment);
});

//Listen on port
app.listen(port, () => console.log(`Example app listening on port ${port}!`));