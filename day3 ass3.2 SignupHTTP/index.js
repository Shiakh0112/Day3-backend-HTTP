const http = require("http");

const fs = require("fs");

const qs = require("querystring");

const port = 3000;

function loadPageWithNavbar(pageContent, res) {
  fs.readFile("Home.html", (err, homeData) => {
    if (err) {
      res.writeHad(500, { "content-type": "text/plain" });
      res.end("Error loading Home page");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(homeData + pageContent);
    }
  });
}

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("./Home.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading home");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/signup" && req.method === "GET") {
    fs.readFile("./signup.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading signup page");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/signup" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const formData = qs.parse(body);
      const username = formData.userName;
      const password = formData.password;
      fs.appendFile("user.txt", `${username},${password}\n`, (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error saving user data");
        } else {
          res.writeHead(302, { Location: "/" });
          res.end(
            "User registered successfully. You will be redirected to home page."
          );
          console.log("User registered successfully.");
        }
      });
    });
  } else if (req.url === "/allusers" && req.method === "GET") {
    fs.readFile("./user.txt", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading user data");
      } else {
        // Split the data into lines (each user is on a new line)
        const users = data
          .trim()
          .split("\n")
          .map((user) => {
            // Split each line into username and password
            const [username, password] = user.split(",");
            return { username, password };
          });

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(users)); // Send the users as JSON
      }
    });
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
