import { Router, Request, Response } from 'express';
import { User, saveUser } from '../models/User';
import passport from 'passport';
import { NextFunction } from 'connect';
import { ensureAuthenticated } from '../utils/passport';

const router: Router = Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', {
    successRedirect: '/api/profiles/loginSuccess',
    failureRedirect: '/api/profiles/loginFailure'
  })(req, res, next); 
});

router.post('/logout', (req: Request, res: Response) => {
  req.logOut(); 
  res.send("Successfully logged out.");
});

router.post('/register', async (req: Request, res: Response) => {
  let { username, password } = req.body;
  if (!username || !password) res.status(400).send({error: 'Bad Request. Missing a required field.'});
  let newUser = new User({username, password});
  saveUser(newUser, (err: Error) => {
    if (err) res.status(500).send({ err });
    else res.send('Successfully created new user');  
  });
});

router.post('/testPath', ensureAuthenticated, (req: Request, res: Response) => {
  res.send("User is authenticated!");
});

router.get('/loginSuccess', (req: Request, res: Response) => {
  res.send("Successfully logged in!");
});

router.get('/loginFailure', (req: Request, res: Response) => {
  res.send("Login failed!");
});

export const profileRouter: Router = router