import { config } from './config.js';
import { CVGenerator, logger } from './src/index.js';

const main = async () => {
  try {
    const lang = process.argv[2] || config.defaultLang;
    if (!config.supportedLangs.includes(lang)) {
      throw new Error(`Unsupported language: ${lang}`);
    }
    const generator = new CVGenerator(config);
    await generator.generate(lang);
  } catch (err) {
    logger.error('CV generation failed', err);
    process.exit(1);
  }
};

main();
