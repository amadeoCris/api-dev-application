const router = require('express').Router();
const { json } = require('body-parser');
const Post = require('../model/Post');
const verify = require('../routes/verifyToken');


//Get all user
router.get('/', verify, async (req,res) =>{
    try {
        const getPosts = await Post.find();
        res.json(getPosts);
    } catch (error) {
        res.json({message:error});
    }
 });

 //Submit a post
 router.post('/',verify, async (req, res)=>{
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savePost = await post.save();
        res.send(savePost);
    } catch (error) {
        res.status(400).send(error);
    }
 });

 //Get a specific post
 router.get('/:id', verify, async (req, res)=>{
    try {
        const getPost = await Post.findById(req.params.id);
        res.send(getPost);
    } catch (error) {
        res.status(400).send(error);
    }
 });

 //Delete a post
 router.delete('/:id', verify, async (req, res)=>{
    try {
        const removePost = await Post.deleteOne({_id: req.params.id});
        res.send(removePost);
    } catch (error) {
        res.status(400).send(error);
    }
 });

//Update a post
router.patch('/:id', verify, async (req, res) =>{
    try {
        const updatePost = await Post.updateOne(
            {_id: req.params.id},
            {$set : {
                title: req.body.title,
                description: req.body.description
            }}
        );
        res.send(updatePost);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;