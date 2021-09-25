import { Request, Response } from 'express';

class ContactController {
  static index(request: Request, response: Response) {
    return response.json("hi");
  }
  static importByCsv(request: Request, response: Response) {
    return response.json("csv imported");
  }
}

export default ContactController;
