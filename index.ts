import {Combination, Option, OptionCombinations, OptionItemCombinations, OptionItemRows, OptionRows, Row} from "./types"

export class OptionHandler {
    private readonly options: Option

    private possibleCombinations: Combination[] = []
    private readonly optionKeys: string[];

    constructor(options: Option,) {
        this.options = options;


        this.optionKeys = Object.keys(this.options)
    }

    public generateAllPossibleCombinations(): Combination[] {
        if (this.possibleCombinations.length) {
            return this.possibleCombinations
        }

        this.generateCombinations(0)
        return this.possibleCombinations
    }

    public groupCombinations(combinations: Combination[]): Row[] {
        if (!combinations.length) {
            return []
        }
        combinations.sort(this.compareCombination)

        let result: OptionCombinations = {};

        this.optionKeys.map((optionKey) => {
            Object.keys(this.options[optionKey]).map((optionItemKey) => {
                result = this.findSelectedOptionInCombination(optionKey, optionItemKey, combinations, result)
            })
        })

        let rows = this.mergeRows(
            this.removeRowsWithEmptyOptionItem(
                this.removeDuplicatedFindAll(
                    this.convertOptionRowsToRows(
                        this.removeFalseCombinations(
                            this.removeFalseAllElements(
                                this.mergeOptionCombinations(result)
                            )
                        )
                    )
                )
            )
        )

        if (this.hasIncompleteAllRows(rows)) {
            rows = this.splitIncompleteAllRows(rows)
        }

        return this.tryToMergeRowsWithAll(rows)
    }

    private splitIncompleteAllRows(rows: Row[]): Row[] {
        let finalRows: Row[] = []

        for (const row of rows) {
            if (!this.hasIncompleteAll(row)) {
                finalRows.push(row)
                continue
            }

            finalRows = finalRows.concat(this.splitIncompleteRow(row))
        }

        return finalRows
    }

    private splitIncompleteRow(row: Row): Row[] {
        const rows: Row[] = []

        Object.keys(row).map((optionKey) => {
            if (row[optionKey].isAll || row[optionKey].keys.length === 1) {
                return
            }

            row[optionKey].keys.map((key) => {
                const clonedRow = JSON.parse(JSON.stringify(row))
                clonedRow[optionKey].keys = [key]
                rows.push(clonedRow)
            })
        })

        return rows
    }

    private hasIncompleteAllRows(rows: Row[]): boolean {
        for (const row of rows) {
            if (this.hasIncompleteAll(row)) {
                return true
            }
        }
        return false
    }

    private hasIncompleteAll(row: Row): boolean {
        for (const optionKey of this.optionKeys) {
            if (!row[optionKey].isAll && row[optionKey].keys.length > 1) {
                return true
            }
        }
        return false
    }

    private tryToMergeRowsWithAll(rows: Row[]): Row[] {
        let i = 0;

        while (i < rows.length) {
            const row = rows[i]
            if (this.countTotalAllOption(row) === this.optionKeys.length - 1) {

                let noAllOptionKey = ''

                for (const optionKey of this.optionKeys) {
                    if (!row[optionKey].isAll) {
                        noAllOptionKey = optionKey
                        break
                    }
                }

                const mergedRow = JSON.parse(JSON.stringify(row))

                const indexToRemove: number[] = []

                for (const [j, rowB] of rows.entries()) {
                    if (i === j || !this.rowHasAll(rowB)) {
                        continue
                    }

                    if (this.hasEqualAll(row, rowB, noAllOptionKey)) {
                        mergedRow[noAllOptionKey].keys = mergedRow[noAllOptionKey].keys.concat(rowB[noAllOptionKey].keys)
                        indexToRemove.push(j)

                        if (mergedRow[noAllOptionKey].keys.length === Object.keys(this.options[noAllOptionKey]).length) {
                            mergedRow[noAllOptionKey].isAll = true
                            break
                        }
                    }
                }
                if (this.countTotalAllOption(mergedRow) > this.countTotalAllOption(rows[i])) {
                    rows[i] = mergedRow

                    rows = rows.filter((row, index) => {
                        return !indexToRemove.includes(index)
                    })
                }
            }
            i++
        }

        return rows
    }

    private countTotalAllOption(row: Row): number {
        return this.optionKeys.reduce((total, optionKey) => {
            if (row[optionKey].isAll) {
                total++
            }
            return total
        }, 0)
    }

    private removeFalseCombinations(optionRows: OptionRows): OptionRows {

        this.optionKeys.map((optionKey) => {
            Object.keys(optionRows[optionKey]).map((optionItemKey) => {
                const optionItemRows: Row[] = optionRows[optionKey][optionItemKey]

                const resultRows: Row[] = [];

                optionItemRows.map((row: Row) => {
                    if (this.rowHasAll(row)) {
                        resultRows.push(row)
                        return
                    }
                    let combinations = this.convertRowToCombinations(row)

                    for (const optionItemRow of optionItemRows) {
                        combinations = combinations.filter(combination => {
                            return this.isValidCombination(combination, optionRows)
                        })
                    }

                    combinations.map(combination => {
                        resultRows.push(this.convertCombinationsToRow([combination]))
                    })
                })

                optionRows[optionKey][optionItemKey] = resultRows
            })
        })

        return optionRows
    }

    private isValidCombination(combination: Combination, optionRows: OptionRows): boolean {

        for (const optionKey of this.optionKeys) {
            const rows = optionRows[optionKey][combination[optionKey]]
            if (!Array.isArray(rows) || !rows.length) {
                return false
            }

            if (!this.isCombinationInRows(combination, rows)) {
                return false
            }
        }

        return true
    }

    private removeRowsWithEmptyOptionItem(rows: Row[]): Row[] {

        const indexToRemove: number[] = []

        rows.map((row, index) => {
            for (const optionKey of this.optionKeys) {
                if (!row[optionKey].keys.length) {
                    indexToRemove.push(index)
                }
            }
        })

        rows = rows.filter((row, index) => {
            return !indexToRemove.includes(index)
        })

        return rows
    }

    private mergeRows(rows: Row[]): Row[] {
        let index = 0;

        while (index < rows.length) {
            const currentRow = rows[index]

            const indexToRemove: number[] = []

            rows.map((row, i) => {
                if (index === i ||
                    (!this.rowHasAll(currentRow) && this.rowHasAll(row)) ||
                    (
                        this.rowHasAll(currentRow) && this.rowHasAll(row)
                        && this.balanceRowsRelevance(row, currentRow) === 1
                    )
                ) {
                    return;
                }

                let rowCombinations = this.convertRowToCombinations(row);

                rowCombinations = rowCombinations.filter((rowCombination) => {
                    return !this.isCombinationInRow(rowCombination, currentRow)
                })

                if (rowCombinations.length) {
                    rows[i] = this.convertCombinationsToRow(rowCombinations)
                } else {
                    indexToRemove.push(i)
                }
            })

            rows = rows.filter((row, index) => {
                return !indexToRemove.includes(index)
            })

            index++
        }

        return rows
    }

    private balanceRowsRelevance(rowA: Row, rowB: Row): number {
        const rowAWeight = this.getRowWeight(rowA)
        const rowBWeight = this.getRowWeight(rowB)

        if (rowAWeight > rowBWeight) {
            return 1
        }

        if (rowAWeight < rowBWeight) {
            return -1
        }

        return 0
    }

    private getRowWeight(row: Row): number {
        let weight = 1

        this.optionKeys.map((optionKey) => {
            if (row[optionKey].isAll) {
                weight *= row[optionKey].keys.length
            }
        })

        return weight;
    }

    private convertCombinationsToRow(combinations: Combination[]): Row {
        const row: Row = {}

        combinations.map((combination) => {
            this.optionKeys.map((optionKey) => {
                if (!row[optionKey]) {
                    row[optionKey] = {isAll: false, keys: []}
                }

                if (!row[optionKey].keys.includes(combination[optionKey])) {
                    row[optionKey].keys.push(combination[optionKey])

                    if (row[optionKey].keys.length === Object.keys(this.options[optionKey]).length) {
                        row[optionKey].isAll = true
                    }
                }
            })
        })

        return row
    }

    private isCombinationInRows(combination: Combination, rows: Row[]): boolean {
        for (const row of rows) {
            if (this.isCombinationInRow(combination, row)) {
                return true
            }
        }
        return false
    }

    private isCombinationInRow(combination: Combination, row: Row): boolean {
        for (const optionKey of this.optionKeys) {
            if (!row[optionKey].keys.includes(combination[optionKey])) {
                return false
            }
        }
        return true
    }

    private convertRowToCombinations(row: Row): Combination[] {
        const optionKeys = this.optionKeys;
        const combinations: Combination[] = []
        const max = optionKeys.length - 1;

        function helper(combination: Combination, i: number) {
            const optionKey = optionKeys[i];
            const keys = row[optionKey].keys
            for (let j = 0; j < keys.length; j++) {

                const combinationClone = JSON.parse(JSON.stringify(combination)) // clone combination

                combinationClone[optionKey] = keys[j];

                if (i === max)
                    combinations.push(combinationClone);
                else
                    helper(combinationClone, i + 1);
            }

        }

        helper({}, 0);
        return combinations;
    }

    private removeFalseAllElements(optionRows: OptionRows): OptionRows {
        Object.keys(optionRows).map((optionKey) => {
            Object.keys(optionRows[optionKey]).map((optionItemKey) => {
                const rows = optionRows[optionKey][optionItemKey];
                rows.map((row) => {
                    if (this.rowHasAll(row)) {
                        this.validateAndRemoveFalseAll(row, optionRows)
                    }
                })
            })
        })

        return optionRows
    }

    private validateAndRemoveFalseAll(row: Row, optionRows: OptionRows) {

        this.optionKeys.map((optionKey) => {
            if (row[optionKey].isAll) {
                return
            }

            for (const key of row[optionKey].keys) {
                let isEqual = false

                for (const rowB of optionRows[optionKey][key]) {

                    if (this.hasEqualAll(row, rowB)) {
                        isEqual = true
                        break
                    }
                }

                if (!isEqual) {
                    row[optionKey].keys = row[optionKey].keys.filter((k) => {
                        return k !== key
                    })
                }

            }
        })

    }

    private rowHasAll(row: Row): boolean {
        for (let i = 0; i < this.optionKeys.length; i++) {
            const optionKey = this.optionKeys[i];
            if (row[optionKey].isAll) {
                return true
            }
        }
        return false
    }

    private convertOptionRowsToRows(optionRows: OptionRows): Row[] {
        let rows: Row[] = []
        Object.keys(optionRows).map((optionKey) => {
            Object.keys(optionRows[optionKey]).map((optionItemKey) => {
                rows = rows.concat(optionRows[optionKey][optionItemKey]);
            })
        })

        return rows
    }

    private removeDuplicatedFindAll(rows: Row[]): Row[] {
        rows.map((rowA, index) => {
            if (!this.rowHasAll(rowA)) {
                return
            }

            for (let i = rows.length - 1; i >= 0; i--) {
                const rowB = rows[i];

                if (index === i || !this.rowHasAll(rowB)) {
                    continue
                }

                if (this.isRowsIdentical(rowA, rowB)) {
                    rows.splice(i, 1)
                }
            }
        })

        return rows
    }

    private isRowsIdentical(rowA: Row, rowB: Row, fixedOptionKey?: string): boolean {
        for (const optionKey of this.optionKeys) {
            if (optionKey === fixedOptionKey) {
                continue
            }

            if (!(
                rowA[optionKey].isAll === rowB[optionKey].isAll
                && JSON.stringify(rowA[optionKey].keys) === JSON.stringify(rowB[optionKey].keys))
            ) {
                return false
            }
        }
        return true
    }

    private hasEqualAll(rowA: Row, rowB: Row, fixedOptionKey?: string): boolean {
        for (const optionKey of this.optionKeys) {
            if (optionKey === fixedOptionKey) {
                continue
            }

            if (
                rowA[optionKey].isAll !== rowB[optionKey].isAll
            ) {
                return false
            }
        }
        return true
    }

    private mergeOptionCombinations(
        optionCombinations: OptionCombinations
    ): OptionRows {
        const optionRows: OptionRows = {}
        Object.keys(optionCombinations).map((optionKey) => {
            optionRows[optionKey] =
                this.mergeOptionItemCombinations(optionCombinations[optionKey])
        })

        return optionRows
    }

    private mergeOptionItemCombinations(
        optionItemCombinations: OptionItemCombinations,
    ): OptionItemRows {
        const optionRow: OptionItemRows = {}

        Object.keys(optionItemCombinations).map((optionItemKey) => {
            optionRow[optionItemKey] = this.mergeCombinations(optionItemCombinations[optionItemKey])
        })

        return optionRow
    }

    private mergeCombinations(combinations: Combination[]): Row[] {

        const rows: Row[] = [];

        while (combinations.length) {
            const combinationA = combinations[0]
            const row: Row = {}

            this.optionKeys.map((optionKey) => {
                row[optionKey] = {
                    isAll: false,
                    keys: [
                        combinationA[optionKey]
                    ],
                }
            })

            combinations.map((combinationB, j) => {
                if (0 === j) {
                    return;
                }

                const diff = this.compareCombinations(combinationA, combinationB)

                if (Object.keys(diff).length === 1) {
                    this.optionKeys.map((optionKey) => {
                        if (diff[optionKey] && !row[optionKey].keys.includes(diff[optionKey])) {
                            row[optionKey].keys.push(diff[optionKey])
                            if (Object.keys(this.options[optionKey]).length === row[optionKey].keys.length) {
                                row[optionKey].isAll = true
                            }
                            return;
                        }
                    })
                }
            })

            rows.push(row)

            combinations.splice(0, 1)
        }

        return rows
    }

    private compareCombinations(combinationA: Combination, combinationB: Combination) {
        const result: Combination = {}
        this.optionKeys.map((optionKey) => {
            if (combinationA[optionKey] !== combinationB[optionKey]) {
                result[optionKey] = combinationB[optionKey]
            }
        })
        return result
    }

    private findSelectedOptionInCombination(
        fixedOptionKey: string,
        currentOptionItemKey: string,
        combinations: Combination[],
        result: OptionCombinations = {}
    ) {
        combinations.map((combination: Combination) => {
            if (combination[fixedOptionKey] !== currentOptionItemKey) {
                return;
            }

            if (!result[fixedOptionKey]) {
                result[fixedOptionKey] = {};
            }

            if (!result[fixedOptionKey][currentOptionItemKey]) {
                result[fixedOptionKey][currentOptionItemKey] = [];
            }

            result[fixedOptionKey][currentOptionItemKey].push(combination);
        })

        return result;
    }

    private generateCombinations(
        index: number,
        result: Combination = {}
    ) {
        const optionKey = this.optionKeys[index]
        Object.keys(this.options[optionKey]).map((key) => {
            result[optionKey] = key

            if (this.optionKeys.length == index + 1) {
                this.possibleCombinations.push(JSON.parse(JSON.stringify(result)))
                return
            }

            this.generateCombinations(index + 1, result)
        })
    }

    private compareCombination(combinationA: Combination, combinationB: Combination): number {
        let combinationAWeight = 0
        let combinationBWeight = 0

        Object.keys(combinationA).map((optionKey) => {
            combinationA[optionKey].split('').map((char) => {
                combinationAWeight += char.charCodeAt(0)
            })
        })


        Object.keys(combinationB).map((optionKey) => {
            combinationB[optionKey].split('').map((char) => {
                combinationBWeight += char.charCodeAt(0)
            })
        })

        if (combinationAWeight > combinationBWeight) {
            return 1
        }

        if (combinationAWeight < combinationBWeight) {
            return -1
        }

        return 0
    }
}
