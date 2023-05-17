const getLocalizedText = (text) => {
  let localizationText;
  const defaultLocale = "en";
  const localeMatch = window.location.pathname.match(/(?<=^\/)([a-z]{2})/gm);
  const locale =
    Array.isArray(localeMatch) && localeMatch.length > 0
      ? localeMatch[0]
      : defaultLocale;

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
  return path.split(".").reduce((prev, curr) => {
    return prev ? prev[curr] : null;
  }, obj || self);
};

const elements = document.getElementsByClassName("i18n");

const setPageContent = () => {
  Array.from(elements).forEach((element) => {
    element.innerHTML = getLocalizedText(element.getAttribute("data-i18n"));
  });
};
