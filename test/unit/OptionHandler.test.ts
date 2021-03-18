import {OptionHandler} from "../../index";

const options = require('./../data/option.json')

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
    const testCases = [
        {
            name: 'case1',
            expectedLength: 5
        },
        {
            name: 'case2',
            expectedLength: 1
        },
        {
            name: 'case3',
            expectedLength: 5
        },
        {
            name: 'case4',
            expectedLength: 1
        },
        {
            name: 'case5',
            expectedLength: 1
        },
        {
            name: 'case6',
            expectedLength: 2
        },
        {
            name: 'case7',
            expectedLength: 1
        },
        {
            name: 'case8',
            expectedLength: 0
        }
    ]

    for (const testCase of testCases) {
        it(`${testCase.name}`, () => {
            const testData = require(`../data/${testCase.name}.json`)

            const rows = optionHandler.groupCombinations(testData.combinations)

            expect(rows.length).toEqual(testCase.expectedLength)
            expect(rows).toStrictEqual(testData.rows)
        })
    }
})
