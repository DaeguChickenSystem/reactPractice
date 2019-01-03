import express from 'express';
import Post from '../models/post';
import mongoose from 'mongoose';

const router = express.Router();


router.post('/list', (req, res) => {
    Post.find()
    .sort({"_id": -1})
    .exec((err, posts) => {
        if(err) throw err;
        res.json(posts);
    });
});


router.post('/detail', (req, res) => {
     console.log(req.body);
     console.log("버림받음 ");
    // CHECK MEMO ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.body.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }


    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 3
        });
    }

    // FIND POST

    Post.findById(req.body.id)
    .sort({"_id": -1})
    .exec((err, posts) => {
        if(err) throw err;
        res.json(posts);
    });

});


router.post('/add', (req, res) => {
    // CHECK LOGIN STATUS

   console.log("라우트");
   console.log(req.body);
     let newPost = req.body.list;

    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    // CHECK CONTENTS VALID
    if(typeof newPost.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if(newPost.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }


    console.log(req.session.loginInfo.username);
    // CREATE NEW MEMO
    let post = new Post({
        title: newPost.title,
        contents: newPost.contents,
        check: newPost.check,
        date: newPost.date,
        writer:req.session.loginInfo.username
    });
    // SAVE IN DATABASE
    post.save( err => {
      if(err) throw err;
      return
        Post.find()
        .sort({"date": -1})
        .limit(6)
        .exec((err, posts) => {
            if(err) throw err;
            res.json(posts);
        });
    });


});


router.post('/update', (req, res) => {
    // CHECK LOGIN STATUS
      console.log(req.body);
    let updatePost = req.body.arg;

   if(typeof req.session.loginInfo === 'undefined') {
         return res.status(403).json({
             error: "NOT LOGGED IN",
             code: 2
         });
     }

     // FIND MEMO
     Post.findById(updatePost._id, (err, post) => {
         if(err) throw err;

         // MEMO DOES NOT EXIST
         if(!post) {
             return res.status(404).json({
                 error: "NO RESOURCE",
                 code: 3
             });
         }

         // GET INDEX OF USERNAME IN THE ARRAY
         let index = post.starred.indexOf(req.session.loginInfo.username);

         post.title = updatePost.title;
         post.contents = updatePost.contents;
         post.check = updatePost.check;

         // SAVE THE MEMO
         post.save((err, post) => {
             if(err) throw err;
             res.json({
                 success: true,
                 post,
             });
         });
     });
});


export default router;
