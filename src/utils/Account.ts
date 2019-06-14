import FileUtils from "./FileUtils";
import path from "path";
import { repoPath, commitFile, repoUrl } from "../index";
const git = require('simple-git/promise');
const rmdir = require('rmdir');

export interface IAccountInfo {
    username: string,
    email: string,
    ghPersonalKey: string,
    maxNumberOfCommitsPerDay: number,
    commitDaysPerWeek: number
}

export default class Account {
    private remote: string;
    private info: IAccountInfo;

    constructor(info: IAccountInfo) {
        this.info = info
        this.remote = `https://${this.info.username}:${this.info.ghPersonalKey}@${repoUrl}`;
    }

    private errorHandler(err: any) {
        console.error('failed: ', err)
    }

    public clone(callback: () => void): void {       
        git()
        .silent(true)
        .clone(this.remote)
        .then(() => {
            console.log("cloned");
            callback();
        })
        .catch(this.errorHandler);
    }

    public stage(callback: () => void) {
        git(repoPath)
        .silent(true)
        .add([commitFile])
        .then(() => {
            console.log("staged");
            callback();
        })
        .catch(this.errorHandler);
    }

    public alterFile(callback: () => void): void {
        FileUtils.createCommitDiff(path.join(repoPath, commitFile), (err: any) => {
            console.log("file modified");
            callback();
        });
    }

    public commit(callback: () => void) {
        git(repoPath)
        .silent(true)
        .commit("commit", {
            '--author': `${this.info.username}<${this.info.email}>`
        })
        .then(() => {
            console.log("file committed")
            callback()
        })
        .catch(this.errorHandler);
    }

    public push(callback: () => void) {
        git(repoPath)
        .silent(true)
        .push(this.remote, "master")
        .then(() => {
            console.log("pushed")
            callback()
        })
        .catch(this.errorHandler);
    }

    public removeRepo(callback: () => void) {
        rmdir(repoPath, () => {
            console.log("repo deleted")
            callback()
        });
    }

    public shouldTheyCommitToday(): boolean {
        return ((this.info.commitDaysPerWeek / 7) >= Math.random())
    }

    public getNumberOfCommits(): number {
        return (this.info.maxNumberOfCommitsPerDay * Math.random())
    }
}
