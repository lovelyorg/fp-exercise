import _ from 'ramda'

class Maybe {
  constructor(x) {
    this.$value = x
  }

  static of(x) {
    return new Maybe(x)
  }

  get isNothing() {
    return this.$value === null || this.$value === undefined
  }

  map(f) {
    return this.isNothing ? this : Maybe.of(f(this.$value))
  }
}

console.log(Maybe.of(1).map(_.identity))
console.log(Maybe.of(null).map(_.identity))
