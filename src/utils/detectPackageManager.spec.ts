import { detectPackageManager } from './detectPackageManager'; // Import your module
import { vi, describe, it, expect, afterEach } from 'vitest';

const mockValues = {
  'bun.lock': false,
  'pnpm-lock.yaml': false,
  'yarn.lock': false,
  'package-lock.json': false,
};

const resetMockValues = () => {
  mockValues['bun.lock'] = false;
  mockValues['pnpm-lock.yaml'] = false;
  mockValues['yarn.lock'] = false;
  mockValues['package-lock.json'] = false;
};

vi.mock('fs/promises', () => {
  return {
    __esModule: true,
    access: vi.fn().mockImplementation((arg: string) => {
      if (mockValues[arg]) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('File not found'));
    }),
  };
});

describe('detectPackageManager', () => {
  afterEach(() => {
    resetMockValues();
  });

  it.only('should detect Yarn', async () => {
    mockValues['yarn.lock'] = true;
    const packageManager = await detectPackageManager();
    expect(packageManager).toBe('yarn');
  });

  it('should detect npm', async () => {
    mockValues['package-lock.json'] = true;
    const packageManager = await detectPackageManager();
    expect(packageManager).toBe('npm');
  });

  it('should detect pnpm', async () => {
    mockValues['pnpm-lock.yaml'] = true;
    const packageManager = await detectPackageManager();
    expect(packageManager).toBe('pnpm');
  });

  it('should detect bun', async () => {
    mockValues['bun.lock'] = true;
    const packageManager = await detectPackageManager();
    expect(packageManager).toBe('bun');
  });

  it('should return "unknown" if no lock file exists', async () => {
    mockValues['bun.lock'] = false;
    mockValues['pnpm-lock.yaml'] = false;
    mockValues['yarn.lock'] = false;
    mockValues['package-lock.json'] = false;
    const packageManager = await detectPackageManager();
    expect(packageManager).toBe('unknown');
  });
});
