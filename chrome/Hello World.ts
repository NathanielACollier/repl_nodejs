import * as puppeteer from 'puppeteer';

async function main(){
    let browser = await puppeteer.launch({
        headless: false,
        args: ['--app=http://localhost/null']
    });
    
    let page = (await browser.pages())[0];
    await page.waitForNavigation(); // wait for it to fail to load http://localhost/null
    
    await page.setContent(`
        <div style='color:green;'>
            <label id='l1'></label>
    
            <br /><button id="b1" type="button">Click Me!</button>
        </div>
    `);
    
    await page.evaluate(() => {
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