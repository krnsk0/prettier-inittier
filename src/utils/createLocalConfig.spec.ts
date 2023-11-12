import { createLocalConfig } from './createLocalConfig';
import { copyFile } from 'fs/promises';
import { defaultConfigPath } from '../constants';
import { vi, describe, it, expect } from 'vitest';

vi.mock('fs/promises');

describe('createLocalConfig', () => {
  it('copies the default configuration to the destination file', async () => {
    await createLocalConfig();

    expect(copyFile).toHaveBeenCalledWith(defaultConfigPath, '.prettierrc');
  });
});
