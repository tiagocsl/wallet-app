import Transaction from '../entity/transaction.entity';

interface TransactionRepository {
    annotateTransaction(transaction: Transaction): Promise<Transaction>;
    getTransactionById(id: number): Promise<Transaction>;
    getAllTransactions(): Promise<Transaction[]>;
}

export default TransactionRepository;
