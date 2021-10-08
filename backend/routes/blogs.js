const router = require('express').Router();
const blogController = require('../controller/blog.controller');

router.post('/blog/create', blogController.addNew);
router.get('/getAllBlogs/:filter', blogController.getAll);
router.get('/getBlog/:id', blogController.getBlog);
router.get('/search/:key', blogController.getSearch);
router.patch('/updateBlog/:id', blogController.updateBlog);
router.delete('/deleteBlog/:id', blogController.deleteBlog);
router.patch('/like/:id', blogController.likeBlog);

module.exports = router;
