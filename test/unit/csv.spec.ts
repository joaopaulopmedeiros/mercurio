import fs from 'fs';
import path from 'path';
import ImportCsvFileService from '../../src/services/ImportCsvFileService';

describe('csv import', () => {
  test('it should import a csv file and update database with contacts', async() => {
    // arrange
    const fileStream = fs.createReadStream(path.resolve(__dirname, 'data.csv'));

    const service = new ImportCsvFileService();

    // act
    const results = await service.run(fileStream);
    console.log(results);
  });
});
