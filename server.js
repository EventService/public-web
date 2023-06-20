const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const translate = require("./src/translate");

app.use(express.static("public"));

const translateAndSend = (page, req, res) => {
  fs.readFile(
    path.join(__dirname, `pages/${page}.html`),
    "utf8",
    (err, data) => {
      if (err) {
        res.send(404);
      } else {
        let hostLocale = "en";

        switch (req.headers.host) {
          case "tymuj.cz":
            hostLocale = "cs";
            break;
          case "teamheadz.com":
          default:
            hostLocale = "en";
        }

        res.send(translate(data, hostLocale));
      }
    }
  );
};

app.get("/", (req, res) => translateAndSend("index", req, res));
app.get("/faq", (req, res) => translateAndSend("faq", req, res));
app.get("/features", (req, res) => translateAndSend("features", req, res));
app.get("/news", (req, res) => translateAndSend("news", req, res));
app.get("/news/:blogId", (req, res) => translateAndSend("blog", req, res));
app.get("/premium", (req, res) => translateAndSend("premium", req, res));
app.get("/privacy", (req, res) => translateAndSend("privacy", req, res));
app.get("/terms-of-use", (req, res) =>
  translateAndSend("terms-of-use", req, res)
);
// Support for legacy url
app.get("/terms-of-use-en", (_req, res) =>
  res.redirect(301, "https://teamheadz.com/terms-of-use")
);
app.get("/privacy-en", (_req, res) =>
  res.redirect(301, "https://teamheadz.com/privacy")
);

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
