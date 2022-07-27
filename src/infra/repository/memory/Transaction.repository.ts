import Transaction from 'core/entity/Transaction.entity';
import TransactionRepository from 'core/repository/Transaction.repository';
import { hasFindResult, validateIfFoundId } from './_utils';

class TransactionRepositoryMemory implements TransactionRepository {
    transactions: Transaction[] = [
        {
            id: 1,
            value: 25000,
            description: 'First transaction!',
            origin: 'From code',
            destiny: 'To array',
            emission_date: new Date('2022-07-20T19:00:30'),
        },
    ];

    async annotateTransaction(transaction: Transaction): Promise<Transaction> {
        try {
            const lastIdOfTransactions = this.transactions[-1].id;
            const newTransaction = {
                ...transaction,
                id: lastIdOfTransactions + 1,
            };
            return Promise.resolve(newTransaction);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to create a transaction. \nError: ${error}`
            );
        }
    }

    async getTransactionById(id: number): Promise<Transaction> {
        let transaction: Transaction | undefined;
        try {
            transaction = this.transactions.find(
                (transaction) => transaction.id === id
            );
            hasFindResult(transaction?.id);
            return Promise.resolve(transaction as Transaction);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to find a transaction. \nError: ${error}`
            );
        }
    }

    async getAllTransactions(): Promise<Transaction[]> {
        try {
            const transactionList = this.transactions;
            return Promise.resolve(transactionList);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get all transactions. \nError: ${error}`
            );
        }
    }

    async deleteTransaction(id: number): Promise<void> {
        try {
            const transactionIndex = this.transactions.findIndex(
                (transaction) => transaction.id === id
            );
            validateIfFoundId(transactionIndex);
            this.transactions.splice(transactionIndex, 1);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to delete transaction. \nError: ${error}`
            );
        }
    }

    async deleteManyTransactions(ids: number[]): Promise<void> {
        try {
            ids.forEach((id) => {
                const transactionIndex = this.transactions.findIndex(
                    (transaction) => transaction.id === id
                );
                validateIfFoundId(transactionIndex);
                this.transactions.splice(transactionIndex, 1);
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to delete many transactions. \nError: ${error}`
            );
        }
    }

    async updateTransaction(transactionData: Transaction): Promise<void> {
        try {
            this.transactions.find((transaction) => {
                if (transaction.id === transactionData.id) {
                    transaction.value = transactionData.value
                        ? transactionData.value
                        : transaction.value;

                    transaction.origin = transactionData.origin
                        ? transactionData.origin
                        : transaction.origin;

                    transaction.destiny = transactionData.destiny
                        ? transactionData.destiny
                        : transaction.destiny;

                    transaction.description = transactionData.description
                        ? transactionData.description
                        : transaction.description;

                    transaction.emission_date = transactionData.emission_date
                        ? transactionData.emission_date
                        : transaction.emission_date;
                } else {
                    throw new Error(
                        'The given id does not exist in the database'
                    );
                }
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update transaction. \nError: ${error}`
            );
        }
    }

    async updateTransactionValue(id: number, value: number): Promise<void> {
        try {
            this.transactions.find((transaction) => {
                if (transaction.id === id) {
                    transaction.value = value;
                } else {
                    throw new Error(
                        'The given id does not exist in the database'
                    );
                }
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update transaction value. \nError: ${error}`
            );
        }
    }

    async updateTransactionOrigin(id: number, origin: string): Promise<void> {
        try {
            this.transactions.find((transaction) => {
                if (transaction.id === id) {
                    transaction.origin = origin;
                } else {
                    throw new Error(
                        'The given id does not exist in the database'
                    );
                }
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update transaction origin. \nError: ${error}`
            );
        }
    }

    async updateTransactionDestiny(id: number, destiny: string): Promise<void> {
        try {
            this.transactions.find((transaction) => {
                if (transaction.id === id) {
                    transaction.destiny = destiny;
                } else {
                    throw new Error(
                        'The given id does not exist in the database'
                    );
                }
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update transaction destiny. \nError: ${error}`
            );
        }
    }

    async updateTransactionEmissionDate(id: number, date: Date): Promise<void> {
        try {
            this.transactions.find((transaction) => {
                if (transaction.id === id) {
                    transaction.emission_date = date;
                } else {
                    throw new Error(
                        'The given id does not exist in the database'
                    );
                }
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update transaction emission date. \nError: ${error}`
            );
        }
    }

    async updateTransactionDescription(
        id: number,
        description: string
    ): Promise<void> {
        try {
            this.transactions.find((transaction) => {
                if (transaction.id === id) {
                    transaction.description = description;
                } else {
                    throw new Error(
                        'The given id does not exist in the database'
                    );
                }
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update transaction description. \nError: ${error}`
            );
        }
    }
}

export default TransactionRepositoryMemory;
