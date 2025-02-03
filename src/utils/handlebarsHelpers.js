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

  handlebars.registerHelper("formatDate", function (dateStr) {
    if (!dateStr) return '';
    if (dateStr === 'Present') return i18next.t('date.present');

    const months = {
      'Jan': { en: 'Jan', cs: 'Led' },
      'Feb': { en: 'Feb', cs: 'Úno' },
      'Mar': { en: 'Mar', cs: 'Bře' },
      'Apr': { en: 'Apr', cs: 'Dub' },
      'May': { en: 'May', cs: 'Kvě' },
      'Jun': { en: 'Jun', cs: 'Čer' },
      'Jul': { en: 'Jul', cs: 'Čvc' },
      'Aug': { en: 'Aug', cs: 'Srp' },
      'Sep': { en: 'Sep', cs: 'Zář' },
      'Oct': { en: 'Oct', cs: 'Říj' },
      'Nov': { en: 'Nov', cs: 'Lis' },
      'Dec': { en: 'Dec', cs: 'Pro' }
    };

    const lang = i18next.language;

    // Split on dash if it exists
    const [startDate, endDate] = dateStr.split(' - ');

    const formatSingleDate = (date) => {
      const parts = date.split(' ');
      const month = parts[0];
      const year = parts[1];

      if (months[month] && months[month][lang]) {
        return `${months[month][lang]} ${year}`;
      }
      logger.warn(`Unknown month format: ${month}`);
      return date;
    };

    if (endDate) {
      return `${formatSingleDate(startDate)} - ${endDate === 'Present' ? i18next.t('date.present') : formatSingleDate(endDate)}`;
    }

    return formatSingleDate(startDate);
  });
};
