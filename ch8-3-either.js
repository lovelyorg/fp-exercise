import _ from 'ramda'
import dayjs from 'dayjs'

class Left {
  constructor(x) {
    this.$value = x
  }
  static of(x) {
    return new Left(x)
  }
  map(fn) {
    return this
  }
}

class Right {
  constructor(x) {
    this.$value = x
  }
  static of(x) {
    return new Right(x)
  }
  map(fn) {
    return Right.of(fn(this.$value))
  }
}

console.log(Right.of(1).map((m) => m + 1))

// date -> user -> either(string, number)
const getAge = _.curry((now, user) => {
  const birthdate = dayjs(user.birthdate)
  if (!birthdate.isValid()) return Left.of('invalid birthdate')
  return Right.of(dayjs(now).diff(birthdate, 'year'))
})

console.log(getAge(dayjs(), { birthdate: '2000' }))
console.log(getAge(dayjs(), { birthdate: 'aaaa' }))

// number -> string
const fortune = _.compose(_.concat('if you survive, you will be '), _.toString, _.add(1))

// Functor f => (a -> b) -> f a -> f b
const map = _.curry((fn, anyFunctor) => anyFunctor.map(fn))

// user -> either(string, _)
const zoltar = _.compose(map(fortune), getAge(dayjs()))
map(console.log)(zoltar({ birthdate: '2000' }))
console.log(zoltar({ birthdate: 'abcd' }))

// (a -> c) -> (b -> c) -> Either a b -> c
const either = _.curry((f, g, e) => {
  switch (e.constructor) {
    case Left:
      return f(e.$value)
    case Right:
      return g(e.$value)
  }
})

const zoltar2 = _.compose(console.log, either(_.identity, fortune), getAge(dayjs()))
zoltar2({ birthdate: '2000' })
zoltar2({ birthdate: 'abcd' })
