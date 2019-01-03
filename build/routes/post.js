'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _post = require('../models/post');

var _post2 = _interopRequireDefault(_post);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/list', function (req, res) {
    _post2.default.find().sort({ "_id": -1 }).limit(6).exec(function (err, posts) {
        if (err) throw err;
        res.json(posts);
    });
});

router.post('/add', function (req, res) {
    // CHECK LOGIN STATUS

    console.log("라우트");
    var newPost = req.body.list.slice(-1)[0];

    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    // CHECK CONTENTS VALID
    if (typeof newPost.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if (newPost.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    console.log(req.session.loginInfo.username);
    // CREATE NEW MEMO
    var post = new _post2.default({
        title: newPost.title,
        contents: newPost.contents,
        check: newPost.check,
        date: newPost.date,
        writer: req.session.loginInfo.username
    });
    // SAVE IN DATABASE
    post.save(function (err) {
        if (err) throw err;
        return;
        _post2.default.find().sort({ "date": -1 }).limit(6).exec(function (err, posts) {
            if (err) throw err;
            res.json(posts);
        });
    });
});

exports.default = router;