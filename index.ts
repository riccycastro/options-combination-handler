import {OptionHandler} from "./src/OptionHandler"
import {Combination} from "./src/types"

const options = {
    D: {d1: 'stamp', d2: 'stripes', d3: 'smooth'},
    A: {a1: 'blue', a2: 'red', a3: 'green'},
    B: {b1: 'xs', b2: 's', b3: 'm', b4: 'l', b5: 'xl'},
    C: {c1: 'short', c2: 'long', c3: "medium"},
}

const combinations: Combination[] = [
    {D: 'd1',  A: 'a1', B: 'b2', C: 'c2'},

    {D: 'd2',  A: 'a1', B: 'b2', C: 'c1'},

    {D: 'd3',  A: 'a1', B: 'b5', C: 'c2'},

    {D: 'd3',  A: 'a1', B: 'b1', C: 'c1'},
    {D: 'd2',  A: 'a1', B: 'b1', C: 'c1'},
    {D: 'd1',  A: 'a1', B: 'b1', C: 'c1'},

    {D: 'd1',  A: 'a1', B: 'b1', C: 'c2'},
    {D: 'd2',  A: 'a1', B: 'b1', C: 'c2'},
    {D: 'd3',  A: 'a1', B: 'b1', C: 'c2'},
];

const generator = new OptionHandler(
    options,
)
console.log(JSON.stringify(generator.groupCombinations([{"D":"d1","A":"a1","B":"b1","C":"c1"},{"D":"d1","A":"a1","B":"b1","C":"c2"},{"D":"d1","A":"a1","B":"b1","C":"c3"},{"D":"d1","A":"a1","B":"b2","C":"c1"},{"D":"d1","A":"a1","B":"b2","C":"c2"},{"D":"d1","A":"a1","B":"b2","C":"c3"},{"D":"d1","A":"a1","B":"b3","C":"c1"},{"D":"d1","A":"a1","B":"b3","C":"c2"},{"D":"d1","A":"a1","B":"b3","C":"c3"},{"D":"d1","A":"a1","B":"b4","C":"c1"},{"D":"d1","A":"a1","B":"b4","C":"c2"},{"D":"d1","A":"a1","B":"b4","C":"c3"},{"D":"d1","A":"a1","B":"b5","C":"c1"},{"D":"d1","A":"a1","B":"b5","C":"c2"},{"D":"d1","A":"a1","B":"b5","C":"c3"},{"D":"d1","A":"a2","B":"b1","C":"c1"},{"D":"d1","A":"a2","B":"b1","C":"c2"},{"D":"d1","A":"a2","B":"b1","C":"c3"},{"D":"d1","A":"a2","B":"b2","C":"c1"},{"D":"d1","A":"a2","B":"b2","C":"c2"},{"D":"d1","A":"a2","B":"b2","C":"c3"},{"D":"d1","A":"a2","B":"b3","C":"c1"},{"D":"d1","A":"a2","B":"b3","C":"c2"},{"D":"d1","A":"a2","B":"b3","C":"c3"},{"D":"d1","A":"a2","B":"b4","C":"c1"},{"D":"d1","A":"a2","B":"b4","C":"c2"},{"D":"d1","A":"a2","B":"b4","C":"c3"},{"D":"d1","A":"a2","B":"b5","C":"c1"},{"D":"d1","A":"a2","B":"b5","C":"c2"},{"D":"d1","A":"a2","B":"b5","C":"c3"},{"D":"d1","A":"a3","B":"b1","C":"c1"},{"D":"d1","A":"a3","B":"b1","C":"c2"},{"D":"d1","A":"a3","B":"b1","C":"c3"},{"D":"d1","A":"a3","B":"b2","C":"c1"},{"D":"d1","A":"a3","B":"b2","C":"c2"},{"D":"d1","A":"a3","B":"b2","C":"c3"},{"D":"d1","A":"a3","B":"b3","C":"c1"},{"D":"d1","A":"a3","B":"b3","C":"c2"},{"D":"d1","A":"a3","B":"b3","C":"c3"},{"D":"d1","A":"a3","B":"b4","C":"c1"},{"D":"d1","A":"a3","B":"b4","C":"c2"},{"D":"d1","A":"a3","B":"b4","C":"c3"},{"D":"d1","A":"a3","B":"b5","C":"c1"},{"D":"d1","A":"a3","B":"b5","C":"c2"},{"D":"d1","A":"a3","B":"b5","C":"c3"},{"D":"d2","A":"a1","B":"b1","C":"c1"},{"D":"d2","A":"a1","B":"b1","C":"c2"},{"D":"d2","A":"a1","B":"b1","C":"c3"},{"D":"d2","A":"a1","B":"b2","C":"c1"},{"D":"d2","A":"a1","B":"b2","C":"c2"},{"D":"d2","A":"a1","B":"b2","C":"c3"},{"D":"d2","A":"a1","B":"b3","C":"c1"},{"D":"d2","A":"a1","B":"b3","C":"c2"},{"D":"d2","A":"a1","B":"b3","C":"c3"},{"D":"d2","A":"a1","B":"b4","C":"c1"},{"D":"d2","A":"a1","B":"b4","C":"c2"},{"D":"d2","A":"a1","B":"b4","C":"c3"},{"D":"d2","A":"a1","B":"b5","C":"c1"},{"D":"d2","A":"a1","B":"b5","C":"c2"},{"D":"d2","A":"a1","B":"b5","C":"c3"},{"D":"d2","A":"a2","B":"b1","C":"c1"},{"D":"d2","A":"a2","B":"b1","C":"c2"},{"D":"d2","A":"a2","B":"b1","C":"c3"},{"D":"d2","A":"a2","B":"b2","C":"c1"},{"D":"d2","A":"a2","B":"b2","C":"c2"},{"D":"d2","A":"a2","B":"b2","C":"c3"},{"D":"d2","A":"a2","B":"b3","C":"c1"},{"D":"d2","A":"a2","B":"b3","C":"c2"},{"D":"d2","A":"a2","B":"b3","C":"c3"},{"D":"d2","A":"a2","B":"b4","C":"c1"},{"D":"d2","A":"a2","B":"b4","C":"c2"},{"D":"d2","A":"a2","B":"b4","C":"c3"},{"D":"d2","A":"a2","B":"b5","C":"c1"},{"D":"d2","A":"a2","B":"b5","C":"c2"},{"D":"d2","A":"a2","B":"b5","C":"c3"},{"D":"d2","A":"a3","B":"b1","C":"c1"},{"D":"d2","A":"a3","B":"b1","C":"c2"},{"D":"d2","A":"a3","B":"b1","C":"c3"},{"D":"d2","A":"a3","B":"b2","C":"c1"},{"D":"d2","A":"a3","B":"b2","C":"c2"},{"D":"d2","A":"a3","B":"b2","C":"c3"},{"D":"d2","A":"a3","B":"b3","C":"c1"},{"D":"d2","A":"a3","B":"b3","C":"c2"},{"D":"d2","A":"a3","B":"b3","C":"c3"},{"D":"d2","A":"a3","B":"b4","C":"c1"},{"D":"d2","A":"a3","B":"b4","C":"c2"},{"D":"d2","A":"a3","B":"b4","C":"c3"},{"D":"d2","A":"a3","B":"b5","C":"c1"},{"D":"d2","A":"a3","B":"b5","C":"c2"},{"D":"d2","A":"a3","B":"b5","C":"c3"},{"D":"d3","A":"a1","B":"b1","C":"c1"},{"D":"d3","A":"a1","B":"b1","C":"c2"},{"D":"d3","A":"a1","B":"b1","C":"c3"},{"D":"d3","A":"a1","B":"b2","C":"c1"},{"D":"d3","A":"a1","B":"b2","C":"c2"},{"D":"d3","A":"a1","B":"b2","C":"c3"},{"D":"d3","A":"a1","B":"b3","C":"c1"},{"D":"d3","A":"a1","B":"b3","C":"c2"},{"D":"d3","A":"a1","B":"b3","C":"c3"},{"D":"d3","A":"a1","B":"b4","C":"c1"},{"D":"d3","A":"a1","B":"b4","C":"c2"},{"D":"d3","A":"a1","B":"b4","C":"c3"},{"D":"d3","A":"a1","B":"b5","C":"c1"},{"D":"d3","A":"a1","B":"b5","C":"c2"},{"D":"d3","A":"a1","B":"b5","C":"c3"},{"D":"d3","A":"a2","B":"b1","C":"c1"},{"D":"d3","A":"a2","B":"b1","C":"c2"},{"D":"d3","A":"a2","B":"b1","C":"c3"},{"D":"d3","A":"a2","B":"b2","C":"c1"},{"D":"d3","A":"a2","B":"b2","C":"c2"},{"D":"d3","A":"a2","B":"b2","C":"c3"},{"D":"d3","A":"a2","B":"b3","C":"c1"},{"D":"d3","A":"a2","B":"b3","C":"c2"},{"D":"d3","A":"a2","B":"b3","C":"c3"},{"D":"d3","A":"a2","B":"b4","C":"c1"},{"D":"d3","A":"a2","B":"b4","C":"c2"},{"D":"d3","A":"a2","B":"b4","C":"c3"},{"D":"d3","A":"a2","B":"b5","C":"c1"},{"D":"d3","A":"a2","B":"b5","C":"c2"},{"D":"d3","A":"a2","B":"b5","C":"c3"},{"D":"d3","A":"a3","B":"b1","C":"c1"},{"D":"d3","A":"a3","B":"b1","C":"c2"},{"D":"d3","A":"a3","B":"b1","C":"c3"},{"D":"d3","A":"a3","B":"b2","C":"c1"},{"D":"d3","A":"a3","B":"b2","C":"c2"},{"D":"d3","A":"a3","B":"b2","C":"c3"},{"D":"d3","A":"a3","B":"b3","C":"c1"},{"D":"d3","A":"a3","B":"b3","C":"c2"},{"D":"d3","A":"a3","B":"b3","C":"c3"},{"D":"d3","A":"a3","B":"b4","C":"c1"},{"D":"d3","A":"a3","B":"b4","C":"c2"},{"D":"d3","A":"a3","B":"b4","C":"c3"},{"D":"d3","A":"a3","B":"b5","C":"c1"},{"D":"d3","A":"a3","B":"b5","C":"c2"},{"D":"d3","A":"a3","B":"b5","C":"c3"}])))
