import { describe, it, expect, vi, Mock } from 'vitest';
import { doesDefaultConfigExist } from './utils/doesDefaultConfigExist';
import { writeDefaultConfig } from './utils/writeDefaultConfig';
import { main } from './main';
import { checkForPackageJson } from './utils/checkForPackageJson';
import { checkForPrettierInstallation } from './utils/checkForPrettierInstallation';
import { createLocalConfig } from './utils/createLocalConfig';
import { detectPackageManager } from './utils/detectPackageManager';
import { installPrettier } from './utils/installPrettier';

vi.mock('./utils/doesDefaultConfigExist');
vi.mock('./utils/writeDefaultConfig');
vi.mock('./utils/checkForPackageJson');
vi.mock('./utils/detectPackageManager');
vi.mock('./utils/checkForPrettierInstallation');
vi.mock('./utils/installPrettier');
vi.mock('./utils/createLocalConfig');

describe('the main fn', () => {
  describe('should, with respect to the global config', () => {
    it('should write the default config if one does not exist', async () => {
      await main();
      expect(doesDefaultConfigExist).toHaveBeenCalled();
      expect(writeDefaultConfig).toHaveBeenCalled();
    });

    it('should not write the default config if one does exist', async () => {
      (doesDefaultConfigExist as Mock).mockReturnValue(true);
      await main();
      expect(doesDefaultConfigExist).toHaveBeenCalled();
      expect(writeDefaultConfig).not.toHaveBeenCalled();
    });
  });

  describe('should, with respect to the package.json', () => {
    it('should return early if no package json is found, never checking for prettier', async () => {
      (checkForPackageJson as Mock).mockReturnValue(false);

      await main();

      expect(checkForPrettierInstallation).not.toHaveBeenCalled();
    });

    it('should detect the package manager and return early if it is unknown, never checking for prettier', async () => {
      (checkForPackageJson as Mock).mockReturnValue(true);
      (detectPackageManager as Mock).mockReturnValue('unknown');

      await main();

      expect(checkForPackageJson).toHaveBeenCalled();
      expect(detectPackageManager).toHaveBeenCalled();
      expect(checkForPrettierInstallation).not.toHaveBeenCalled();
    });
  });

  describe('should, with respect to installing prettier', () => {
    it('should check for prettier installation and return early if already installed, not installing prettier', async () => {
      (checkForPackageJson as Mock).mockReturnValue(true);
      (detectPackageManager as Mock).mockReturnValue('npm');
      (checkForPrettierInstallation as Mock).mockReturnValue(true);

      await main();

      expect(checkForPrettierInstallation).toHaveBeenCalled();
      expect(installPrettier).not.toHaveBeenCalled();
    });

    it('should, when prettier is not installed, install it using the same package manager detected previously', async () => {
      const mockPackageManager = 'yarn';
      (checkForPackageJson as Mock).mockReturnValue(true);
      (detectPackageManager as Mock).mockReturnValue(mockPackageManager);
      (checkForPrettierInstallation as Mock).mockReturnValue(false);

      await main();

      expect(installPrettier).toHaveBeenCalledWith(mockPackageManager);
    });

    it('should create a local config file after installing prettier', async () => {
      (checkForPackageJson as Mock).mockReturnValue(true);
      (detectPackageManager as Mock).mockReturnValue('anything');
      (checkForPrettierInstallation as Mock).mockReturnValue(false);

      await main();

      expect(createLocalConfig).toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should catch and log any unexpected errors', async () => {
      const consoleErrorMock = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      (installPrettier as Mock).mockImplementationOnce(() => {
        throw new Error('Something went wrong');
      });

      (checkForPackageJson as Mock).mockReturnValue(true);
      (detectPackageManager as Mock).mockReturnValue('npm');
      (checkForPrettierInstallation as Mock).mockReturnValue(false);

      await main();

      expect(console.error).toHaveBeenCalledWith(
        'Hit an issue installing prettier:',
        new Error('Something went wrong')
      );

      consoleErrorMock.mockRestore();
    });
  });
});
