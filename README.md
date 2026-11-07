# Sector ZerØ Companion v0.4 — development preview

**Not deployed. Production remains v0.3.** Development branch: `companion-v0.4`, starting from `141ef90006361171a1e6a0896ec461cabd171b8a`.

See [implementation report and review checklist](IMPLEMENTATION_REPORT.md) for the feature summary, exact data fields, preservation evidence, tests, limitations and screenshots.

## Review safely

Inspect the screenshots below on Android without changing the installed app. For interactive review on a computer, check out this branch and run `npm run review` (Node 20+). Open `http://localhost:4044/` in a separate browser profile. Download the **synthetic** demo backup from the review banner and import that into the preview. This is a separate origin from GitHub Pages and does not replace the installed production PWA. Do not change GitHub Pages settings or serve a preview under the production origin.

The local preview has its own origin-scoped IndexedDB and service worker. Keep the live app installed and do not clear its site data. No private backup is needed for review.

## Screenshots — synthetic demo records only

[Home](review-home.png) · [Build list](review-builds.png) · [Visual lineage](review-lineage.png) · [Playtest editor](review-playtest.png) · [The Shaft](review-shaft.png) · [Idle Ascent](review-idle.png)

## v0.4 features

- Explicit active-build selection, ancestry-correct approval and pending-test information, recent activity.
- Active/Historical classification independent of approval, retaining unclassified builds under All.
- Tappable branching lineage with missing-parent and circular-import safeguards.
- Optional climbing assessments, ratings, hammer/jump/recovery/problem/verdict fields.
- History API Back navigation and unsaved-change protection for every editor.
- Fourteen-band Shaft, structured coverage editing and union-based approved progress.
- Restrained terminal messages derived only from saved development data.
- Hidden Idle Ascent: tap the header Ø five times; original lightweight pixel machinery, optional muted sound, separate saving.

## Task sorting

Tasks default to Development Order: numeric `dorder`, numeric `order`, then original imported array position for ties. Numeric strings are accepted; missing, blank, nonnumeric and nonfinite values sort after valid numbers. Open First groups incomplete tasks before complete tasks, using development order within each group. Imported Order displays the original array order. All modes work with search and status/section filters.

Home shows the next five incomplete work orders in development order, independently of task filters or the selected mode. Sorting only changes the view. Its device-local preference survives reloads without writing to IndexedDB or changing backups.

## Data and compatibility

The public seed contains no work orders. Private JSON imports remain on the importing device; they must never be committed here. The app retains IndexedDB `sectorzero-companion` version 1, the `records` store and the `appstate` key. Existing state, tasks, baseline and metadata are not rewritten on launch. Optional `parentBuildId` and `playtests` fields are added only when builds or reports are saved. Complete backups retain format version 1 and accept v0.1, v0.2 and v0.3 backups.

Playtests are linked to their build, with Draft/Completed status, a test date, outcome, climbing flow, issues, observations and next actions. Completing a report does not change build status or work orders. The dashboard shows report progress and builds that are Playtest pending, or Built without a completed report. Lineage preserves saved parent references and prevents new circular relationships.

## Update on Android

Export a complete backup from Backup & import tools. Open the installed app online, then fully close it and any open Companion browser tabs. Reopen it after the update has downloaded. This branch is a preview: do not update production until explicitly approved. The preview identifies itself as Companion v0.4. Keep site data and the installed app in place so existing records are retained.

## Tests

Run `npm install`, `npx playwright install chromium`, then `npm test`. Tests use the deployed v0.1, v0.2 and v0.3 commits as upgrade baselines and synthetic records only. Sorting tests cover all modes, numeric ties, filters, dashboard selection, preference reloads, backups and the v0.2-to-current offline-cache update. It checks service-worker upgrade and offline loading, unchanged existing records, v0.1 backup imports, report/lineage workflows, backup round trips, failed-write rollback and protection of malformed stored records. Optional environment variables: `COMPANION_CHROMIUM_PATH`, `COMPANION_CHROMIUM_ARGS` (JSON array) and `COMPANION_TEST_SCREENSHOT`.
