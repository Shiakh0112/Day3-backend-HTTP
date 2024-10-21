const http = require("http");
const fs = require("fs");
const port = 8888;
// console.log(http);
const server = http
  .createServer((req, res) => {
    if (req.url === "/") {
      fs.readFile("./index.html", (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(500);
          return res.end("Error loading index.html");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    } else if (req.url === "/about") {
      fs.readFile("./about.html", (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(500);
          return res.end("Error loading about.html");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    } else if (req.url === "/contact") {
      fs.readFile("./contactus.html", (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(500);
          return res.end("Error loading contactus.html");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    } else if (req.url === "/index") {
      fs.readFile("./index.js", (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(500);
          return res.end("Error loading index.js");
        }
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(data);
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    }
  })
  .listen(3000);
console.log("hello server");
