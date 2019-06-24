import { Router, Request, Response } from 'express';
import passport from 'passport';
import { NextFunction } from 'connect';
import { User, saveUser } from '../models/User';
import { ensureAuthenticated } from '../utils/passport';
import * as crypto_utils from '../utils/Encrypt';
import { APITools } from './APITools';
import bcrypt from 'bcrypt';

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
  const defaultCommitNumber = 3;
  const { username, password, github_token } = req.body;
  if (!username || !password || !github_token) {
    APITools.respond('Missing required field.', 400, res);
  } else {
    const newUser = new User({ username, password, github_token, commitsPerDay: defaultCommitNumber, commitsPerWeek: defaultCommitNumber });
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

router.put('/user', ensureAuthenticated, (req: Request, res: Response) => {
  const { username, commitsPerDay, commitsPerWeek } = req.body;
  if (username !== undefined && commitsPerDay !== undefined && commitsPerWeek !== undefined) return res.redirect('/auth/missingFieldError');
  req.user.username = username !== undefined ? username : req.user.username;
  req.user.commitsPerDay = commitsPerDay !== undefined ? commitsPerDay : req.user.commitsPerDay;
  req.user.commitsPerWeek = commitsPerWeek !== undefined ? commitsPerWeek : req.user.commitsPerWeek;
  req.user.save()
    .then((user: any) => {
      APITools.respond('Successfully updated user.', 200, res);
    })
    .catch((err: Error) => {
      APITools.respond(err.toString() , 500, res);
    });
});

router.put('/userToken', ensureAuthenticated, (req: Request, res: Response) => {
  const { newGithubToken } = req.body;
  if (newGithubToken == undefined) return res.redirect('/auth/missingFieldError');
  req.user.github_token = crypto_utils.encrypt(newGithubToken);
  req.user.save()
    .then((user: any) => {
      APITools.respond('Successfully updated user.', 200, res);
    })
    .catch((err: Error) => {
      APITools.respond(err.toString() , 500, res);
    });
});

router.put('/userNewPass', ensureAuthenticated, (req: Request, res: Response) => {
  const { oldPassword, password1, password2 } = req.body;
  if (oldPassword === undefined || password1 === undefined || password2 === undefined) return res.redirect('/auth/missingFieldError');
  bcrypt.compare(oldPassword, req.user.password, (err: Error, isMatch: boolean) => {
    if (err) console.error(err);
    if (isMatch) {
      if (password1 === password2) {
        req.user.password = password1
        saveUser(req.user, (err: Error) => {
          if (err) {
            APITools.respond(err.message, 500, res);
          } else {
            APITools.respond('Successfully Updated User.', 200, res);
          }
        })
      }
      else {
        APITools.respond('New Passwords do not Match', 201, res)
      }  
    }
    else {
      APITools.respond('Old Password is Incorrect', 201, res)
    }
  });
});

router.delete('/user', ensureAuthenticated, (req: Request, res: Response) => {
  User.findByIdAndDelete({ _id: req.user.id })
    .then((user) => {
      APITools.respond('Successfully deleted user.', 200, res);
    })
    .catch((err: Error) => {
      APITools.respond(err.toString() , 500, res);
    });
});

router.get('/missingFieldError', (req: Request, res: Response) => {
  APITools.respond('Missing a required field.' , 400, res);
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
