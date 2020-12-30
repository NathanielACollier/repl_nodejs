import * as puppeteer from 'puppeteer';

export class App {
    browser: puppeteer.Browser;
    page: puppeteer.Page;

    constructor(){

    }

    async initWithHtml(htmlText: string){
        this.browser = await puppeteer.launch({
            headless: false,
            args: ['--app=http://localhost/null']
        });

        this.page = (await this.browser.pages())[0];

        // wait for navigation causes a problem now that we are doing localhost/null
        //await page.waitForNavigation(); // wait for it to fail to load http://localhost/null

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