const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const path = require("path");
const app = express();

app.use(router);

router.get("/", (req, res) => {
  res.send(`
    <html>
        <head>
        <title>Home</title>
        </head>
        <body>
            <form action="/upload" method="post" enctype="multipart/form-data">
                Upload Image:<input type="file" name="file"><br>
                <button type="submit">Submit</button>
            </form>
        </body> 
    </html>
  `);
});

router.post("/upload", (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtention = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.send("Error In File.");
    }
    // return res.send(path.join(__dirname, "images") + "/" + files.file.name);
    var oldpath = files.file.path;
    var newpath = path.join(__dirname, "images") + "/" + files.file.name;
    var rawData = fs.readFileSync(oldpath);

    fs.writeFile(newpath, rawData, (err) => {
      if (err) {
        console.log(err);
      }
      return res.send("Uploaded");
    });
  });
});
app.listen(4000, () => {
  console.log("Server Running...");
});
