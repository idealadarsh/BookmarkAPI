'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { uuid } = require('uuidv4');
const app = express();
const db = require("./database.js");

const host = '127.0.0.1';
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({status: "active"});
});

app.post('/addBookmark', (req, res) => {
    var errors = [];
    if(!req.body.title){
        errors.push("Title not specified");
    }
    if(!req.body.link){
        errors.push("Link not specified");
    }
    if(!req.body.publisher){
        errors.push("Publisher not specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(", ")});
        return;
    }
    var data = {
        id: uuid(),
        link: req.body.link,
        title: req.body.title,
        time_created: Date.now(),
        time_updated: Date.now(),
        publisher: req.body.publisher,
        tags: (req.body.tags) ? req.body.tags : ""
    }
    var query = `INSERT INTO bookmarks VALUES (?,?,?,?,?,?,?)`;
    var params = [data.id, data.link, data.title, data.time_created, data.time_updated, data.publisher, data.tags];
    db.run(query, params, (err, result) => {
        if (err) {
          res.status(400).json({"error": err.message});
          return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        });
    });
});

app.get('/getBookmarks', (req, res) => {
    var query = `SELECT * FROM bookmarks`;
    var params = [];
    db.all(query, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error": err.message});
          return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

app.post('/updateBookmarkTag', (req, res) => {
    var errors = [];
    if(!req.body.id){
        errors.push("ID not specified");
    }
    if(!req.body.tags){
        errors.push("Tags not specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(", ")});
        return;
    }
    var data = {
        time_updated: Date.now(),
        tags: req.body.tags || "",
        id: req.body.id
    }
    var query = `UPDATE bookmarks SET time_updated = COALESCE(?,time_updated), tags = COALESCE(?,tags) WHERE id = ?`;
    var params = [data.time_updated, data.tags, data.id];
    db.run(query, params, (err, result) => {
        if (err) {
          res.status(400).json({"error": err.message});
          return;
        }
        res.json({
            "message": "updated",
            "data": data,
            "changes": this.changes
        });
    });
});

app.post('/deleteBookmark', (req, res) => {
    if(!req.body.id){
        res.status(400).json({"error":"ID not specified"});
        return;
    }
    var query = `DELETE FROM bookmarks WHERE id = ?`;
    var params = [req.body.id];
    db.run(query, params, (err, result) => {
        if (err) {
          res.status(400).json({"error": err.message});
          return;
        }
        res.json({
            "message": "deleted",
            "changes": this.changes
        });
    });
});

app.post('/addTag', (req, res) => {
    if(!req.body.title){
        res.status(400).json({"error": "Title not specified"});
        return;
    }
    var data = {
        id: uuid(),
        title: req.body.title,
        time_created: Date.now(),
        time_updated: Date.now(),
    }
    var query = `INSERT INTO tags VALUES (?,?,?,?)`;
    var params = [data.id, data.title, data.time_created, data.time_updated];
    db.run(query, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error": err.message});
          return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        });
    });
});

app.get('/getTags', (req, res) => {
    var query = `SELECT * FROM tags`;
    var params = [];
    db.all(query, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error": err.message});
          return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

app.post('/deleteTag', (req, res) => {
    if(!req.body.id){
        res.status(400).json({"error":"ID not specified"});
        return;
    }
    var query = `DELETE FROM tags WHERE id = ?`;
    var params = [req.body.id];
    db.run(query, params, (err, result) => {
        if (err) {
          res.status(400).json({"error": err.message});
          return;
        }
        res.json({
            "message": "deleted",
            "changes": this.changes
        });
    });
});

app.use((req, res) => {
    res.status(404);
});


// app.use((err, req, res, next) => {
//     if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
//         console.error(err);
//         return res.sendStatus(400);
//     }
//     next();
// });

app.listen({ host, port }, () => {
    console.log(`Express server started [${new Date().toLocaleTimeString()}] at http://${host}:${port}`);
});