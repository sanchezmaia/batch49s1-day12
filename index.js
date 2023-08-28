const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");
const { title } = require("process");

// setup call hbs with sub folder
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// set serving static file
app.use(express.static("src/assets"));

// parsing data from client
app.use(express.urlencoded({ extended: false }));

// dummy data
const dataBlog = [
  {
    // id:1,
    title: "Aplikasi Website untuk Company Profile",
    content: "Membuat aplikasi sederhana untuk company profile yang ada di seluruh indonesia",
    author: "Sancho de deus maia",
    postedAt: new Date(),
  },
  {
    // id: 2,
    title: "Aplikasi Android dengan tema untuk busnis",
    content: "Membuat Aplikasi android untuk company busnis yang ada di seluruh indonesia",
    author: "Sancho de deus maia",
    postedAt: new Date(),
  },
];

// routing
app.get("/home");
app.get("blog", blog);
app.get("/project", project);
app.get("/contact", contact);
app.get("/blog-detail/:id", blogDetail);
app.get("/form-blog", formBlog);

// local server
app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});

// INDEX
function home(req, res) {
  res.render("index");
}

// blog
function blog(req, res) {
  res.render("blog", { dataBlog });
}

// form blog
function formBlog(req, res) {
  res.render("form-blog");
}

// add a new Blog
function addBlog(req, res) {
  const { title, content } = req.body;

  const data = {
    title,
    content,
    image: "web.png",
    author: "Sancho",
    postedAt: new Date(),
  };

  dataBlog.push(data);
  res.rendirect("/blog");
}

// contact me
function contact(req, res) {
  res.render("contact");
}

// blog detail
function blogDetail(req, res) {
  const { id } = req.params;

  res.render("blog-detail", { blog: dataBlog[id] });
}

function deleteBlog(req, res) {
  const { id } = req.params;

  dataBlog.splice(id, 1);
  res.redirect("/blog");
}
