import { Request, Response } from 'express';

class ContactController {
  static index(request: Request, response: Response) {
    return response.json("hi");
  }
}

export default ContactController;
