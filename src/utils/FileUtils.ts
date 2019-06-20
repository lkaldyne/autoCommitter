import fs from 'fs';

export default class FileUtils {
  public static createCommitDiff(filePath: string, callback: (err? : any) => void): void {
    fs.writeFile(filePath, new Date().toISOString(), (err) => {
      callback(err);
    });
  }
}
