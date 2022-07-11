import Transaction from '../../core/entity/Transaction.entity';
import TransactionRepositoryMemory from '../../infra/repository/memory/Transaction.repository';
import TransactionUsecase from './Transaction.usecase';

test('Should make a transaction', async function () {
    const transactionRepositoryMemory = new TransactionRepositoryMemory();
    const transactionUsecase = new TransactionUsecase(
        transactionRepositoryMemory
    );

    const transactionData: Transaction = {
        value: 13000,
        description: 'New transaction test',
        origin: 'Pseudo Wallet',
        destiny: 'Pseudo Person',
        emission_date: new Date(),
    } as Transaction;

    const transactionListBeforeNewTransaction: Transaction[] =
        await transactionUsecase.getAllTransactions();

    const newTransaction: Transaction =
        await transactionUsecase.annotateTransaction(transactionData);

    const transactionListAfterNewTransaction: Transaction[] =
        await transactionUsecase.getAllTransactions();

    expect(transactionListAfterNewTransaction.length).toEqual(
        transactionListBeforeNewTransaction.length + 1
    );

    const lastIndexOfTransactionList: number =
        transactionListBeforeNewTransaction.length - 1;
    expect(newTransaction.id).toBe(
        transactionListBeforeNewTransaction[lastIndexOfTransactionList].id + 1
    );
});

test('Should get an transaction with specified id', async function () {
    const transactionRepositoryMemory = new TransactionRepositoryMemory();
    const transactionUsecase = new TransactionUsecase(
        transactionRepositoryMemory
    );

    const mockedTransaction: Transaction = {
        value: 13562,
        description: 'Mocked Transaction!',
        origin: 'Mocked Wallet',
        destiny: 'Mocked User',
        emission_date: new Date(),
    } as Transaction;

    await transactionUsecase.annotateTransaction(mockedTransaction);

    const existentId = 2;
    const existentTransaction: Transaction =
        await transactionUsecase.getTransactionById(existentId);
    expect(existentTransaction).toEqual({ ...mockedTransaction, id: 2 });
});

test('Should throw an error if pass nonexistent id', async function () {
    const transactionRepositoryMemory = new TransactionRepositoryMemory();
    const transactionUsecase = new TransactionUsecase(
        transactionRepositoryMemory
    );

    const nonexistentTransaction = async (
        nonexistentId: number
    ): Promise<Transaction> => {
        return await transactionUsecase.getTransactionById(nonexistentId);
    };
    await expect(nonexistentTransaction(5)).rejects.toThrowError();
});
