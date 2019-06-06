import { Router, Request, Response } from 'express';


const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
  // fill database with profile
})

router.get('/:id?', (req: Request, res: Response) => {
  const id = req.params.id ? req.params.id : undefined
  // return the profiles
})

export const profileRouter: Router = router