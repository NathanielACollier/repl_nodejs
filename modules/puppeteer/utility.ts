import * as puppeteer from 'puppeteer';

export class App {
    browser: puppeteer.Browser;
    page: puppeteer.Page;

    constructor(){

    }

    async initWithHtml(htmlText: string){

        /*
        The key to getting chrome to open in app mode, is to give it a real URL that doesn't really exist
        Then immediately cause chrome to navigate to "about:blank"
        */

        this.browser = await puppeteer.launch({
            headless: false,
            args: ['--app=http://localhost/null']
        });

        this.page = (await this.browser.pages())[0];

        await this.page.goto("about:blank"); 


        await this.page.setContent(htmlText);

        // setup the way to get the quit signal
        await this.page.evaluate(() => {
            (<any>window).programDone = false;
        });
    }


    async quit(){
        await this.page.evaluate(() => {
            (<any>window).programDone = true; // will trigger the program to end
        });
    }

    async waitForEnd(){
        await this.page.waitForFunction(() => {
            return (<any>window).programDone == true;
        });

        console.log('Program finished triggered');
        await this.page.close();
        await this.browser.close();
    }


}