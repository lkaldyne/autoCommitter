import { Router, Request, Response } from 'express';
import { User, saveUser } from '../models/User';
import passport from 'passport';
import { NextFunction } from 'connect';

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
  // fill database with profile
})

router.get('/:id?', (req: Request, res: Response) => {
  const id = req.params.id ? req.params.id : undefined
  // return the profiles
})

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', {
    successRedirect: '/api/profiles/loginSuccess',
    failureRedirect: '/api/profiles/loginFailure'
  })(req, res, next); 
});

router.get('/loginSuccess', (req: Request, res: Response) => {
  res.send("Successfully logged in!");
});

router.get('/loginFailure', (req: Request, res: Response) => {
  res.send("Login failed!");
});

router.get('/logout', (req: Request, res: Response) => {
  req.logOut(); 
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

export const profileRouter: Router = router