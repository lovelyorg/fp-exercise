import E from './ch4-curry.js'
import { strict as assert } from 'assert'

// '练习1'
assert.deepEqual(E.words('wang da'), ['wang', 'da'])
assert.deepEqual(E.words('Jingle bells Batman smells'), ['Jingle', 'bells', 'Batman', 'smells'])

// '练习1a'
assert.deepEqual(E.sentences(['wang da', 'Jingle bells']), [
  ['wang', 'da'],
  ['Jingle', 'bells'],
])

// 练习 2
assert.deepEqual(E.filterQs(['a', 'b', 'qq', 'aQ']), ['qq', 'aQ'])

// 练习 3
assert.deepEqual(E.max()([1, 2, 30, 5]), 30)

// 彩蛋 1
assert.deepEqual(E.slice(0)(3)([1, 2, 3, 4]), [1, 2, 3])

// 彩蛋 2
assert.deepEqual(E.take(2)('abc'), 'ab')
