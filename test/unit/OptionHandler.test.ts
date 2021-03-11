import {OptionHandler} from "../../src/OptionHandler";
import {Combination} from "../../src/types";

const options = require('../data/option.json')

const optionHandler = new OptionHandler(options);

describe('generateAllPossibleCombinations', () => {
    it('should generate expected number of combinations', () => {
        const possibleCombinations = optionHandler.generateAllPossibleCombinations()
        expect(possibleCombinations.length).toBe(135)
        expect(possibleCombinations[0]).toStrictEqual({D: 'd1', A: 'a1', B: 'b1', C: 'c1'})
        expect(possibleCombinations[134]).toStrictEqual({D: 'd3', A: 'a3', B: 'b5', C: 'c3'})
    })
})

describe('groupCombinations', () => {
    it('case1 - should return 5 rows', () => {
        const testData = require('../data/case1.json')
        const combinations: Combination[] = testData.combinations;

        const rows = optionHandler.groupCombinations(combinations)

        expect(rows.length).toEqual(5)
        expect(rows).toStrictEqual(testData.rows)
    })


})
