import TransactionsRepository from '../repositories/TransactionsRepository';
import { Double, getCustomRepository , getRepository, Repository} from 'typeorm';
import AppError from '../errors/AppError';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    transactionsRepository.delete({ id });

  }
}

export default DeleteTransactionService;
