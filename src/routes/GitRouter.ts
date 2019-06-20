import { Router, Request, Response } from 'express';
import { User } from '../models/User';

const router: Router = Router();

router.get('/job', (req: Request, res: Response) => {
  User.find({} , (err, users) => {
      if (err) {
        
      }
  });
})

export const gitRouter: Router = router;