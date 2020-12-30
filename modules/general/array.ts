

export namespace array{

    // from: https://stackoverflow.com/questions/36947847/how-to-generate-range-of-numbers-from-0-to-n-in-es2015-only
    export function range (start: number, end: number) { return [...Array(1+end-start).keys()].map(v => start+v) }


    export function distinct(items: Array<any>): Array<any>{
        // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
        return [...new Set(items)];
    }


}