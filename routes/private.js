const express = require('express'),
      router = express.Router(),
      Post = require('../models/post'),
      jwt = require('express-jwt'),
    //   jwtAuthz = require('express-jwt-authz'),
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
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

// const checkScopes = jwtAuthz(['write:posts']);

// add post (removed checkScopes from below June 21 2:20pm)
router.post('/new', checkJwt, (req, res) => {
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

// delete post
router.delete('/:id', checkJwt, (req, res) => {
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

// export router
module.exports = router;
