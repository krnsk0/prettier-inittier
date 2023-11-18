import { installPrettier } from './installPrettier';
import { vi, describe, it, expect, Mock } from 'vitest';
import { exec } from 'shelljs';

vi.mock('shelljs', () => {
  return {
    exec: vi.fn().mockImplementation(() => {
      return {
        code: 0,
      };
    }),
  };
});

describe('installPrettier', () => {
  it('should install Prettier using yarn', async () => {
    await installPrettier('yarn');
    expect(exec).toHaveBeenCalledWith('yarn add --dev prettier', {
      silent: false,
    });
  });

  it('should install Prettier using npm', async () => {
    await installPrettier('npm');
    expect(exec).toHaveBeenCalledWith('npm install --save-dev prettier', {
      silent: false,
    });
  });

  it('should install Prettier using pnpm', async () => {
    await installPrettier('pnpm');
    expect(exec).toHaveBeenCalledWith('pnpm add --save-dev prettier', {
      silent: false,
    });
  });

  it('should reject if the installation fails', async () => {
    (exec as Mock).mockReturnValue({ code: 1, stderr: 'Installation failed' });

    try {
      await installPrettier('yarn');
    } catch (error) {
      expect(error.message).toBe(
        'Failed to install Prettier. Error: Installation failed'
      );
    }
  });
});
