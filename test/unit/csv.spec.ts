import { Readable } from 'stream';
import * as db from '../utils/db';
import ImportCsvFileService from '../../src/services/ImportCsvFileService';

describe('csv import', () => {

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.close();
  });
  test('it should import a csv file and update database with contacts', async () => {
    const testData = [
      'maria,maria@gmail.com'
    ];

    const [expectedName, expectedEmail] = testData[0].split(',');

    const fileStream = Readable.from(testData);

    const service = new ImportCsvFileService();

    const [result] = await service.run(fileStream);

    expect(result).toEqual({ name: expectedName, email: expectedEmail });
  });
});
