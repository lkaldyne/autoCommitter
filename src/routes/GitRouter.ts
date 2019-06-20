import { Router, Request, Response } from 'express';
import { User } from '../models/User';
import { APITools } from './APITools';
import * as crypto_utils from '../utils/Encrypt';
import Account from '../utils/Account';
import GitTools from '../utils/GitTools';
import { ensureAuthenticated } from '../utils/passport';

const router: Router = Router();

router.get('/job', async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const ghPersonalKey: string = crypto_utils.decrypt(user.github_token);
      console.log(`Doing a commit for ${ghPersonalKey}`);
      const account = new Account({
        email: user.username,
        ghPersonalKey,
      });
      await GitTools.commitOneUser(account)
    }
    APITools.respond('', 200, res)
  } catch(err) {
    APITools.respond('Internal server error', 500, res)
  }
})

router.post('/commitOneUser', ensureAuthenticated, async (req: Request, res: Response) => {
  try {
    const { username, github_token } = req.user;
    const ghPersonalKey: string = crypto_utils.decrypt(github_token);
    console.log(ghPersonalKey);
    const newAccount = new Account({
      email: username,
      ghPersonalKey,
    });
    await GitTools.commitOneUser(newAccount);
    APITools.respond('Successfully committed', 200, res)
  } catch (err) {
    console.log(err)
    APITools.respond(err.toString(), 500, res);
  }
});


export const gitRouter: Router = router;