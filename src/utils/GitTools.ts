import Account from './Account';
import { response } from 'express';

export default class GitTools {
  public static async commitOneUser(account: Account) {
    await account.clone()
    await account.alterFile()
    await account.stage()
    await account.commit()
    await account.push()
    await account.removeRepo()
  }

  public static async runCommitJob(account: Account) {
    const isCommitting = account.shouldTheyCommitToday()
    const numCommits = account.getNumberOfCommits()
    account.log(`committing?: ${isCommitting} (${account.getMaxNumberOfCommitsPerWeek()} / 7)`)
    account.log(`Number of commits: ${numCommits} / ${account.getMaxNumberOfCommitsPerDay()}`)
    if (isCommitting) {
      await account.clone()
      for (let i = 0; i < numCommits; i++) {
        await account.alterFile()
        await account.stage()
        await account.commit()
      }
      await account.push()
      await account.removeRepo()
    }
  }
}
