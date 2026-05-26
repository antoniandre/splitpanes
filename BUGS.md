# Splitpanes — Open Bugs

Confirmed code defects only (feature requests, usage questions, and unverifiable reports excluded).
All fixes target **v4.1.1**.

| # | Title | Status |
|---|-------|--------|
| [#160](https://github.com/antoniandre/splitpanes/issues/160) | Can drag pane beyond min-size | Fixed in v4.1.1 |
| [#168](https://github.com/antoniandre/splitpanes/issues/168) | Selection issue on start dragging | Fixed in v4.1.1 |
| [#188](https://github.com/antoniandre/splitpanes/issues/188) | Could not resize panes correctly due to their constraints | Warning by design when constraints conflict — see #246 fix |
| [#201](https://github.com/antoniandre/splitpanes/issues/201) | Min-size on any pane causing strange resizing | Fixed in v4.1.1 |
| [#202](https://github.com/antoniandre/splitpanes/issues/202) | Adding more than one panel at once causes incorrect/reversed panel order | Fixed in v4.1.1 |
| [#215](https://github.com/antoniandre/splitpanes/issues/215) | Bug when last panel has a minSize | Fixed in v4.1.1 |
| [#240](https://github.com/antoniandre/splitpanes/issues/240) | Throws 'can't access property "max"' when resizing panel quickly | Fixed in v4.1.1 |
| [#242](https://github.com/antoniandre/splitpanes/issues/242) | Abnormal initialization width transition in certain situations | Fixed in v4.1.1 |
| [#243](https://github.com/antoniandre/splitpanes/issues/243) | Cannot read properties of null (reading 'max') | Fixed in v4.1.1 (same root cause as #240) |
| [#245](https://github.com/antoniandre/splitpanes/issues/245) | Disappeared cursor on a splitter during the drag | Fixed in v4.1.1 |
| [#246](https://github.com/antoniandre/splitpanes/issues/246) | Size setting does not match actual measurements; when set to 0, the occupied width is 12.5 | Fixed in v4.1.1 |

## Excluded (not code defects)

| # | Reason |
|---|--------|
| [#187](https://github.com/antoniandre/splitpanes/issues/187) | User import/setup error |
| [#205](https://github.com/antoniandre/splitpanes/issues/205) | Browser-level ResizeObserver warning, not actionable in the library |
| [#212](https://github.com/antoniandre/splitpanes/issues/212) | User error; programmatic resize events fire correctly per other reports |
| [#164](https://github.com/antoniandre/splitpanes/issues/164) | No reproduction steps; touch code path exists and works elsewhere |
