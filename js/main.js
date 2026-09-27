/**
 * Entry point. Every page loads this one module; each feature module checks
 * for the elements it needs and does nothing if they are absent, so the same
 * entry point is safe to use across all three pages.
 */

import { initNav } from './nav.js';
import { initProjects } from './projects-view.js';

initNav();
initProjects();
