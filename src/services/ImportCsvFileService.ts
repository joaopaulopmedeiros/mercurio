import { Readable } from 'stream';
import csv from 'csv-parser';
import Contact from '../../src/domain/entities/Contact';

type CsvResult = {
  name: string | undefined,
  email: string | undefined
};

const initialState: Array<CsvResult> = [];

export default class ImportCsvFileService {
  async run(fileStream: Readable): Promise<Array<CsvResult>> {
    const results: Array<CsvResult> = initialState;

    const parser = fileStream.pipe(csv(['name', 'email']));

    // eslint-disable-next-line space-before-function-paren
    parser.on('data', async (data) => {
      results.push(data);
      const { email } = data;
      await Contact.findOneAndUpdate(
        { email },
        { upsert: true }
      );
    });

    return new Promise<Array<CsvResult>>(resolve => parser.on('end', () => {
      resolve(results);
    }));
  }
}
