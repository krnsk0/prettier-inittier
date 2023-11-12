import { writeDefaultConfig } from './writeDefaultConfig';
import { writeFile } from 'fs/promises';
import { defaultConfigPath } from '../constants';
import { vi, describe, it, expect } from 'vitest';

vi.mock('fs/promises');

describe('writeDefaultConfig', () => {
  it('writes the default configuration to the file', async () => {
    await writeDefaultConfig();

    const expectedConfig = JSON.stringify(
      {
        trailingComma: 'es5',
        tabWidth: 2,
        semi: true,
        singleQuote: true,
      },
      null,
      2
    );

    expect(writeFile).toHaveBeenCalledWith(defaultConfigPath, expectedConfig);
  });
});
