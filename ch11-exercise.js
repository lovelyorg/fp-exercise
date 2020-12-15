import { chain, compose, concat, curry, lift, liftN, map, always, prop, split } from 'ramda'
import { Container, Either, IO, Left, Maybe, either, Task } from './support/index.js'

// Write a natural transformation that converts `Either b a` to `Maybe a`

// eitherToMaybe :: Either b a -> Maybe a
let eitherToMaybe = (x) => (x.isLeft ? Maybe.of(null) : Maybe.of(x.$value))
console.log(eitherToMaybe(Either.of('abc')))

eitherToMaybe = either(always(Maybe.of(null)), Maybe.of)

console.log(eitherToMaybe(Either.of('abc')))
console.log(eitherToMaybe(new Left('abc')))

// -
// -
// -

// eitherToTask :: Either a b -> Task a b
const eitherToTask = either(Task.rejected, Task.of)

// Using `eitherToTask`, simplify `findNameById` to remove the nested `Either`.

const findUserById = (id) => Task.of(Either.of({ name: 'tom' }))
console.log(findUserById)
// findNameById :: Number -> Task Error (Either Error User)
let findNameById = compose(map(map(prop('name'))), findUserById)
console.log(findNameById(1))
findNameById = compose(map(prop('name')), chain(eitherToTask), findUserById)
console.log(findNameById(1).map(console.log))

// -
// -
// -

// As a reminder, the following functions are available in the exercise's context:

// split :: String -> String -> [String]
console.log(split('')('abc'))
// intercalate :: String -> [String] -> String
const intercalate = curry((str, arr) => 'intercalate')
// Write the isomorphisms between String and [Char].

// strToList :: String -> [Char]
const strToList = split('')

// listToStr :: [Char] -> String
const listToStr = intercalate('')
