const http = require("http");
const os = require("os");
const fs = require("fs");
const port = 3000;

const getRandomDelay = () => Math.floor(Math.random() * 1000) + 500;

const requestHandler = (req, res) => {
  // CORS headers to allow cross-origin requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  setTimeout(() => {
    if (req.url === "/info") {
      const userInfo = {
        hostname: os.hostname(),
        platform: os.platform(),
        type: os.type(),
        release: os.release(),
        cpuModel: os.cpus()[0].model,
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        uptime: os.uptime(),
      };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(userInfo));
    } else {
      //   res.writeHead(200, { "Content-Type": "text/plain" });
      //   res.end("Server Running...");
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.readFile("index.html", (err, data) => {
        if (err) {
          res.writeHead(404);
          res.write("Error: File not found");
        }
        res.end(data);
      });
    }
  }, getRandomDelay());
};

const server = http.createServer(requestHandler);

server.listen(port, (error) => {
  if (error) {
    console.log("Something went wrong", error);
  } else {
    console.log("Server is running on http://localhost:" + port);
  }
});
