const router = require('express').Router();
const blogController = require('../controller/blog.controller');

router.post('/blog/create', blogController.addNew);
router.get('/getAllBlogs/:filter', blogController.getAll);
router.get('/getBlog/:id', blogController.getBlog);
router.get('/search/:key', blogController.getSearch);
router.patch('/updateBlog/:id', blogController.updateBlog);
router.delete('/deleteBlog/:id', blogController.deleteBlog);
router.patch('/blog/like/:id', blogController.likeBlog);
router.post('/blog/comment', blogController.blogComment);
router.get('/blog/comment/:id', blogController.getBlogComment);
router.patch('/blog/comment/like/:id', blogController.likeBlogComment);

module.exports = router;
