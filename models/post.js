// sub, username, imageUrl, title, faves, tags, ts
const mongoose = require('mongoose');

// post schema
const postSchema = mongoose.Schema({
    sub: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        trim: true
        // match: /(https?:\/\/)(www\.)?[-a-zA-Z0-9:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9\/:%_\+.~#?&//=]*)/ig
    },
    title: {
        type: String,
        trim: true
    },
    faves: [{
        type: String
    }],
    tags: [{
        type: String,
        trim: true
    }],
    ts: {
        type: Date,
        default: Date.now
    }
});

// export post
const Post = module.exports = mongoose.model("Post", postSchema, "posts");

// get all posts
module.exports.getPosts = function(callback) {
    Post.find()
        .sort({ 'ts': 'desc' })
        .exec(callback);
}

// get post by id
module.exports.getPostById = function(post_id, callback) {
    Post.findById(post_id, callback);
};

// delete post
module.exports.deletePost = function(post_id, callback) {
    Post.findByIdAndRemove(post_id, callback);
}

// get posts by user
module.exports.getPostsByUser = function(sub, callback) {
    const query = { sub };
    Post.find(query)
        .sort({ 'ts': 'desc' })
        .exec(callback);
};

// add post
module.exports.addPost = function(newPost, callback) {
    newPost.save(callback);
};

// fave a post
module.exports.favePost = function(post_id, sub, callback) {
    Post.find({ '_id': post_id, 'faves': sub }, (err, doc) => {
        if (err) {
            callback(err);
        }
        if (doc) {
            if (doc.length > 0) {
                console.log('You cannot fave a post twice.');
            } else {
                Post.findByIdAndUpdate(post_id, { $push: { 'faves': sub }}, callback);
            }
        }
    });    
}

// unfave a post
module.exports.unfavePost = function(post_id, sub, callback) {
    Post.findByIdAndUpdate(post_id, { $pull: { 'faves': sub }}, callback);
}
