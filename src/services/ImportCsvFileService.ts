import { Readable } from 'stream';
import csv from 'csv-parser';

type CsvResult = {
  nome: string|undefined,
  email: string|undefined
};

const initialState: Array<CsvResult> = [];

export default class ImportCsvFileService {
  async run(fileStream: Readable) : Promise<Array<CsvResult>> {
    const results: Array<CsvResult> = initialState;

    const parser = fileStream.pipe(csv(['nome', 'email']));

    parser.on('data', (data) => results.push(data));

    return new Promise<Array<CsvResult>>(resolve => parser.on('end', () => {
      resolve(results);
    }));
  }
}
