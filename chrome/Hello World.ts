import * as puppeteerUtility from '../modules/puppeteer/utility';

async function main(){
    let app = new puppeteerUtility.App();

    await app.initWithHtml(`
        <div style='color:green;'>
            <label id='l1'></label>

            <br /><button id="b1" type="button">Click Me!</button>
            <br /><button id='q' type='button'>Quit</button>
        </div>
    `);

    app.page.exposeFunction('quitApp', async () => {
        await app.quit();
    });
    
    app.page.evaluate(() => {
        let l1 = document.getElementById('l1');
        let b1 = document.getElementById('b1');
        let quitButton = document.getElementById('q');
    
        let counter = 0;
        b1.addEventListener('click', (ev)=>{
            l1.innerText = `Button clicked ${counter++} times`;
            return false;
        });

        quitButton.addEventListener('click', (ev)=> {
            (<any>window).quitApp();
        });
    
        l1.innerText = "Hello World!";
    });

    // should be last line
    await app.waitForEnd();
}

main();