
## Customization

### CV Content
Edit `cv.yaml` to update your personal information, experience, education, and skills.

### Translations
Add or modify translations in the `locales` directory:
- `en.yaml` for English
- `cs.yaml` for Czech
- Add new language files as needed

### Styling
Modify `styles.css` to customize the appearance of your CV.

### Template
Edit `template.html` to change the structure and layout of your CV.

## Available Helpers

### Handlebars Template Helpers

- `{{t "key"}}` - Translates text using the current language
- `{{translate "section" "id" "field"}}` - Retrieves translated content for specific sections
- `{{bold "text"}}` - Converts **text** to <strong>text</strong>
- `{{concat "a" "b"}}` - Concatenates strings

## Configuration

Edit `config.js` to modify:
- Default language
- Supported languages
- PDF format and margins
- File paths

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Author

Jan Soldat

## Dependencies

- handlebars - HTML templating
- i18next - Internationalization
- js-yaml - YAML parsing
- puppeteer - PDF generation
