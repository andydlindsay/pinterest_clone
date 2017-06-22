const express = require('express'),
      router = express.Router(),
      Post = require('../models/post');

// get all posts
router.get('/posts', (req, res) => {
    const itemsPerPage = req.query.itemsperpage;
    const currentPage = req.query.currentpage;
    Post.getPosts(itemsPerPage, currentPage, (err, docs) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to get posts.', errmsg: err.message });
        } else if (docs) {
            res.json({ success: true, posts: docs });
        } else {
            res.json({ success: false, msg: 'Failed to get posts.' });
        }
    });
});

// get post by id
router.get('/posts/:id', (req, res) => {
    const post_id = req.params.id;
    Post.getPostById(post_id, (err, doc) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to find post.', errmsg: err.message });
        } else if (doc) {
            res.json({ success: true, post: doc });
        } else {
            res.json({ success: false, msg: 'Failed to find post.' });
        }
    });
});

// get posts by user
router.get('/posts/byuser/:sub', (req, res) => {
    const sub = req.params.sub;
    const itemsPerPage = req.query.itemsperpage;
    const currentPage = req.query.currentpage;
    Post.getPostsByUser(sub, itemsPerPage, currentPage, (err, docs) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to find posts.', errmsg: err.message });
        } else if (docs) {
            res.json({ success: true, posts: docs });
        } else {
            res.json({ success: false, msg: 'Failed to find posts.' });
        }
    });
});

// export router
module.exports = router;
