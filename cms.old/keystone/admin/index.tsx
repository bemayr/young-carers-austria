import type { AdminConfig } from '@keystone-6/core/types';

import { YoungCarersLogo } from "./logo";
import { Navigation } from './navigation';

export const components: AdminConfig['components'] = {
    Logo: YoungCarersLogo,
    Navigation: Navigation
}
