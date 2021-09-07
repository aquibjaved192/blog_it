let User = require('../models/user.model');
let Blog = require('../models/blog.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  // api for user login
  login: (req, res) => {
    User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
      bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
        if (result) {
          const data = {
          data: { id: user._id, name: user.name, profession: user.profession },
          status: 200,
          message: 'success',
          };
          res.status(200).json(data);
        } else {
          const data = { data: [], status: 202, message: 'Incorrect Password!' };
          res.status(202).json(data);
        }
        })
        .catch((err) => res.status(400).json('Error: ' + err));
      } else {
      const data = { data: [], status: 201, message: 'Email not exists!' };
      res.status(201).json(data);
      }
    })
    .catch((err) => res.status(400).json('Error: ' + err));
  },

 // api for user registration

  signup: (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      const data = {
      data: [],
      status: 201,
      message: 'User already exists',
      };
      res.json(data);
    } else {
      bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      const email = req.body.email;
      const password = hash;
      const name = req.body.name;
      const profession = req.body.profession;
      const newUser = new User({ email, password, name, profession });
      newUser
        .save()
        .then(() => {
        const data = {
          data: [],
          status: 200,
          message: 'success',
        };
        res.json(data);
        })
        .catch((err) => res.status(400).json('Error: ' + err));
      });
    }
    });
  },

  // api to fetch user info for profile page
  
  getUser: async (req, res) => {
    let response = {};
    await User.findById(req.params.id)
      .then(async (user) => {
        const { name, email, createdAt, profession } = user;
        const authorId = req.params.id;
        response = { name, email, createdAt, profession, authorId };
      })
      .catch((err) => res.status(400).json('Error: ' + err));

    await Blog.find({ authorId: req.params.id })
      .then((blogs) => {
        blogs.forEach((blog) => {
          blog.content = blog.content.substring(0, 120);
        });

        blogs.sort((a, b) => b.postDate - a.postDate);
      
        const topBlogs = blogs.sort((a, b) => {
          return b.hits - a.hits;
        }).slice(0, 3);

        response.blogs = blogs;
        response.topBlogs = topBlogs;
      })
      .catch((err) => res.status(400).json('Error: ' + err));
      
      const data = { data: response };
      res.status(200).json(data);
  },
};
