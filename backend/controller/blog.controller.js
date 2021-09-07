let Blog = require('../models/blog.model');

module.exports = {
  // api to add a new blog
  addNew: (req, res) => {
    const data = {
    authorId: req.body.id,
    authorName: req.body.name,
    authorProfession: req.body.profession,
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
    postDate: req.body.date,
    hits: req.body.hits,
    };
    const newBlog = new Blog(data);
    newBlog
    .save()
    .then(() => {
      const data = { data: [], message: 'success', status: 200 };
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
  },

  // api to update a new blog
  updateBlog: async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    for(let key in req.body) {
      blog[key] = req.body[key];
    }
    blog.save()
    .then(() => {
      const data = { data: [], message: 'success', status: 200 };
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
  },

  //api to delete a blog using id

  deleteBlog : async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    blog.delete()
    .then(() => {
      const data = { data: [], message: 'success', status: 200 };
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
  },

  // api to fetch all blogs on home page

  getAll: (req, res) => {
    Blog.find()
    .then((blogs) => {
      blogs.forEach((blog) => {
        blog.content = blog.content.substring(0, 120);
      });
      blogs.sort((a, b) => b.postDate - a.postDate);
      const topBlogs = blogs.sort((a, b) => {
        return b.hits - a.hits;
      }).slice(0, 3);

      const data = { data: { blogs, topBlogs } };
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
  },

  // api to fetch a blog using id

  getBlog: (req, res) => {
    Blog.findById(req.params.id)
    .then(async (blog) => {
      blog.hits = blog.hits + 1;
      await blog.save();
      const data = { data: blog };
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
  },

  // api to fetch blogs using search by title

  getSearch: (req, res) => {
    Blog.find()
    .then((blogs) => {
      const matchedBlogs = [];
      blogs.forEach((blog) => {
      if (blog.title.toLowerCase().includes(req.params.key.toLowerCase())) {
        blog.content = blog.content.substring(0, 120);
        matchedBlogs.push(blog);
      }
      });
      matchedBlogs.sort((a, b) => b.postDate - a.postDate);
      const data = { data: matchedBlogs };
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
  },
};
