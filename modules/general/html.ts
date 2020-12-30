import {file} from './file';

export namespace html{


    export async function tagScriptModule(filePath: string): Promise<string> {
        let text = await file.read(filePath);

        let html = `
        <script type='module'>
            ${text}
        </script>
        `;

        return html;
    }


}