import * as puppeteerUtility from '../modules/puppeteer/utility';
import {file} from '../modules/general/file';
import * as path from "path";
import {html} from '../modules/general/html';

async function main(){
    let app = new puppeteerUtility.App();

    let textHtml = await file.read(path.resolve(__dirname,  'List_Top_Processes_Browser.html'));
    textHtml += await html.tagScriptModule(path.resolve(__dirname, 'List_Top_Processes_Browser.js'));

    await app.initWithHtml( textHtml );

    app.page.exposeFunction('sysCallGetTopProcesses', async () => {
        
    });

    // should be last line
    await app.waitForEnd();
}

main();