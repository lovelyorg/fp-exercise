import _ from 'ramda'
import { map } from './support/index.js'

const Container = function (value) {
  this.__value = value
}

Container.of = (value) => new Container(value)

Container.prototype.map = function (f) {
  return Container.of(f(this.__value))
}

const c2 = Container.of(2)

console.log(c2)
console.log(c2.map(_.add(1)))

console.log(map(_.add(1), c2))

console.log(map(_.toString)(c2))

console.log(_.toString)
