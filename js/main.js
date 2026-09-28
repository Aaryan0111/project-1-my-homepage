// Loaded by all three pages. Each module checks for the elements it needs and
// does nothing if they are not there.

import { initNav } from './nav.js';
import { initProjects } from './projects-view.js';

initNav();
initProjects();
