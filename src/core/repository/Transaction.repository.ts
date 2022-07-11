import Transaction from '../entity/transaction.entity';

interface TransactionRepository {
    makeTransaction(transaction: Transaction): Promise<Transaction>;
    getTransactionById(id: number): Promise<Transaction>;
    getAllTransactions(): Promise<Transaction[]>;
}

export default TransactionRepository;
