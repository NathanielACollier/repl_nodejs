import * as puppeteer from 'puppeteer';

export async function displayHTML(htmlText: string): Promise<{browser: puppeteer.Browser, page: puppeteer.Page}>{
    let browser = await puppeteer.launch({
        headless: false,
        args: ['--app=http://localhost/null']
    });
    
    let page = (await browser.pages())[0];
    // wait for navigation causes a problem now that we are doing localhost/null
    //await page.waitForNavigation(); // wait for it to fail to load http://localhost/null
    
    await page.setContent(htmlText);

    return {
        browser: browser,
        page: page
    };
}