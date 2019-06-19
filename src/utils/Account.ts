import FileUtils from "./FileUtils";
import path from "path";
import { repoPath, commitFile, repoUrl } from "../index";
const git = require('simple-git/promise');
const rmdir = require('rmdir');

export interface IAccountInfo {
    email: string,
    ghPersonalKey: string,
}

export default class Account {
    private remote: string;
    private info: IAccountInfo;
    public error: boolean = false;
    public errorMsg : string = '';
    maxNumberOfCommitsPerDay: number;
    commitDaysPerWeek: number;

    constructor(info: IAccountInfo) {
        this.info = info
        this.remote = `https://${this.info.ghPersonalKey}@${repoUrl}`;
    }

    private errorHandler(err: any, callback: () => void) {
        this.error = true;
        this.errorMsg = err;
        callback();
    }

    public clone(callback: () => void, errCallback: () => void): void {       
        git()
        .silent(true)
        .clone(this.remote)
        .then(() => {
            callback();
        })
        .catch((error: any) => this.errorHandler(error, errCallback));
    }

    public stage(callback: () => void, errCallback: () => void) {
        git(repoPath)
        .silent(true)
        .add([commitFile])
        .then(() => {
            callback();
        })
        .catch((error: any) => this.errorHandler(error, errCallback));
    }

    public alterFile(callback: () => void, errCallback: () => void): void {
        FileUtils.createCommitDiff(path.join(repoPath, commitFile), (err: any) => {
            if (err) {
                this.errorHandler(err, errCallback)
            } else {
                callback();
            }
        });
    }

    public commit(callback: () => void, errCallback: () => void) {
        git(repoPath)
        .silent(true)
        .commit("commit", {
            '--author': `test<${this.info.email}>`
        })
        .then(() => {
            callback()
        })
        .catch((error: any) => this.errorHandler(error, errCallback));
    }

    public push(callback: () => void, errCallback: () => void) {
        git(repoPath)
        .silent(true)
        .push(this.remote, "master")
        .then(() => {
            callback()
        })
        .catch((error: any) => this.errorHandler(error, errCallback));
    }

    public removeRepo(callback: () => void) {
        rmdir(repoPath, () => {
            callback()
        });
    }

    public shouldTheyCommitToday(): boolean {
        return ((this.commitDaysPerWeek / 7) >= Math.random())
    }

    public getNumberOfCommits(): number {
        return (this.maxNumberOfCommitsPerDay * Math.random())
    }
}
