import { Readable } from 'stream';
import { MongoClient } from 'mongodb';
import ImportCsvFileService from '../../src/services/ImportCsvFileService';

describe('csv import', () => {
  let connection: MongoClient;

  beforeAll(async () => {
    const url: string | undefined = process.env.MONGO_URL;

    if (!url) {
      throw new Error('Database could be initialized');
    }

    connection = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await connection.close();
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
