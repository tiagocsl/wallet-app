import Transaction from 'core/entity/Transaction.entity';
import TransactionRepository from 'core/repository/Transaction.repository';

class TransactionUsecase {
    transactionRepository: TransactionRepository;

    constructor(transactionRepository: TransactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    async annotateTransaction(transaction: Transaction): Promise<Transaction> {
        try {
            const normalizedDate = this.convertStringToDate(
                transaction.emission_date
            );
            const newTransaction: Transaction =
                await this.transactionRepository.annotateTransaction({
                    ...transaction,
                    emission_date: normalizedDate,
                });
            return newTransaction;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to create a transaction. \nError: ${error}`
            );
        }
    }

    private convertStringToDate(date: Date) {
        return new Date(date);
    }

    async getTransactionById(id: number): Promise<Transaction> {
        try {
            const transaction: Transaction =
                await this.transactionRepository.getTransactionById(id);
            this.hasTransaction(transaction);
            return transaction;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get transaction. \nError: ${error}`
            );
        }
    }

    private hasTransaction(transaction: Transaction | null) {
        if (transaction == null)
            throw new Error('The given id does not exist in the database');
    }

    async getAllTransactions(): Promise<Transaction[]> {
        try {
            const transactionList: Transaction[] =
                await this.transactionRepository.getAllTransactions();
            return transactionList;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get all transactions. \nError: ${error}`
            );
        }
    }

    async deleteTransaction(id: number): Promise<void> {
        try {
            await this.transactionRepository.deleteTransaction(id);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get all transactions. \nError: ${error}`
            );
        }
    }

    async deleteManyTransactions(ids: number[]): Promise<void> {
        try {
            await this.transactionRepository.deleteManyTransactions(ids);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get all transactions. \nError: ${error}`
            );
        }
    }

    async updateTransaction(transactionData: Transaction): Promise<void> {
        try {
            await this.transactionRepository.updateTransaction(transactionData);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get all transactions. \nError: ${error}`
            );
        }
    }

    async updateTransactionValue(id: number, value: number): Promise<void> {
        try {
            await this.transactionRepository.updateTransactionValue(id, value);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get all transactions. \nError: ${error}`
            );
        }
    }

    async updateTransactionOrigin(id: number, origin: string): Promise<void> {
        try {
            await this.transactionRepository.updateTransactionOrigin(
                id,
                origin
            );
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get all transactions. \nError: ${error}`
            );
        }
    }

    async updateTransactionDestiny(id: number, destiny: string): Promise<void> {
        try {
            await this.transactionRepository.updateTransactionDestiny(
                id,
                destiny
            );
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get all transactions. \nError: ${error}`
            );
        }
    }

    async updateTransactionEmissionDate(id: number, date: Date): Promise<void> {
        try {
            await this.transactionRepository.updateTransactionEmissionDate(
                id,
                date
            );
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get all transactions. \nError: ${error}`
            );
        }
    }

    async updateTransactionDescription(
        id: number,
        description: string
    ): Promise<void> {
        try {
            await this.transactionRepository.updateTransactionDescription(
                id,
                description
            );
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get all transactions. \nError: ${error}`
            );
        }
    }
}

export default TransactionUsecase;
