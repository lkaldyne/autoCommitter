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
}
