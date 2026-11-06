# Sector ZerØ Companion v0.3

Offline-first PWA with local work orders, build records, playtest reports, build lineage and development notes.

## Task sorting

Tasks default to Development Order: numeric `dorder`, numeric `order`, then original imported array position for ties. Numeric strings are accepted; missing, blank, nonnumeric and nonfinite values sort after valid numbers. Open First groups incomplete tasks before complete tasks, using development order within each group. Imported Order displays the original array order. All modes work with search and status/section filters.

Home shows the next five incomplete work orders in development order, independently of task filters or the selected mode. Sorting only changes the view. Its device-local preference survives reloads without writing to IndexedDB or changing backups.

## Data and compatibility

The public seed contains no work orders. Private JSON imports remain on the importing device; they must never be committed here. The app retains IndexedDB `sectorzero-companion` version 1, the `records` store and the `appstate` key. Existing state, tasks, baseline and metadata are not rewritten on launch. Optional `parentBuildId` and `playtests` fields are added only when builds or reports are saved. Complete backups retain format version 1 and accept v0.1 backups.

Playtests are linked to their build, with Draft/Completed status, a test date, outcome, climbing flow, issues, observations and next actions. Completing a report does not change build status or work orders. The dashboard shows report progress and builds that are Playtest pending, or Built without a completed report. Lineage references earlier-created build records.

## Update on Android

Export a complete backup from Backup & import tools. Open the installed app online, then fully close it and any open Companion browser tabs. Reopen it after the update has downloaded. Backup & import tools shows Companion v0.3. Keep site data and the installed app in place so existing records are retained.

## Tests

Run `npm install`, `npx playwright install chromium`, then `npm test`. Tests use the deployed v0.1 and v0.2 commits as upgrade baselines and synthetic records only. Sorting tests cover all modes, numeric ties, filters, dashboard selection, preference reloads, backups and the v0.2-to-v0.3 offline-cache update. It checks service-worker upgrade and offline loading, unchanged existing records, v0.1 backup imports, report/lineage workflows, backup round trips, failed-write rollback and protection of malformed stored records. Optional environment variables: `COMPANION_CHROMIUM_PATH`, `COMPANION_CHROMIUM_ARGS` (JSON array) and `COMPANION_TEST_SCREENSHOT`.
