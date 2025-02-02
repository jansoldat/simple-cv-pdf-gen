import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import i18next from 'i18next';
import { logger } from './utils/logger.js';

export class I18nService {
  constructor(config) {
    this.config = config;
  }

  async init(lang) {
    try {
      const content = await this.loadTranslations(lang);
      await i18next.init({
        lng: lang,
        fallbackLng: this.config.defaultLang,
        resources: { [lang]: { translation: content } },
        interpolation: { escapeValue: false }
      });
    } catch (error) {
      logger.error(`Failed to initialize i18n for language: ${lang}`, error);
      throw error;
    }
  }

  async loadTranslations(lang) {
    const filePath = path.join(this.config.paths.locales, `${lang}.yaml`);
    return yaml.load(await fs.promises.readFile(filePath, 'utf8'));
  }
}
