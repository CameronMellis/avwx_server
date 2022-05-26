// Express server on port 3000

// Dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var expressSanitizer = require('express-sanitizer');

// App Config
mongoose.connect('mongodb://localhost/blog_app');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

// Mongoose/Model Config
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now },
});

// Mongoose/Model Config
var Blog = mongoose.model('Blog', blogSchema);

Blog.create({
  title: 'Test Blog',
  image:
    'https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8&auto=format&fit=crop&w=500&q=60',
  body: 'Hello this is a blog post',
});

// RESTful Routes
app.get('/', function (req, res) {
  res.redirect('/blogs');
});

// Index Route
app.get('/blogs', function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { blogs: blogs });
    }
  });
});

// New Route
app.get('/blogs/new', function (req, res) {
  res.render('new');
});

// Create Route
app.post('/blogs', function (req, res) {
  // Create blog
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, function (err, newBlog) {
    if (err) {
      res.render('new');
    } else {
      // Redirect to index
      res.redirect('/blogs');
    }
  });
});

// Show Route
app.get('/blogs/:id', function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('show', { blog: foundBlog });
    }
  });
});

// Edit Route
app.get('/blogs/:id/edit', function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('edit', { blog: foundBlog });
    }
  });
});

// Update Route
app.put('/blogs/:id', function (req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(
    req.params.id,
    req.body.blog,
    function (err, updatedBlog) {
      if (err) {
        res.redirect('/blogs');
      } else {
        res.redirect('/blogs/' + req.params.id);
      }
    }
  );
});

// Delete Route
app.delete('/blogs/:id', function (req, res) {
  // Destroy blog
  Blog.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs');
    }
  });
});

// Server Config
app.listen(3000, function () {
  console.log('Server is running');
});

// Return the current time
function getTime() {
  var date = new Date();
  var hour = date.getHours();
  hour = (hour < 10 ? '0' : '') + hour;
  var min = date.getMinutes();
  min = (min < 10 ? '0' : '') + min;
  var sec = date.getSeconds();
  sec = (sec < 10 ? '0' : '') + sec;
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = (month < 10 ? '0' : '') + month;
  var day = date.getDate();
  day = (day < 10 ? '0' : '') + day;
  return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
}
