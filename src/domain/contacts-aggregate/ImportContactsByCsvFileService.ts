import { Readable } from 'stream';
import csv from 'csv-parser';
import { Csv } from '../../@types/Csv';
import logger from '../../infra/log';
import ContactService from './ContactService';

const initialState: Array<Csv> = [];

export default class ImportContactsByCsvFileService {
  async run(fileStream: Readable): Promise<Array<Csv>> {
    const results: Array<Csv> = initialState;

    const parser = fileStream.pipe(csv(['name', 'email']));

    logger.info('begin of contacts importation');

    parser.on('data', async (data) => {
      results.push(data);
      await new ContactService().update(data);
    });

    return new Promise<Array<Csv>>(resolve => parser.on('end', () => {
      logger.info('end of contacts importation');
      resolve(results);
    }));
  }
}
