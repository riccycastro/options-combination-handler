import {OptionHandler} from "./src/OptionHandler"
import {Combination} from "./src/types"

const options = {
    D: {d1: 'stamp', d2: 'stripes', d3: 'smooth'},
    A: {a1: 'blue', a2: 'red', a3: 'green'},
    B: {b1: 'xs', b2: 's', b3: 'm', b4: 'l', b5: 'xl'},
    C: {c1: 'short', c2: 'long', c3: "medium"},
}

const combinations: Combination[] = [
    {
        "D": "d1",
        "A": "a1",
        "B": "b1",
        "C": "c2"
    }, {
        "D": "d1",
        "A": "a1",
        "B": "b1",
        "C": "c2"
    },
]

const generator = new OptionHandler(
    options,
)
console.log(JSON.stringify(generator.groupCombinations(combinations)))
