const getLocalizedText = require("./localization/index");

const translate = (text, locale) => {
  const matches = text.match(/(?<={{).*?(?=}})/gm);
  let replacedText = text;
  if (Array.isArray(matches) && matches.length > 0) {
    matches.forEach((match) => {
      replacedText = replacedText.replace(
        `{{${match}}}`,
        getLocalizedText(match, locale)
      );
    });
  }
  return replacedText;
};

module.exports = translate;
