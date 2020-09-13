import { Router } from 'express';
import multer from 'multer';
import { Double, getCustomRepository , getRepository, Repository} from 'typeorm';

 import TransactionsRepository from '../repositories/TransactionsRepository';
 import CreateTransactionService from '../services/CreateTransactionService';
 import ListTransactionService from '../services/ListTransactionService';
 import DeleteTransactionService from '../services/DeleteTransactionService';
 import ImportTransactionsService from '../services/ImportTransactionsService';

import uploadConfig from '../config/upload';


const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
 //  const listTransactionService = new ListTransactionService();
 //  const transactions = await listTransactionService.execute();
  const transactionsRepository = getCustomRepository(TransactionsRepository);
  const transactions = await transactionsRepository.find();
  const balance = await transactionsRepository.getBalance();

  return response.json({transactions, balance});
 
});

transactionsRouter.post('/', async (request, response) => {
  
  const {title, value, type, category} = request.body;

  const createTransactionService = new CreateTransactionService();
  const transaction = await createTransactionService.execute({title, value, type, category});

  return response.json(transaction);

});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deleteTransactionService = new DeleteTransactionService();
  await deleteTransactionService.execute(id);
  return response.send();
});

transactionsRouter.post('/import',upload.single('file'), async (request, response) => {
  // TODO
  const importTransactionsService = new ImportTransactionsService();
  const trasactionsImported = await importTransactionsService.execute(request.file.filename);

  return response.json(trasactionsImported);
});

export default transactionsRouter;
