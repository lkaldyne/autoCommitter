import { Router, Request, Response } from 'express';
import passport from 'passport';
import { NextFunction } from 'connect';
import { User, saveUser } from '../models/User';
import { ensureAuthenticated } from '../utils/passport';
import * as crypto_utils from '../utils/Encrypt';
import Account from '../utils/Account';
import GitTools from '../utils/GitTools';
import { APITools } from './APITools';


const router: Router = Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', {
    successRedirect: '/api/profiles/loginSuccess',
    failureRedirect: '/api/profiles/loginFailure',
  })(req, res, next);
});

router.post('/logout', ensureAuthenticated, (req: Request, res: Response) => {
  req.logOut();
  APITools.respond('Successfully logged out.', 200, res);
});

router.post('/register', async (req: Request, res: Response) => {
  const { username, password, github_token } = req.body;
  if (!username || !password || !github_token) {
    APITools.respond('Missing required field.', 400, res);
  } else {
    const newUser = new User({ username, password, github_token });
    saveUser(newUser, (err: Error) => {
      if (err) {
        APITools.respond(err.message, 500, res);
      } else {
        APITools.respond('Successfully created new user.', 200, res);
      }
    });
  }
});

router.get('/user', ensureAuthenticated, (req: Request, res: Response) => {
  const user: any = new Object(JSON.parse(JSON.stringify(req.user)));
  user.github_token = crypto_utils.decrypt(user.github_token);
  delete user.password;
  res.json(
    {
      User: user,
      status: 'SUCCESS',
    },
  );
});

router.get('/invalidSession', (req: Request, res: Response) => {
  APITools.respond('There is no user in session.', 400, res);
});

router.get('/loginSuccess', (req: Request, res: Response) => {
  APITools.respond('Successfully logged in.', 200, res);
});

router.get('/loginFailure', (req: Request, res: Response) => {
  APITools.respond('Invalid credentials. There was an issue logging in to your account.', 400, res);
});

export const profileRouter: Router = router;
