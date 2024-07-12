const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3001;
const cors = require("cors");
const fs = require("fs");
const path = require("path");

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Directory where images will be stored
const uploadDir = path.join(__dirname, "uploads");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.get("/getPosts", function (req, res) {
  fs.readFile(path.join(__dirname, "posts.json"), "utf8", function (err, data) {
    if (err) {
      console.error("Error reading file: " + err);
      return res.status(500).send("Error reading file");
    }

    try {
      let allPosts = JSON.parse(data);
      res.json(allPosts);
    } catch (parseError) {
      console.error("Error parsing JSON: " + parseError);
      res.status(500).send("Error parsing JSON");
    }
  });
});

app.post("/savePost", function (req, res) {
  const data = req.body;
  const post = {
    pages: data.pages,
    title: data.title,
    des: data.description,
    link: data.link,
    forYou: data.forYou,
    type: data.type,
    date: data.date,
    img: data.imgSrc,
  };

  fs.readFile("posts.json", "utf-8", function (err, fileData) {
    if (err && err.code === "ENOENT") {
      // If the file does not exist, initialize with an empty array
      fileData = "[]";
    } else if (err) {
      console.log("Error reading file: " + err);
      return res.status(500).send("Error reading file");
    }

    let allPosts;
    try {
      allPosts = fileData ? JSON.parse(fileData) : [];
    } catch (parseErr) {
      console.log("Error parsing JSON: " + parseErr);
      return res.status(500).send("Error parsing JSON");
    }

    allPosts.push(post);

    fs.writeFile(
      "posts.json",
      JSON.stringify(allPosts, null, 2),
      function (err) {
        if (err) {
          console.log("Error writing file: " + err);
          return res.status(500).send("Error writing file");
        }
        console.log("Posts saved successfully");
        res.status(200).send("Post saved successfully");
      }
    );
  });
});

app.listen(port, function () {
  console.log("Server is running at http://localhost:" + port);
});
