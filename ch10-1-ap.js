import { add, chain, compose, map } from 'ramda'
import { Container, Maybe } from './support/index.js'

const c1 = Container.of(1)
const c2 = Container.of(2)
console.log(add(c1, c2))
console.log(map(add, c1))
console.log(c1.chain((one) => c2.map(add(one))))
console.log(chain((one) => map(add(one), c2))(c1))
// console.log(map(map(add, c1), c2))
console.log(
  compose(
    chain((one) => map(add(one), c2)),
    () => c1
  )()
)

console.log(Container.of(add(2)).ap(Container.of(3)))
// Container(5)

// // all together now
console.log(Container.of(2).map(add).ap(Container.of(3)))
// // Container(5)

// F.of(x).map(f) == F.of(f).ap(F.of(x))
Container.of('t').map(console.log)
Container.of(console.log).ap(Container.of('t'))

console.log(Maybe.of(add).ap(Maybe.of(2)).ap(Maybe.of(3)))
