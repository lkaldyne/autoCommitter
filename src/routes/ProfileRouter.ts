import { Router, Request, Response } from 'express';
import { User, saveUser } from '../models/User';
import passport from 'passport';
import { NextFunction } from 'connect';
import { ensureAuthenticated } from '../utils/passport';
import * as crypto_utils from '../utils/Encrypt';


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
  console.log('wero')
  let github_decrypted_token = crypto_utils.decrypt(req.user.github_token);
  req.user.github_token = github_decrypted_token;

  res.json(
    {
      User: req.user,
      status: "SUCCESS"
    });
});

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