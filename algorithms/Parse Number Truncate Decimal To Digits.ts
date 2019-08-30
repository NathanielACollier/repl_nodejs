

function padRight(val: string, digits: number, padStr: string ){
    if( val != null ){
        digits -= val.length;
    } else {
        val = "";
    }

    if( digits > 0 ){
        for( let i = 0; i < digits; ++i ){
            val += padStr;
        }
    }

    return val;
}



function parseAndFormatNumberToTruncate(val: string, digits: number): string{
    // developed regex using this tool: https://regex101.com/
    // pull out only a specific number of digits to the right of the decimal
    let r = new RegExp("(-?\\d+)\\.?((\\d{"+digits+"})|(\\d+))?");
    let m = r.exec(val);
    //console.log("Regex Result: " + JSON.stringify(m));

    // 0 would be the number
    // 1 should be int part
    // 2 should be decimal part truncated to requested digits
    let intPart: string;
    let decimalPart: string;

    if( m == null || m[1] == null ){
        intPart = "0";
    } else {
        intPart = m[1];
    }

    if( m == null || m[2] == null ){
        if( digits > 0 ){
            decimalPart = "0";
        }
        
    } else {
        decimalPart =  m[2];
    }
    //console.log("Decimal is " + decimalPart);
    decimalPart = padRight(decimalPart, digits, "0");


    return intPart + "." + decimalPart;
}


function test(value: string, expected: string ){
    let actual = parseAndFormatNumberToTruncate(value,2);
    if( expected === actual){
        console.log(`${value} - PASSED`);
    }else {
        console.log(`\nFAILED\ntesting original=[${value}] parsed=[${actual}]`)
    }
}

test("0","0.00");
test("17.365", "17.36");
test("Apple", "0.00");
test("272.5", "272.50");
test("25.3", "25.30");
test("300.6858439239582098590238523", "300.68");
test("-18.3434", "-18.34");
test("6", "6.00");
test("000,000.00000", "0.00");
test(".00", "0.00");
test("19.99999", "19.99");