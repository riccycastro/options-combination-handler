interface OptionItem {
    [k: string]: string;
}
export interface Option {
    [k: string]: OptionItem;
}
export interface Combination {
    [k: string]: string;
}
export interface OptionItemCombinations {
    [k: string]: Combination[];
}
export interface OptionCombinations {
    [k: string]: OptionItemCombinations;
}
export interface RowItem {
    isAll: boolean;
    keys: string[];
}
export interface Row {
    [k: string]: RowItem;
}
export interface OptionItemRows {
    [k: string]: Row[];
}
export interface OptionRows {
    [k: string]: OptionItemRows;
}
export {};
