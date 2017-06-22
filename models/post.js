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
        trim: true,
        match: /(https?:\/\/)(www\.)?[-a-zA-Z0-9:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9\/:%_\+.~#?&//=]*)/ig
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
module.exports.getPosts = function(itemsPerPage, currentPage, callback) {
    const currPage = Number(currentPage) || 1;
    Post.find()
        .sort({ 'ts': 'desc' })
        .skip(Number(itemsPerPage) * (currPage - 1))
        .limit(Number(itemsPerPage))
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
module.exports.getPostsByUser = function(sub, itemsPerPage, currentPage, callback) {
    const currPage = Number(currentPage) || 1;
    const query = { sub };
    Post.find(query)
        .sort({ 'ts': 'desc' })
        .skip(Number(itemsPerPage) * (currPage - 1))
        .limit(Number(itemsPerPage))
        .exec(callback);
};

// add post
module.exports.addPost = function(newPost, callback) {
    newPost.save(callback);
};

// fave a post
module.exports.favePost = function(post_id, sub, callback) {
    Post.findByIdAndUpdate(post_id, { $push: { 'faves': sub }}, callback);
}

// unfave a post
module.exports.unfavePost = function(post_id, sub, callback) {
    Post.findByIdAndUpdate(post_id, { $pull: { 'faves': sub }}, callback);
}