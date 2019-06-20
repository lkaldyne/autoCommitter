import path from 'path';
import FileUtils from './FileUtils';
import { repoPath, commitFile, repoUrl } from '../index';

const git = require('simple-git/promise');
const rmdir = require('rmdir');

export interface IAccountInfo {
    email: string,
    ghPersonalKey: string,
}

export default class Account {
    private remote: string;
    private info: IAccountInfo;
    private maxNumberOfCommitsPerDay: number;
    private commitDaysPerWeek: number;

    constructor(info: IAccountInfo) {
      this.info = info;
      this.remote = `https://${this.info.ghPersonalKey}@${repoUrl}`;
    }

    public async clone() {
      return git()
        .silent(true)
        .clone(this.remote)
    }

    public stage() {
      return git(repoPath)
        .silent(true)
        .add([commitFile])
    }

    public alterFile() {
      return new Promise((resolve, reject) => {
        FileUtils.createCommitDiff(path.join(repoPath, commitFile), (err: any) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      })
    }

    public async commit() {
      return git(repoPath)
        .silent(true)
        .commit('commit', {
          '--author': `test<${this.info.email}>`,
        })
    }

    public push() {
      return git(repoPath)
        .silent(true)
        .push(this.remote, 'master')
    }

    public removeRepo() {
      return new Promise((resolve, reject) => {
        rmdir(repoPath, () => {
          resolve();
        });
      })
    }

    public shouldTheyCommitToday(): boolean {
      return ((this.commitDaysPerWeek / 7) >= Math.random());
    }

    public getNumberOfCommits(): number {
      return (this.maxNumberOfCommitsPerDay * Math.random());
    }
}
