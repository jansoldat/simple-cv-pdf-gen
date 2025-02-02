import fs from 'fs';
import puppeteer from 'puppeteer';
import { logger } from './utils/logger.js';

export class PdfService {
  constructor(config) {
    this.config = config;
  }

  async generate(html, outputPath) {
    const browser = await puppeteer.launch({ headless: true });
    try {
      const page = await browser.newPage();
      const styledHtml = await this.addStyles(html);
      await page.setContent(styledHtml, { waitUntil: "networkidle0" });
      await page.pdf({
        path: outputPath,
        format: this.config.pdf.format,
        margin: this.config.pdf.margins,
        printBackground: true
      });
    } catch (error) {
      logger.error('Failed to generate PDF', error);
      throw error;
    } finally {
      await browser.close();
    }
  }

  async addStyles(html) {
    const css = await fs.promises.readFile('styles.css', 'utf8');
    return `<style>${css}</style>${html}`;
  }
}
