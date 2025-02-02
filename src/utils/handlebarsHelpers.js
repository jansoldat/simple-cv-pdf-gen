import handlebars from 'handlebars';
import { logger } from './logger.js';

export const registerHelpers = (i18next) => {
  handlebars.registerHelper("t", function (key, options) {
    return i18next.t(key, options?.hash);
  });

  handlebars.registerHelper("translate", function (section, id, field) {
    const key = `content.${section}.${id}.${field}`;
    const value = i18next.t(key, { returnObjects: true });
    if (Array.isArray(value)) {
      return value;
    }
    logger.warn(`Translation for ${key} is not an array`);
    return value ? [value] : [];
  });

  handlebars.registerHelper("bold", function (text) {
    if (!text) return '';
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  });

  handlebars.registerHelper("concat", function (...args) {
    return args.slice(0, -1).join("");
  });
};
