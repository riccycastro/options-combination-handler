"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionHandler = void 0;
class OptionHandler {
    constructor(options) {
        this.possibleCombinations = [];
        this.options = options;
        this.optionKeys = Object.keys(this.options);
    }
    generateAllPossibleCombinations() {
        if (this.possibleCombinations.length) {
            return this.possibleCombinations;
        }
        this.generateCombinations(0);
        return this.possibleCombinations;
    }
    groupCombinations(combinations) {
        if (!combinations.length) {
            return [];
        }
        combinations.sort(this.compareCombination);
        let result = {};
        this.optionKeys.map((optionKey) => {
            Object.keys(this.options[optionKey]).map((optionItemKey) => {
                result = this.findSelectedOptionInCombination(optionKey, optionItemKey, combinations, result);
            });
        });
        let rows = this.mergeRows(this.removeRowsWithEmptyOptionItem(this.removeDuplicatedFindAll(this.convertOptionRowsToRows(this.removeFalseCombinations(this.removeFalseAllElements(this.mergeOptionCombinations(result)))))));
        if (this.hasIncompleteAllRows(rows)) {
            rows = this.splitIncompleteAllRows(rows);
        }
        return this.tryToMergeRowsWithAll(rows);
    }
    splitIncompleteAllRows(rows) {
        let finalRows = [];
        for (const row of rows) {
            if (!this.hasIncompleteAll(row)) {
                finalRows.push(row);
                continue;
            }
            finalRows = finalRows.concat(this.splitIncompleteRow(row));
        }
        return finalRows;
    }
    splitIncompleteRow(row) {
        const rows = [];
        Object.keys(row).map((optionKey) => {
            if (row[optionKey].isAll || row[optionKey].keys.length === 1) {
                return;
            }
            row[optionKey].keys.map((key) => {
                const clonedRow = JSON.parse(JSON.stringify(row));
                clonedRow[optionKey].keys = [key];
                rows.push(clonedRow);
            });
        });
        return rows;
    }
    hasIncompleteAllRows(rows) {
        for (const row of rows) {
            if (this.hasIncompleteAll(row)) {
                return true;
            }
        }
        return false;
    }
    hasIncompleteAll(row) {
        for (const optionKey of this.optionKeys) {
            if (!row[optionKey].isAll && row[optionKey].keys.length > 1) {
                return true;
            }
        }
        return false;
    }
    tryToMergeRowsWithAll(rows) {
        let i = 0;
        while (i < rows.length) {
            const row = rows[i];
            if (this.countTotalAllOption(row) === this.optionKeys.length - 1) {
                let noAllOptionKey = '';
                for (const optionKey of this.optionKeys) {
                    if (!row[optionKey].isAll) {
                        noAllOptionKey = optionKey;
                        break;
                    }
                }
                const mergedRow = JSON.parse(JSON.stringify(row));
                const indexToRemove = [];
                for (const [j, rowB] of rows.entries()) {
                    if (i === j || !this.rowHasAll(rowB)) {
                        continue;
                    }
                    if (this.hasEqualAll(row, rowB, noAllOptionKey)) {
                        mergedRow[noAllOptionKey].keys = mergedRow[noAllOptionKey].keys.concat(rowB[noAllOptionKey].keys);
                        indexToRemove.push(j);
                        if (mergedRow[noAllOptionKey].keys.length === Object.keys(this.options[noAllOptionKey]).length) {
                            mergedRow[noAllOptionKey].isAll = true;
                            break;
                        }
                    }
                }
                if (this.countTotalAllOption(mergedRow) > this.countTotalAllOption(rows[i])) {
                    rows[i] = mergedRow;
                    rows = rows.filter((row, index) => {
                        return !indexToRemove.includes(index);
                    });
                }
            }
            i++;
        }
        return rows;
    }
    countTotalAllOption(row) {
        return this.optionKeys.reduce((total, optionKey) => {
            if (row[optionKey].isAll) {
                total++;
            }
            return total;
        }, 0);
    }
    removeFalseCombinations(optionRows) {
        this.optionKeys.map((optionKey) => {
            Object.keys(optionRows[optionKey]).map((optionItemKey) => {
                const optionItemRows = optionRows[optionKey][optionItemKey];
                const resultRows = [];
                optionItemRows.map((row) => {
                    if (this.rowHasAll(row)) {
                        resultRows.push(row);
                        return;
                    }
                    let combinations = this.convertRowToCombinations(row);
                    for (const optionItemRow of optionItemRows) {
                        combinations = combinations.filter(combination => {
                            return this.isValidCombination(combination, optionRows);
                        });
                    }
                    combinations.map(combination => {
                        resultRows.push(this.convertCombinationsToRow([combination]));
                    });
                });
                optionRows[optionKey][optionItemKey] = resultRows;
            });
        });
        return optionRows;
    }
    isValidCombination(combination, optionRows) {
        for (const optionKey of this.optionKeys) {
            const rows = optionRows[optionKey][combination[optionKey]];
            if (!Array.isArray(rows) || !rows.length) {
                return false;
            }
            if (!this.isCombinationInRows(combination, rows)) {
                return false;
            }
        }
        return true;
    }
    removeRowsWithEmptyOptionItem(rows) {
        const indexToRemove = [];
        rows.map((row, index) => {
            for (const optionKey of this.optionKeys) {
                if (!row[optionKey].keys.length) {
                    indexToRemove.push(index);
                }
            }
        });
        rows = rows.filter((row, index) => {
            return !indexToRemove.includes(index);
        });
        return rows;
    }
    mergeRows(rows) {
        let index = 0;
        while (index < rows.length) {
            const currentRow = rows[index];
            const indexToRemove = [];
            rows.map((row, i) => {
                if (index === i ||
                    (!this.rowHasAll(currentRow) && this.rowHasAll(row)) ||
                    (this.rowHasAll(currentRow) && this.rowHasAll(row)
                        && this.balanceRowsRelevance(row, currentRow) === 1)) {
                    return;
                }
                let rowCombinations = this.convertRowToCombinations(row);
                rowCombinations = rowCombinations.filter((rowCombination) => {
                    return !this.isCombinationInRow(rowCombination, currentRow);
                });
                if (rowCombinations.length) {
                    rows[i] = this.convertCombinationsToRow(rowCombinations);
                }
                else {
                    indexToRemove.push(i);
                }
            });
            rows = rows.filter((row, index) => {
                return !indexToRemove.includes(index);
            });
            index++;
        }
        return rows;
    }
    balanceRowsRelevance(rowA, rowB) {
        const rowAWeight = this.getRowWeight(rowA);
        const rowBWeight = this.getRowWeight(rowB);
        if (rowAWeight > rowBWeight) {
            return 1;
        }
        if (rowAWeight < rowBWeight) {
            return -1;
        }
        return 0;
    }
    getRowWeight(row) {
        let weight = 1;
        this.optionKeys.map((optionKey) => {
            if (row[optionKey].isAll) {
                weight *= row[optionKey].keys.length;
            }
        });
        return weight;
    }
    convertCombinationsToRow(combinations) {
        const row = {};
        combinations.map((combination) => {
            this.optionKeys.map((optionKey) => {
                if (!row[optionKey]) {
                    row[optionKey] = { isAll: false, keys: [] };
                }
                if (!row[optionKey].keys.includes(combination[optionKey])) {
                    row[optionKey].keys.push(combination[optionKey]);
                    if (row[optionKey].keys.length === Object.keys(this.options[optionKey]).length) {
                        row[optionKey].isAll = true;
                    }
                }
            });
        });
        return row;
    }
    isCombinationInRows(combination, rows) {
        for (const row of rows) {
            if (this.isCombinationInRow(combination, row)) {
                return true;
            }
        }
        return false;
    }
    isCombinationInRow(combination, row) {
        for (const optionKey of this.optionKeys) {
            if (!row[optionKey].keys.includes(combination[optionKey])) {
                return false;
            }
        }
        return true;
    }
    convertRowToCombinations(row) {
        const optionKeys = this.optionKeys;
        const combinations = [];
        const max = optionKeys.length - 1;
        function helper(combination, i) {
            const optionKey = optionKeys[i];
            const keys = row[optionKey].keys;
            for (let j = 0; j < keys.length; j++) {
                const combinationClone = JSON.parse(JSON.stringify(combination)); // clone combination
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
    removeFalseAllElements(optionRows) {
        Object.keys(optionRows).map((optionKey) => {
            Object.keys(optionRows[optionKey]).map((optionItemKey) => {
                const rows = optionRows[optionKey][optionItemKey];
                rows.map((row) => {
                    if (this.rowHasAll(row)) {
                        this.validateAndRemoveFalseAll(row, optionRows);
                    }
                });
            });
        });
        return optionRows;
    }
    validateAndRemoveFalseAll(row, optionRows) {
        this.optionKeys.map((optionKey) => {
            if (row[optionKey].isAll) {
                return;
            }
            for (const key of row[optionKey].keys) {
                let isEqual = false;
                for (const rowB of optionRows[optionKey][key]) {
                    if (this.hasEqualAll(row, rowB)) {
                        isEqual = true;
                        break;
                    }
                }
                if (!isEqual) {
                    row[optionKey].keys = row[optionKey].keys.filter((k) => {
                        return k !== key;
                    });
                }
            }
        });
    }
    rowHasAll(row) {
        for (let i = 0; i < this.optionKeys.length; i++) {
            const optionKey = this.optionKeys[i];
            if (row[optionKey].isAll) {
                return true;
            }
        }
        return false;
    }
    convertOptionRowsToRows(optionRows) {
        let rows = [];
        Object.keys(optionRows).map((optionKey) => {
            Object.keys(optionRows[optionKey]).map((optionItemKey) => {
                rows = rows.concat(optionRows[optionKey][optionItemKey]);
            });
        });
        return rows;
    }
    removeDuplicatedFindAll(rows) {
        rows.map((rowA, index) => {
            if (!this.rowHasAll(rowA)) {
                return;
            }
            for (let i = rows.length - 1; i >= 0; i--) {
                const rowB = rows[i];
                if (index === i || !this.rowHasAll(rowB)) {
                    continue;
                }
                if (this.isRowsIdentical(rowA, rowB)) {
                    rows.splice(i, 1);
                }
            }
        });
        return rows;
    }
    isRowsIdentical(rowA, rowB, fixedOptionKey) {
        for (const optionKey of this.optionKeys) {
            if (optionKey === fixedOptionKey) {
                continue;
            }
            if (!(rowA[optionKey].isAll === rowB[optionKey].isAll
                && JSON.stringify(rowA[optionKey].keys) === JSON.stringify(rowB[optionKey].keys))) {
                return false;
            }
        }
        return true;
    }
    hasEqualAll(rowA, rowB, fixedOptionKey) {
        for (const optionKey of this.optionKeys) {
            if (optionKey === fixedOptionKey) {
                continue;
            }
            if (rowA[optionKey].isAll !== rowB[optionKey].isAll) {
                return false;
            }
        }
        return true;
    }
    mergeOptionCombinations(optionCombinations) {
        const optionRows = {};
        Object.keys(optionCombinations).map((optionKey) => {
            optionRows[optionKey] =
                this.mergeOptionItemCombinations(optionCombinations[optionKey]);
        });
        return optionRows;
    }
    mergeOptionItemCombinations(optionItemCombinations) {
        const optionRow = {};
        Object.keys(optionItemCombinations).map((optionItemKey) => {
            optionRow[optionItemKey] = this.mergeCombinations(optionItemCombinations[optionItemKey]);
        });
        return optionRow;
    }
    mergeCombinations(combinations) {
        const rows = [];
        while (combinations.length) {
            const combinationA = combinations[0];
            const row = {};
            this.optionKeys.map((optionKey) => {
                row[optionKey] = {
                    isAll: false,
                    keys: [
                        combinationA[optionKey]
                    ],
                };
            });
            combinations.map((combinationB, j) => {
                if (0 === j) {
                    return;
                }
                const diff = this.compareCombinations(combinationA, combinationB);
                if (Object.keys(diff).length === 1) {
                    this.optionKeys.map((optionKey) => {
                        if (diff[optionKey] && !row[optionKey].keys.includes(diff[optionKey])) {
                            row[optionKey].keys.push(diff[optionKey]);
                            if (Object.keys(this.options[optionKey]).length === row[optionKey].keys.length) {
                                row[optionKey].isAll = true;
                            }
                            return;
                        }
                    });
                }
            });
            rows.push(row);
            combinations.splice(0, 1);
        }
        return rows;
    }
    compareCombinations(combinationA, combinationB) {
        const result = {};
        this.optionKeys.map((optionKey) => {
            if (combinationA[optionKey] !== combinationB[optionKey]) {
                result[optionKey] = combinationB[optionKey];
            }
        });
        return result;
    }
    findSelectedOptionInCombination(fixedOptionKey, currentOptionItemKey, combinations, result = {}) {
        combinations.map((combination) => {
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
        });
        return result;
    }
    generateCombinations(index, result = {}) {
        const optionKey = this.optionKeys[index];
        Object.keys(this.options[optionKey]).map((key) => {
            result[optionKey] = key;
            if (this.optionKeys.length == index + 1) {
                this.possibleCombinations.push(JSON.parse(JSON.stringify(result)));
                return;
            }
            this.generateCombinations(index + 1, result);
        });
    }
    compareCombination(combinationA, combinationB) {
        let combinationAWeight = 0;
        let combinationBWeight = 0;
        Object.keys(combinationA).map((optionKey) => {
            combinationA[optionKey].split('').map((char) => {
                combinationAWeight += char.charCodeAt(0);
            });
        });
        Object.keys(combinationB).map((optionKey) => {
            combinationB[optionKey].split('').map((char) => {
                combinationBWeight += char.charCodeAt(0);
            });
        });
        if (combinationAWeight > combinationBWeight) {
            return 1;
        }
        if (combinationAWeight < combinationBWeight) {
            return -1;
        }
        return 0;
    }
}
exports.OptionHandler = OptionHandler;
//# sourceMappingURL=index.js.map