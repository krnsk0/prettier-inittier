import { doesDefaultConfigExist } from './doesDefaultConfigExist';
import { vi, describe, it, expect, Mock } from 'vitest';
import { existsSync } from 'fs';

vi.mock('fs');

describe('the doesDefaultConfigExist function', () => {
  it('should return true if the default config exists', () => {
    (existsSync as Mock).mockReturnValue(true);
    expect(doesDefaultConfigExist()).toBe(true);
  });

  it('should return false if the default config does not exist', () => {
    (existsSync as Mock).mockReturnValue(false);
    expect(doesDefaultConfigExist()).toBe(false);
  });
});
