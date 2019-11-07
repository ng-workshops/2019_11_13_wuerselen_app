import { TranslocoConfig, TranslocoTestingModule } from '@ngneat/transloco';

const en = require('../src/assets/i18n/en.json');
const de = require('../src/assets/i18n/de.json');

export function getTranslocoModule(config: Partial<TranslocoConfig> = {}) {
  return TranslocoTestingModule.withLangs(
    { en, de },
    {
      availableLangs: ['en', 'de'],
      defaultLang: 'en',
      ...config
    }
  );
}
