import CreateTransactionService from '../services/CreateTransactionService';
import Transaction from '../models/Transaction';
import ReadCsv from '../services/ReadCSV';
import UploadConfig from '../config/upload';
import path from 'path';

class ImportTransactionsService {
  async execute(fileName: string): Promise<Transaction[]> {
    console.log('ImportTransactionsService');

    const readCsv = new ReadCsv();
    const csvFilePath = path.join(UploadConfig.directory, fileName);
    const data = await readCsv.loadCSV(csvFilePath);

    var transactionImpoted : Transaction[];
    transactionImpoted = [];
    const createTransactionService = new CreateTransactionService();

    //TODO melhorar
    for (const line of data) { 
       const [title, type, value, category] = line;
       const transaction = await createTransactionService.execute({title, value, type, category});
       transactionImpoted.push(  transaction);
    }

    return transactionImpoted;
  }
}

export default ImportTransactionsService;
