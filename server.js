const express = require("express");
const app = express();
const router = express.Router({ mergeParams: true });
const path = require("path");
const fs = require("fs");
const translate = require("./src/localization/index");
const proxy = require("express-http-proxy");

app.use(express.static("public"));

const translateAndSend = (page, req, res) => {
  fs.readFile(
    path.join(__dirname, `src/pages/${page}.html`),
    "utf8",
    (err, data) => {
      if (err) {
        res.send(404);
      } else {
        // This allows for separate logos/appName and translation
        let locale = "en";
        let host = "teamheadz";

        switch (req.headers.host) {
          case "www.tymuj.cz":
          case "tymuj.cz":
            locale = "cs";
            host = "tymuj";
            break;
          case "www.teamheadz.com":
          case "teamheadz.com":
          default:
            locale = "en";
            host = "teamheadz";
        }
        // If locale was used in originating page, redirect to correct locale
        if (req.headers.referer) {
          const localeMatch = req.headers.referer
            ? req.headers.referer.match(/(?<=\/)[\w]{2}(?=[\/\s]|$)/gm)
            : undefined;
          if (
            !req.params.lang &&
            Array.isArray(localeMatch) &&
            localeMatch.length > 0
          ) {
            res.redirect(`${localeMatch[0]}${req.originalUrl}`);
            return;
          }
        }
        // Override host default locales, if set in params
        if (req.params.lang) {
          locale = req.params.lang;
        }

        res.send(translate(data, host, locale));
      }
    }
  );
};

app.use("/:lang(en|cs)?", router);

router.get("/", (req, res) => translateAndSend("index", req, res));
router.get("/faq", (req, res) => translateAndSend("faq", req, res));
router.get("/features", (req, res) => translateAndSend("features", req, res));
router.get("/news", (req, res) => translateAndSend("news", req, res));
router.get("/news/:blogId", (req, res) => translateAndSend("blog", req, res));
router.get("/premium", (req, res) => translateAndSend("premium", req, res));
router.get("/privacy", (req, res) => translateAndSend("privacy", req, res));
router.get("/terms-of-use", (req, res) =>
  translateAndSend("terms-of-use", req, res)
);

// Support for legacy url
app.get("/terms-of-use-en", (_req, res) =>
  res.redirect(301, "/en/terms-of-use")
);
app.get("/privacy-en", (_req, res) => res.redirect(301, "/en/privacy"));

// Fallback
app.get(
  "*",
  proxy("109.205.73.82", {
    https: true,
    proxyReqOptDecorator: (proxyReqOpts) => {
      proxyReqOpts.headers = { host: "tymuj.cz" };
      proxyReqOpts.rejectUnauthorized = false;
      return proxyReqOpts;
    },
  })
);

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Public web server listening at http://localhost:${port}`)
);
