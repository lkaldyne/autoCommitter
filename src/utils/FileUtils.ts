'use strict'

import fs from 'fs';

export default class FileUtils {

    public createCommitDiff(filePath: string): void {
        fs.writeFile(filePath, new Date().toISOString, (err) => {
            if (err) 
                console.log(err);
        }); 
    }

}