const express = require('express'),
      router = express.Router(),
      Post = require('../models/post');

// get all posts
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
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

// delete post
router.delete('/:id', (req, res) => {
    const post_id = req.params.id;
    Post.deletePost(post_id, (err, doc) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to delete post.', errmsg: err.message });
        } else if (doc) {
            res.json({ success: true, msg: 'Post deleted.' });
        } else {
            res.json({ success: false, msg: 'Failed to delete post.' });
        }
    });
});

// get posts by user
router.get('/byuser/:sub', (req, res) => {
    const sub = req.params.sub;
    Post.getPostsByUser(sub, (err, docs) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to find posts.', errmsg: err.message });
        } else if (docs) {
            res.json({ success: true, posts: docs });
        } else {
            res.json({ success: false, msg: 'Failed to find posts.' });
        }
    });
});

// add post
router.post('/new', (req, res) => {
    let tags = req.body.tags.split(',');
    const newPost = new Post({
        sub: req.body.sub,
        username: req.body.username,
        imageUrl: req.body.imageUrl,
        title: req.body.title || 'post by ' + req.body.username,
        tags
    });
    Post.addPost(newPost, (err, doc) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to save post.', errmsg: err.message });
        } else if (doc) {
            res.json({ success: true, post: doc });
        } else {
            res.json({ success: false, msg: 'Failed to save post.' });
        }
    });
});

// export router
module.exports = router;
