import { Readable } from 'stream';
import csv from 'csv-parser';
import Contact from './Contact';
import { CsvResult } from '../../@types/Csv';
import logger from '../../infra/log';

const initialState: Array<CsvResult> = [];

export default class ImportContactsByCsvFileService {
  async run(fileStream: Readable): Promise<Array<CsvResult>> {
    const results: Array<CsvResult> = initialState;

    const parser = fileStream.pipe(csv(['name', 'email']));

    logger.info('begin of contacts importation');

    parser.on('data', async (data) => {
      results.push(data);
      const { email } = data;

      await Contact.findOneAndUpdate(
        email,
        data,
        { upsert: true }
      );
    });

    return new Promise<Array<CsvResult>>(resolve => parser.on('end', () => {
      logger.info('end of contacts importation');
      resolve(results);
    }));
  }
}
