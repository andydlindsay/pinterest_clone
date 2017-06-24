const express = require('express'),
      router = express.Router(),
      Post = require('../models/post'),
      jwt = require('express-jwt'),
      jwtAuthz = require('express-jwt-authz'),
      jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  aud: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

// const checkScopes = jwtAuthz(['write:posts']);

// add post (removed checkScopes from below June 21 2:20pm)
router.post('/posts/new', checkJwt, (req, res) => {
    const newPost = new Post({
        sub: req.body.sub,
        nickname: req.body.nickname,
        imageUrl: req.body.imageUrl,
        title: req.body.title || 'post by ' + req.body.nickname
    });
    if (req.body.tags !== undefined) {
        let tags = req.body.tags.split(',');
        newPost['tags'] = tags;
    }
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

// delete post
router.delete('/posts/:id', checkJwt, (req, res) => {
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

// fave a post
router.post('/fave/:id', checkJwt, (req, res) => {
    const post_id = req.params.id;
    const sub = req.body.sub;
    Post.favePost(post_id, sub, (err, doc) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to fave post.', errmsg: err.message });
        } else if (doc) {
            res.json({ success: true, post: doc });
        } else {
            res.json({ success: false, msg: 'Failed to fave post.' });
        }
    });
});

// unfave a post
router.post('/unfave/:id', checkJwt, (req, res) => {
    const post_id = req.params.id;
    const sub = req.body.sub;
    Post.unfavePost(post_id, sub, (err, doc) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to unfave post.', errmsg: err.message });
        } else if (doc) {
            res.json({ success: true, post: doc });
        } else {
            res.json({ success: false, msg: 'Failed to unfave post.' });
        }
    });
});

// export router
module.exports = router;
