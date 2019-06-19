import { Router, Request, Response } from 'express';
import { User, saveUser } from '../models/User';
import passport from 'passport';
import { NextFunction } from 'connect';
import { ensureAuthenticated } from '../utils/passport';
import * as crypto_utils from '../utils/Encrypt';
import Account from '../utils/Account';
import GitTools from '../utils/GitTools';


const router: Router = Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', {
    successRedirect: '/api/profiles/loginSuccess',
    failureRedirect: '/api/profiles/loginFailure'
  })(req, res, next);
});

router.post('/logout', ensureAuthenticated, (req: Request, res: Response) => {
  req.logOut();
  res.status(200).json(
    {
      description: "Successfully logged out.",
      status: "SUCCESS"
    });
});

router.post('/register', async (req: Request, res: Response) => {

  let { username, password, github_token } = req.body;
  if (!username || !password || !github_token) {
    res.status(200).json(
      {
        description: "Missing required field.",
        status: "FAILURE"
      });
    return;
  }
  let newUser = new User({ username, password, github_token });
  saveUser(newUser, (err: Error) => {
    if (err) res.status(500).send({ err });
    else res.status(200).json(
      {
        description: "Successfully created new user.",
        status: "SUCCESS"
      });
  });
});

router.get('/user', ensureAuthenticated, (req: Request, res: Response) => {
  let user: any =  new Object(JSON.parse(JSON.stringify(req.user)));
  user.github_token = crypto_utils.decrypt(user.github_token);
  delete user.password;
  res.json(
    {
      User: user,
      status: "SUCCESS"
    });
});

router.post('/commitOneUser', async (req: Request, res: Response) => {
  try {
    const { username, github_token } = req.user;
    let dec_github_token: string = crypto_utils.decrypt(github_token);
    console.log(dec_github_token);
    let newAccount = new Account({
      email: username,
      ghPersonalKey: dec_github_token
    });
    GitTools.commitOneUser(newAccount, () => {
      if(newAccount.error) {
        res.status(400).json(
          {
            description: newAccount.errorMsg,
            status: "FAILURE"
          });
        return;
      }
      else {
        res.status(200).json(
          {
            status: "SUCCESS"
          });
      }
    });
  } catch (err) {
    res.status(400).json({
      description: err.toString(),
      status: "FAILURE"
    });
  }
})

router.get('/invalidSession', (req: Request, res: Response) => {
  res.status(400).json(
    {
      description: "There is no user in session.",
      status: "FAILURE"
    });
});

router.get('/loginSuccess', (req: Request, res: Response) => {
  res.status(200).json(
    {
      description: "Successfully logged in.",
      status: "SUCCESS"
    });
});

router.get('/loginFailure', (req: Request, res: Response) => {
  res.status(400).json(
    {
      description: "Invalid credentials. There was an issue logging in to your account.",
      status: "FAILURE"
    });
});

export const profileRouter: Router = router
