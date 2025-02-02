import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import handlebars from 'handlebars';
import { I18nService } from './I18nService.js';
import { PdfService } from './PdfService.js';
import { logger } from './utils/logger.js';
import { registerHelpers } from './utils/handlebarsHelpers.js';
import i18next from 'i18next';

export class CVGenerator {
  constructor(config) {
    this.config = config;
    this.i18nService = new I18nService(config);
    this.pdfService = new PdfService(config);
    // Register Handlebars helpers with i18next instance
    registerHelpers(i18next);
  }

  async generate(lang) {
    try {
      await this.i18nService.init(lang);
      const data = await this.loadData(lang);
      const html = await this.renderTemplate(data);
      await this.pdfService.generate(html, this.getOutputPath(lang));
      logger.info(`Generated CV for language: ${lang}`);
    } catch (error) {
      logger.error('Failed to generate CV', error);
      throw error;
    }
  }

  async loadData(lang) {
    try {
      const data = yaml.load(await fs.promises.readFile('cv.yaml', 'utf8'));
      data.lang = lang;
      return data;
    } catch (error) {
      logger.error('Failed to load CV data', error);
      throw error;
    }
  }

  async renderTemplate(data) {
    try {
      const templateContent = await fs.promises.readFile('template.html', 'utf8');
      const template = handlebars.compile(templateContent);
      return template(data);
    } catch (error) {
      logger.error('Failed to render template', error);
      throw error;
    }
  }

  getOutputPath(lang) {
    return path.join(this.config.paths.output, `cv_${lang}.pdf`);
  }
}
