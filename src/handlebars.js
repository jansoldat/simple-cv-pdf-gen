export const registerHelpers = (handlebars, i18next) => {
  const helpers = {
    t: (key, options) => i18next.t(key, options.hash),

    translate: (section, id, field) => {
      const key = `content.${section}.${id}.${field}`;
      const value = i18next.t(key, { returnObjects: true });
      return Array.isArray(value) ? value : value ? [value] : [];
    },

    bold: (text) => text?.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") || '',

    concat: (...args) => args.slice(0, -1).join("")
  };

  Object.entries(helpers).forEach(([name, fn]) => {
    handlebars.registerHelper(name, fn);
  });
};
