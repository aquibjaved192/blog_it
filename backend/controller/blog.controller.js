let Blog = require('../models/blog.model');
let User = require('../models/user.model');
let Comment = require('../models/blogComment.model');

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
      blogs = await Blog.find().sort({ postDate: -1 });
    } else {
      const user = await User.findById(req.params.filter);
      const following = user.following;
      if(following.length > 0) {
        blogs = await Blog.find({authorId : {$in: following}}).sort({ postDate: -1 });
      } else {
        blogs = await Blog.find().sort({ postDate: -1 });
      }
    }
    blogs.forEach((blog) => {
      blog.content = blog.content.substring(0, 120);
    });
    const today = new Date().toISOString().slice(0, 10);

    const topBlogs = await Blog.find({postDate: {
      '$gte': `${today}T00:00:00.000Z`,
      '$lt': `${today}T23:59:59.999Z`
    }}).sort({ hits: -1 }).limit(3);
    
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
    const count = req.params.key.split('&')[1] === '5' ? 5 : 0;
    Blog.find({'title':{'$regex':req.params.key.split('&')[0],'$options':'i'}}).sort({postDate: -1}).limit(count)
    .then((blogs) => {
      blogs.forEach((blog) => {
        blog.content = blog.content.substring(0, 120).trim();
      });
      res.status(200).json({data : blogs});
    })
    .catch((err) => res.status(400).json('Error: ' + err));
  },

  likeBlog: async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    const user = req.body.user;
    const likes = Object.assign(blog.likes);
    const isLiked = likes.findIndex(item => item.id === user.id);
    if(isLiked !== -1) {
      likes.splice(isLiked, 1);
      blog.likes = likes;
    } else {
      blog.likes.push(user);
    }
    blog.save()
    .then(() => {
      const data = { data: blog.likes, message: 'success', status: 200 };
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
  },

  blogComment : (req, res) => {
    const data = req.body;
    data.likes = [];
    const comment = new Comment(data);
    comment
    .save()
    .then(() => {
      const data = { data: [], message: 'success', status: 200 };
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
  },

  getBlogComment: async (req, res) => {
    comments = await Comment.find({parentId: req.params.id, type: "comment"});
    const data = { data: comments };
    res.status(200).json(data);
  },

  getCommentReplies: async (req, res) => {
    comments = await Comment.find({parentId: req.params.id, type: "reply"});
    const data = { data: comments };
    res.status(200).json(data);
  },

  likeBlogComment: async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    const user = req.body.user;
    const likes = Object.assign(comment.likes);
    const isLiked = likes.findIndex(item => item.id === user.id);
    if(isLiked !== -1) {
      likes.splice(isLiked, 1);
      comment.likes = likes;
    } else {
      comment.likes.push(user);
    }
    comment.save()
    .then(() => {
      const data = { data: comment.likes, message: 'success', status: 200 };
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
  },

  deleteBlogComment: async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    comment.delete()
    .then(async () => {
      if(comment.type === 'comment') {
        await Comment.deleteMany({parentId: req.params.id, type: "reply"});
      }
      const data = { data: [], message: 'success', status: 200 };
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
  }
};
