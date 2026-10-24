import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import vm from 'node:vm'

const source = readFileSync(new URL('../src/components/splitpanes/splitpanes.vue', import.meta.url), 'utf8')
const sizing = source.slice(source.indexOf('const equalizeAfterAddOrRemove ='), source.indexOf('/* const distributeEmptySpace ='))

for (const [name, values, expected] of [
  ['equal explicit sizes after adding a pane', [[100, 50], [50, 50]], [50, 50]],
  ['unequal explicit sizes after adding a pane', [[66, 66], [100, 34]], [66, 34]],
  ['an unspecified pane receives the remainder', [[100, 30], [0, null]], [30, 70]],
  ['a remaining pane fills the container after removal', [[50, 50]], [100]],
  ['explicit sizes still respect constraints', [[60, 60, 0, 60], [0, null]], [60, 40]]
]) {
  test(name, () => {
    const panes = { value: values.map(([size, givenSize, min = 0, max = 100], id) => ({ id, size, givenSize, min, max })) }
    const context = { panes, panesCount: { value: panes.value.length }, ready: { value: true }, console }
    vm.runInNewContext(sizing + '\nequalizeAfterAddOrRemove({ addedPane: panes.value.at(-1) })', context)
    assert.deepEqual(panes.value.map(p => p.size), expected)
    assert.equal(panes.value.reduce((sum, p) => sum + p.size, 0), 100)
  })
}
