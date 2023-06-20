const en = require("./en");
const cs = require("./cs");

const replaceEmails = (text) => {
  let replacedText = text;
  const emails = replacedText.match(/[^\s]+@\w+.\w+/g);
  if (Array.isArray(emails) && emails.length > 0) {
    emails.forEach((email) => {
      replacedText = replacedText.replace(
        email,
        `<a href="mailto:${email}">${email}</a>`
      );
    });
  }
  return replacedText;
};

const replaceUrls = (text) => {
  let replacedText = text;
  const urls = replacedText.match(
    /(?<=[\s\.\\,:])(?:https?:\/\/)?(?:www\.)?[a-zA-Z_\-\.]+\.\w{2,}(?:\/[\w\/\-]+)?(?=[\s\.\\,:]?)/g
  );
  const uniqueUrls = Array.from(new Set(urls));
  if (Array.isArray(uniqueUrls) && uniqueUrls.length > 0) {
    uniqueUrls.forEach((url) => {
      replacedText = replacedText.replaceAll(
        url,
        `<a href="${!url.includes("http") ? "https://" : ""
        }${url}" rel="noopener noreferrer" target="blank">${url}</a>`
      );
    });
  }
  return replacedText;
};

const replaceTags = (text) => {
  return replaceUrls(replaceEmails(text));
};

const getLocalizedText = (text, locale) => {
  let localizationText;

  switch (locale) {
    case "cs":
      localizationText = cs;
      break;
    case "en":
    default:
      localizationText = en;
      break;
  }
  return resolve(text, localizationText);
};

const resolve = (path, obj) => {
  if (!path) {
    console.error("[Missing translation key]");
    return "[Missing translation key]";
  }

  const splitPath = path.split(".");

  return splitPath.reduce((prev, curr, index) => {
    if (
      !prev[curr] ||
      (index + 1 === splitPath.length && typeof prev[curr] !== "string")
    ) {
      console.error(`[Missing translation for ${path}]`);
      return `[Missing translation for ${path}]`;
    }
    if (typeof prev[curr] === "string") {
      return replaceTags(prev[curr]);
    }
    return prev[curr];
  }, obj);
};

module.exports = getLocalizedText;
