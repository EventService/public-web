const en = require("./en");
const cs = require("./cs");
const tymuj = require("./tymuj");
const teamheadz = require("./teamheadz");

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

const getLocalizedText = (text, locale, host) => {
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

  return replaceTags(translateHost(resolve(text, localizationText), host));
};

const getLocalizedHost = (text, host) => {
  let localizationHost;

  switch (host) {
    case "tymuj":
      localizationHost = tymuj;
      break;
    case "teamheadz":
    default:
      localizationHost = teamheadz;
      break;
  }
  return resolve(text, localizationHost);
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
    return prev[curr];
  }, obj);
};

const translateHost = (text, host) => {
  const matches = text.match(/(?<={{).*?(?=}})/gm);
  let replacedText = text;
  if (Array.isArray(matches) && matches.length > 0) {
    matches.forEach((match) => {
      replacedText = replacedText.replace(
        `{{${match}}}`,
        getLocalizedHost(match, host)
      );
    });
  }
  return replacedText;
};

const translate = (text, host, locale) => {
  const matches = text.match(/(?<={{).*?(?=}})/gm);
  let replacedText = text;
  if (Array.isArray(matches) && matches.length > 0) {
    matches.forEach((match) => {
      replacedText = replacedText.replace(
        `{{${match}}}`,
        getLocalizedText(match, locale, host)
      );
    });
  }
  return replacedText;
};

module.exports = translate;
