const express = require("express");
const app = express();
const router = express.Router({ mergeParams: true });
const path = require("path");
const fs = require("fs");
const translate = require("./src/translate");

const defaultLocale = "en";

app.use(express.static("public"));

app.get("/", (_req, res) => res.redirect(`/${defaultLocale}`));

app.use("/:lang(en|cs)", router);
app.get("/:path", (req, res) => {
  console.log("REQ", req.headers.referer);
  const localeMatch = req.headers.referer?.match(
    /(?<=\/)[\w]{2}(?=[\/\s]|$)/gm
  );
  const locale =
    Array.isArray(localeMatch) && localeMatch.length > 0
      ? localeMatch[0]
      : defaultLocale;
  res.redirect(`/${locale}/${req.params.path}`);
});

const translateAndSend = (page, req, res) => {
  fs.readFile(
    path.join(__dirname, `pages/${page}.html`),
    "utf8",
    (err, data) => {
      if (err) {
        res.send(404);
      } else {
        res.send(translate(data, req.params.lang));
      }
    }
  );
};

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
router.get("/terms-of-use-en", (_req, res) => res.redirect("/terms-of-use"));
router.get("/privacy-en", (_req, res) => res.redirect("/privacy"));

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
