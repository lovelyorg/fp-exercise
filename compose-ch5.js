var R = require('ramda')
const assert = require('assert').strict

// var accounting = require('accounting')

// 示例数据
var CARS = [
  { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
  { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
  { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
  { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
  { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
  { name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false },
]

// 练习 1:
// ============
// 使用 _.compose() 重写下面这个函数。提示：_.prop() 是 curry 函数
var isLastInStock = function (cars) {
  var last_car = _.last(cars)
  return _.prop('in_stock', last_car)
}
isLastInStock = R.compose(R.prop('in_stock'), R.last)
assert.deepEqual(isLastInStock(CARS), false)

// 练习 2:
// ============
// 使用 _.compose()、_.prop() 和 _.head() 获取第一个 car 的 name
var nameOfFirstCar = R.compose(R.prop('name'), R.head)
assert.deepEqual(nameOfFirstCar(CARS), 'Ferrari FF')

// 练习 3:
// ============
// 使用帮助函数 _average 重构 averageDollarValue 使之成为一个组合
var _average = function (xs) {
  return R.reduce(R.add, 0, xs) / xs.length
} // <- 无须改动

var averageDollarValue = function (cars) {
  var dollar_values = map(function (c) {
    return c.dollar_value
  }, cars)
  return _average(dollar_values)
}
averageDollarValue = R.compose(_average, R.map(R.prop('dollar_value')))
assert.deepEqual(averageDollarValue(CARS), 790700)

// 练习 4:
// ============
// 使用 compose 写一个 sanitizeNames() 函数，返回一个下划线连接的小写字符串：例如：sanitizeNames(["Hello World"]) //=> ["hello_world"]。
var _underscore = R.replace(/\W+/g, '_') //<-- 无须改动，并在 sanitizeNames 中使用它

var sanitizeNames = R.map(R.compose(R.toLower, _underscore))
assert.deepEqual(sanitizeNames(['Hello World']), ['hello_world'])

// 彩蛋 1:
// ============
// 使用 compose 重构 availablePrices
var availablePrices = function (cars) {
  var available_cars = _.filter(_.prop('in_stock'), cars)
  return available_cars
    .map(function (x) {
      return accounting.formatMoney(x.dollar_value)
    })
    .join(', ')
}
availablePrices = R.compose(
  R.join(', '),
  R.map(R.prop('dollar_value')),
  R.filter(R.prop('in_stock'))
)

assert.deepEqual(availablePrices(CARS), '700000, 1850000')

// 彩蛋 2:
// ============
// 重构使之成为 pointfree 函数。提示：可以使用 _.flip()
var fastestCar = function (cars) {
  var sorted = _.sortBy(function (car) {
    return car.horsepower
  }, cars)
  var fastest = _.last(sorted)
  return fastest.name + ' is the fastest'
}
fastestCar = R.compose(
  (s) => s + ' is the fastest',
  R.prop('name'),
  R.reduce(R.maxBy(R.prop('horsepower')), { horsepower: 0 })
)
// better
fastestCar = R.compose(
  (s) => s + ' is the fastest',
  R.prop('name'),
  R.last,
  R.sortBy(R.prop('horsepower'))
)
// better ??
fastestCar = R.compose(
  R.flip(R.concat(' is the fastest')),
  R.prop('name'),
  R.last,
  R.sortBy(R.prop('horsepower'))
)

assert.deepEqual(fastestCar(CARS), 'Aston Martin One-77 is the fastest')
