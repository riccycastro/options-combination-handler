import {OptionHandler} from "../../index";

const options = require('./../data/options.json')

const optionHandler = new OptionHandler(options);

describe('generateAllPossibleCombinations', () => {
    it('should generate expected number of combinations', () => {
        const possibleCombinations = optionHandler.generateAllPossibleCombinations()
        expect(possibleCombinations.length).toBe(135)
        expect(possibleCombinations[0]).toStrictEqual({D: 'd1', A: 'a1', B: 'b1', C: 'c1'})
        expect(possibleCombinations[134]).toStrictEqual({D: 'd3', A: 'a3', B: 'b5', C: 'c3'})
    })
})

describe('convertCombinationsToRows', () => {
    const testsData = require('../data/convertCombinationsToRows.json')

    Object.keys(testsData).map((testCase) => {
        const testData = testsData[testCase]
        const description = testData.description || ''
        
        it(`${testCase} ${description}`, () => {
            const rows = optionHandler.convertCombinationsToRows(testData.combinations)
            expect(rows).toStrictEqual(testData.rows)
        })
    })
})

describe('convertRowsToCombinations', () => {
    const testsData = require('../data/convertRowsToCombinations.json')

    Object.keys(testsData).map((testCase) => {
        const testData = testsData[testCase]
        const description = testData.description || ''

        it(`${testCase} ${description}`, () => {
            const combinations = optionHandler.convertRowsToCombinations(testData.rows)
            expect(combinations).toStrictEqual(testData.combinations)
        })
    })
})