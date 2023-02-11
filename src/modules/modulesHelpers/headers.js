import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
const __pathOfHeaders = path.resolve(__dirname, "../", "modulesConfigs", "headers.json");



const headers = {
    getHeaders: ()=>{
        let rawJsonData = fs.readFileSync(__pathOfHeaders);
        let headers = JSON.parse(rawJsonData);
        return headers;
    },
}

export default headers;