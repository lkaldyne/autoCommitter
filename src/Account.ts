import FileUtils from "./utils/FileUtils";
import path from "path";
const git = require('simple-git/promise');
const rmdir = require('rmdir');

export default class Account {
    private readonly commitFile: string = "README.md";
    private readonly repoPath: string = path.join("./","commitsRepo/");
    private commitProbability: number;
    //private ghPersonalKey: string;
    private user: string;
    private pass: string; 
    private email: string
    private repo: string = "github.com/lkaldyne/commitsRepo.git";
    private remote: string;
    constructor(commitProbability: number, user: string, pass: string, email: string) {
        this.commitProbability = commitProbability;
        this.user = user;
        this.pass = pass;
        this.email = email;
        this.remote = `https://${this.user}:${this.pass}@${this.repo}`;
        //this.ghPersonalKey = ghPersonalKey;
    }

    public clone(callback: () => void): void {       
        git().silent(true)
            .clone(this.remote)
            .then(() => {
                console.log("cloned");
                callback();
            })
            .catch((err : any) => console.error('failed: ', err));
    }

    public stage(callback: () => void) {
        git(this.repoPath).silent(true)
            .add([this.commitFile])
            .then(() => {
                console.log("staged");
                callback();
            })
            .catch((err : any) => console.error('failed: ', err));
    }

    public alterFile(callback: () => void): void {
        FileUtils.createCommitDiff(this.repoPath + this.commitFile, (err: any) => {
            console.log("file modified");
            callback();
        });
    }

    public commit(callback: () => void) {
        git(this.repoPath).silent(true)
            .commit("commit", {'--author': this.user + '<' + this.email + '>'})
            .then(() => callback())
            .catch((err : any) => console.error('failed: ', err));
    }

    public push(callback: () => void) {
        git(this.repoPath).silent(true)
            .push(this.remote, "master")
            .then(() => callback())
            .catch((err : any) => console.error('failed: ', err));
    }

    public removeRepo(callback: () => void) {
        rmdir(this.repoPath, callback());
    }
}
