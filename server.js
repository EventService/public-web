const express = require("express");
const app = express();
const router = express.Router({ mergeParams: true });
const path = require("path");

const defaultLocale = "en";

app.use(express.static("public"));

app.get("/", (_req, res) => res.redirect(`/${defaultLocale}`));

app.use("/:lang(en|cs)", router);
app.get("/:path", (req, res) =>
  res.redirect(`/${defaultLocale}/${req.params.path}`)
);

router.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, `pages/index.html`));
});
router.get("/faq", (_req, res) =>
  res.sendFile(path.join(__dirname, "pages/faq.html"))
);
router.get("/features", (_req, res) =>
  res.sendFile(path.join(__dirname, "pages/features.html"))
);
router.get("/news", (_req, res) =>
  res.sendFile(path.join(__dirname, "pages/news.html"))
);
router.get("/news/:blogId", (_req, res) => {
  res.sendFile(path.join(__dirname, "pages/blog.html"));
});
router.get("/premium", (_req, res) =>
  res.sendFile(path.join(__dirname, "pages/premium.html"))
);
router.get("/terms-of-use", (_req, res) =>
  res.sendFile(path.join(__dirname, "pages/terms-of-use.html"))
);
router.get("/privacy", (_req, res) =>
  res.sendFile(path.join(__dirname, "pages/privacy.html"))
);
router.get("/terms-of-use-en", (_req, res) =>
  res.sendFile(path.join(__dirname, "pages/terms-of-use-en.html"))
);
router.get("/privacy-en", (_req, res) =>
  res.sendFile(path.join(__dirname, "pages/privacy-en.html"))
);

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
