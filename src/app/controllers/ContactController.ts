import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import ImportContactsByCsvFileService from '../../domain/contacts-aggregate/ImportContactsByCsvFileService';
import uploadConfig from '../../infra/upload';
import ContactService from '../../domain/contacts-aggregate/ContactService';

class ContactController {
  static async index(request: Request, response: Response) {
    const results = await new ContactService().findAll();
    return response.json(results);
  }

  static async importByCsv(request: Request, response: Response) {
    const fileName: string | undefined = request.file?.filename;
    const filePath = path.resolve(uploadConfig.tmpDir, String(fileName));
    const contactsReadStream = fs.createReadStream(filePath);

    const service = new ImportContactsByCsvFileService();
    await service.run(contactsReadStream);

    return response.json({ message: 'csv successfuly imported' });
  }
}

export default ContactController;
