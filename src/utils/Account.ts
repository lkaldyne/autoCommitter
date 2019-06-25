import path from 'path';
import FileUtils from './FileUtils';
import { repoPath, commitFile, repoUrl } from '../index';

const git = require('simple-git/promise');
const rmdir = require('rmdir');

export enum NumWeekdays {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7
}

export interface IAccountInfo {
    email: string,
    ghPersonalKey: string,
    maxCommitsPerDay?: number,
    maxCommitsPerWeek?: NumWeekdays
}

export default class Account {
    private remote: string;
    private info: IAccountInfo;

    constructor(info: IAccountInfo) {
      this.info = info;
      this.remote = `https://${this.info.ghPersonalKey}@${repoUrl}`;
    }

    public getMaxNumberOfCommitsPerDay() {
      return this.info.maxCommitsPerDay
    }

    public getMaxNumberOfCommitsPerWeek() {
      return this.info.maxCommitsPerWeek
    }

    public async clone() {
      this.log("Cloning")
      return git()
        .silent(false)
        .clone(this.remote)
    }

    public stage() {
      this.log("Staging")

      // require('simple-git')()
      // .addConfig('user.name', 'test')
      // .addConfig('user.email', this.info.email)

      return git(repoPath)
        .silent(false)
        .add([commitFile])
    }

    public alterFile() {
      this.log("Altering File")
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
      this.log("Committing")
      return git(repoPath)
        .silent(false)
        .commit('commit', {
         '--author': `test<${this.info.email}>`,
        })
    }

    public push() {
      this.log("Pushing")
      return git(repoPath)
        .silent(false)
        .push(this.remote, 'master')
    }

    public removeRepo() {
      this.log("Removing Repo")
      return new Promise((resolve, reject) => {
        rmdir(repoPath, () => {
          resolve();
        });
      })
    }

    public shouldTheyCommitToday(): boolean {
      return ((this.info.maxCommitsPerWeek / 7) >= Math.random());
    }

    public getNumberOfCommits(): number {
      return Math.floor((this.info.maxCommitsPerDay * Math.random()));
    }

    public log(message: string): void {
      console.log(`${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')} ${this.info.email} | ${message}`)
    }
}
