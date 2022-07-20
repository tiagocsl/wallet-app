import Transaction from '../entity/transaction.entity';

interface TransactionRepository {
    annotateTransaction(transaction: Transaction): Promise<Transaction>;
    getTransactionById(id: number): Promise<Transaction>;
    getAllTransactions(): Promise<Transaction[]>;
    deleteTransaction(id: number): Promise<void>;
    deleteManyTransactions(ids: number[]): Promise<void>;
    updateTransaction(transaction: Transaction): Promise<void>;
    updateTransactionValue(id: number, value: number): Promise<void>;
    updateTransactionOrigin(id: number, origin: string): Promise<void>;
    updateTransactionDestiny(id: number, destiny: string): Promise<void>;
    updateTransactionEmissionDate(id: number, date: Date): Promise<void>;
    updateTransactionDescription(
        id: number,
        description: string
    ): Promise<void>;
}

export default TransactionRepository;
