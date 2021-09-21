import { Readable } from 'stream';
import ImportCsvFileService from '../../src/services/ImportCsvFileService';

describe('csv import', () => {
  test('it should import a csv file and update database with contacts', async() => {
    // arrange
    const testData = [
      'maria,maria@gmail.com'
    ];
    const [name, email] = testData[0].split(',');

    const fileStream = Readable.from(testData);

    const service = new ImportCsvFileService();

    // act
    const [result] = await service.run(fileStream);

    // assert
    expect(result).toEqual({ name: name, email: email });
  });
});
