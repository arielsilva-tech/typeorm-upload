 import { Double, getCustomRepository , getRepository, Repository} from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({title, value, type, category}: Request): Promise<Transaction> {
console.log('entrou no creat');
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);

    const {total} = await transactionsRepository.getBalance();
   
    if(type === 'outcome' && value > total){
     throw new AppError('Operation denied');
    }

    var hasCategory =  await categoryRepository.findOne({
        where: {title: category},
      });

    if(!hasCategory){
      hasCategory = await this.createCategory(category, categoryRepository);
    }
    
    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category: hasCategory,
    });
    console.log('categoria');

    console.log(hasCategory);
    await transactionsRepository.save(transaction);
    console.log(transaction);

    return transaction;
  }

  private async createCategory(name: string, categoryRepository: any): Promise<Category> {
    const category = categoryRepository.create({title: name});
    await categoryRepository.save(category);

    return category;
    
  }
}

export default CreateTransactionService;
