

function ltrim(str: string, charsToTrim: string[]) {

    if( str== null || str.length < 1 ){
        return str;
    }

    let first = str[0];

    if( charsToTrim.filter((val:string,index:number)=>{
        return val == first;
    }).length > 0 ){
        // something matched the first character so get rid of it
        return ltrim(str.substr(1), charsToTrim);
    }else {
        return str; // we've removed all we can
    }

}


function test(value: string, expected: string ){
    let actual = ltrim(value, ["0"]);
    if( expected === actual){
        console.log(`${value} - PASSED`);
    }else {
        console.log(`\nFAILED\ntesting\n\toriginal=[${value}]\n\tActual=[${actual}]`)
    }
}


test("00001", "1");
test("0","");
test("","");
test("0.0000001",".0000001");