import { Response } from 'express';

export class APITools {
  public static respond(message: string, status: number, res: Response) {
    res.status(status).json(
      {
        description: message,
        status,
      },
    );
  }
}
