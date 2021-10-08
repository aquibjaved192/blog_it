let Blog = require('../models/blog.model');
let User = require('../models/user.model');

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
    likes: [],
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

  getAll: async (req, res) => {
    const filter = req.params.filter;
    let blogs = [];

    if (filter === 'all') {
      blogs = await Blog.find();
    } else {
      const user = await User.findById(req.params.filter);
      const following = user.following;
      if(following.length > 0) {
        blogs = await Blog.find({authorId : {$in: following}});
      } else {
        blogs = await Blog.find();
      }
    }
     
    blogs.forEach((blog) => {
      blog.content = blog.content.substring(0, 120);
    });
    blogs.sort((a, b) => b.postDate - a.postDate);
    const topBlogs = blogs.sort((a, b) => {
      return b.hits - a.hits;
    }).slice(0, 3);

    const data = { data: { blogs, topBlogs } };
    res.status(200).json(data);
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
    Blog.find({'title':{'$regex':req.params.key.split('&')[0],'$options':'i'}})
    .then((blogs) => {
      const matchedBlogs = [];
      blogs.forEach((blog) => {
        blog.content = blog.content.substring(0, 120);
        matchedBlogs.push(blog);
      });
      matchedBlogs.sort((a, b) => b.postDate - a.postDate);
      const count = req.params.key.split('&')[1];
      const data = { data: count==='5' ? matchedBlogs.slice(0, 5) : matchedBlogs };
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
  },

  likeBlog: async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    const userId = req.body.userId;
    const likes = Object.assign(blog.likes);
    if(likes.includes(userId)) {
      const index = likes.indexOf(userId);
      likes.splice(index, 1);
      blog.likes = likes;
    } else {
      blog.likes.push(userId);
    }
    blog.save()
    .then(() => {
      const data = { data: blog.likes.length, message: 'success', status: 200 };
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
  }
};
