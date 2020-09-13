import { Double, getCustomRepository , getRepository, Repository} from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Transactions {
    transactions: Transaction[];
    balance: any;
  }

class ListTransactionService {

    public async execute(): Promise<Transactions> {
        const transactionsRepository = getCustomRepository(TransactionsRepository);

        const transactions = await transactionsRepository.find({
            relations: ['category_id'],
          });
        const balance = await transactionsRepository.getBalance();
       
        return {transactions, balance};
    }

}

export default ListTransactionService;