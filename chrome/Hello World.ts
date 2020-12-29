import * as puppeteerUtility from '../modules/puppeteer/utility';

async function main(){

    let puppeteer = await puppeteerUtility.displayHTML(`
        <div style='color:green;'>
            <label id='l1'></label>

            <br /><button id="b1" type="button">Click Me!</button>
        </div>
    `);


    
    await puppeteer.page.evaluate(() => {
        let l1 = document.getElementById('l1');
        let b1 = document.getElementById('b1');
    
        let counter = 0;
        b1.addEventListener('click', (ev)=>{
            l1.innerText = `Button clicked ${counter++} times`;
            return false;
        });
    
        l1.innerText = "Hello World!";
    
    
    });
}

main();