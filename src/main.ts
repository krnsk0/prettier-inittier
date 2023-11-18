import {
  CHECKING_FOR_CONFIG,
  CHECKING_FOR_PACKAGE_JSON,
  CHECK_FOR_PRETTIER,
  CREATING_LOCAL_CONFIG,
  DETERMINE_PACKAGE_MANAGER,
  DONE,
  ERROR,
  FOUND_CONFIG,
  FOUND_PACKAGE_JSON,
  INSTALLED_PRETTIER,
  NO_PACKAGE_JSON,
  PACKAGE_MANAGER_FOUND,
  PRETTIER_ALREADY_INSTALLED,
  PRETTIER_NOT_INSTALLED,
  UNKNOWN_PACKAGE_MANAGER,
  WRITE_CONFIG,
} from './strings';
import { checkForPackageJson } from './utils/checkForPackageJson';
import { checkForPrettierInstallation } from './utils/checkForPrettierInstallation';
import { createLocalConfig } from './utils/createLocalConfig';
import { detectPackageManager } from './utils/detectPackageManager';
import { doesDefaultConfigExist } from './utils/doesDefaultConfigExist';
import { installPrettier } from './utils/installPrettier';
import { writeDefaultConfig } from './utils/writeDefaultConfig';

export const main = async () => {
  console.log(CHECKING_FOR_CONFIG);
  if (!doesDefaultConfigExist()) {
    console.log(WRITE_CONFIG);
    await writeDefaultConfig();
  } else {
    console.log(FOUND_CONFIG);
  }
  console.log(CHECKING_FOR_PACKAGE_JSON);
  try {
    if (!(await checkForPackageJson())) {
      console.log(NO_PACKAGE_JSON);
      return;
    }
    console.log(FOUND_PACKAGE_JSON);
    console.log(DETERMINE_PACKAGE_MANAGER);
    const packageManager = await detectPackageManager();
    if (packageManager === 'unknown') {
      console.log(UNKNOWN_PACKAGE_MANAGER);
      return;
    }
    console.log(PACKAGE_MANAGER_FOUND, packageManager);
    console.log(CHECK_FOR_PRETTIER);
    if (await checkForPrettierInstallation()) {
      console.log(PRETTIER_ALREADY_INSTALLED);
    } else {
      console.log(PRETTIER_NOT_INSTALLED);
      await installPrettier(packageManager);
      console.log(INSTALLED_PRETTIER);
    }
    console.log(CREATING_LOCAL_CONFIG);
    await createLocalConfig();
    console.log(DONE);
  } catch (error: unknown) {
    console.error(ERROR);
    console.error(error);
  }
};
