const http = require("http");
const https = require("https");
const hostname = "127.0.0.1";
const port = 8080;

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    const postId = Math.floor(Math.random() * 100) + 1;
    // Make a request to the JSONPlaceholder API
    https
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`, (apiRes) => {
        apiRes.setEncoding("utf8");
        let rawData = "";
        apiRes.on("data", (chunk) => {
          rawData += chunk;
        });
        apiRes.on("end", () => {
          try {
            let data = JSON.parse(rawData);
            data.requestDate = new Date(); // Add the date of the request
            data.author = "made up for 2nd attestation";
            res.end(JSON.stringify(data)); // send it back as JSON
          } catch (e) {
            console.error(e.message);
          }
        });
      })
      .on("error", (e) => {
        console.error(`Got error: ${e.message}`);
      });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
