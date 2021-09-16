const router = require('express').Router();
const blogController = require('../controller/blog.controller');

router.post('/createBlog', blogController.addNew);
router.get('/getAllBlogs/:filter', blogController.getAll);
router.get('/getBlog/:id', blogController.getBlog);
router.get('/search/:key', blogController.getSearch);
router.patch('/updateBlog/:id', blogController.updateBlog);
router.delete('/deleteBlog/:id', blogController.deleteBlog);

module.exports = router;
