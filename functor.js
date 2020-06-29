var _ = require('ramda')

var Container = function (value) {
  this.__value = value
}

Container.of = (value) => new Container(value)

Container.prototype.map = function (f) {
  return Container.of(f(this.__value))
}

let c2 = Container.of(2)

console.log(c2)
console.log(c2.map(_.add(1)))

// map :: Functor f => (a -> b) -> f a -> f b
var map = _.curry((f, any_functor_at_all) => any_functor_at_all.map(f))

console.log(map(_.add(1), c2))

console.log(map(_.toString)(c2))

console.log(_.toString)
