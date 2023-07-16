const http = require("http");
const path = require("path");
const fs = require("fs");

function createURL(url, response) {
  let location = __dirname;

  switch (url) {
    case "/":
      response.statuscode = 200;
      return path.join(location, "index.html");
    case "/about":
      response.statuscode = 200;
      return path.join(location, "about.html");
    case "/contact-me":
      response.statuscode = 200;
      return path.join(location, "contact-me.html");
    default:
      response.statuscode = 404;
      return path.join(location, "404.html");
  }
}

http
  .createServer((req, res) => {
    console.log("request made");
    res.setHeader("Content-type", "text/html");
    fs.readFile(path.join(createURL(req.url, res)), (err, data) => {
      if (err) throw err;
      console.log(req.url);
      res.end(data);
    });
  })
  .listen(3001);
