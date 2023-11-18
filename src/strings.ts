import { defaultConfigPath } from './constants';

export const EXITING = 'Exiting...';

export const ERROR = 'Hit an issue installing prettier:';

export const CHECKING_FOR_CONFIG = 'Checking for prettier-inittier config';

const EDIT_MESSAGE = `If you would like to customize the config that is written when invoking prettier-inittier, edit ${defaultConfigPath}`;

export const WRITE_CONFIG = `Writing default prettier-inittier config. ${EDIT_MESSAGE}`;

export const FOUND_CONFIG = `Found prettier-inittier config. ${EDIT_MESSAGE}`;

export const CHECKING_FOR_PACKAGE_JSON = 'Checking for package.json';

export const NO_PACKAGE_JSON =
  'No package.json found. Are you in a node project folder?';

export const FOUND_PACKAGE_JSON = 'Found package.json';

export const CHECK_FOR_PRETTIER = 'Checking for prettier installation';

export const DETERMINE_PACKAGE_MANAGER = "Determining user's package manager";

export const PRETTIER_ALREADY_INSTALLED = 'Prettier already installed';

export const PRETTIER_NOT_INSTALLED =
  'Prettier not installed; attempting install';

export const UNKNOWN_PACKAGE_MANAGER =
  'Unknown package manager; cannot proceed';

export const PACKAGE_MANAGER_FOUND = 'Package manager found:';

export const INSTALLED_PRETTIER = 'Installed prettier';

export const CREATING_LOCAL_CONFIG = 'Creating local prettier config';

export const DONE = 'prettier-inittier complete!';
