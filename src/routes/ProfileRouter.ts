import { Router, Request, Response } from 'express';
import { User, saveUser } from '../models/User'

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
  // fill database with profile
})

router.get('/:id?', (req: Request, res: Response) => {
  const id = req.params.id ? req.params.id : undefined
  // return the profiles
})

router.post('/register', (req: Request, res: Response) => {
  let { username, password } = req.body;
  if (!username || !password) {
    res.sendStatus(400).send('Bad Request. Missing a required field.');
  }
  let newUser = new User({username, password});
  try {
    saveUser(newUser);
  } catch (err) {
    res.sendStatus(500).send(err);
  }
  res.send('Successfully created new user'); 
});

export const profileRouter: Router = router