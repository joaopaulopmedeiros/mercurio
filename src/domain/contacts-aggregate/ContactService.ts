import { Csv } from '../../@types/Csv';
import Contact from './Contact';
import logger from '../../infra/log';

class ContactService {
  async findAll() {
    return await Contact.find({});
  }

  async update(data: Csv) {
    logger.info(`updating ${data.email}`);
    console.log(data);
    await Contact.findOneAndUpdate({ email: data.email }, data, { upsert: true, setDefaultsOnInsert: true });
  }
}

export default ContactService;
