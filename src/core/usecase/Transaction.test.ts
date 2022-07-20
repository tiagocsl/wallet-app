import Transaction from '../../core/entity/Transaction.entity';
import TransactionRepositoryMemory from '../../infra/repository/memory/Transaction.repository';
import TransactionUsecase from './Transaction.usecase';

test('Should annotate a transaction', async function () {
    const transactionRepositoryMemory = new TransactionRepositoryMemory();
    const transactionUsecase = new TransactionUsecase(
        transactionRepositoryMemory
    );

    const transactionData: Transaction = {
        value: 13000,
        description: 'New transaction test',
        origin: 'Ghost Wallet',
        destiny: 'Ghost Person',
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

test('Should delete an transaction with specified id', async function () {
    const transactionRepositoryMemory = new TransactionRepositoryMemory();
    const transactionUsecase = new TransactionUsecase(
        transactionRepositoryMemory
    );

    const mockedTransactionId = 1;
    await transactionUsecase.deleteTransaction(mockedTransactionId);

    const transactionListAfterDeleteTransaction: Transaction[] =
        await transactionUsecase.getAllTransactions();
    expect(transactionListAfterDeleteTransaction.length).toEqual(0);
});

test('Should delete many transactions with specified ids', async function () {
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

    const mockedTransactionsIds = [1, 2];
    await transactionUsecase.deleteManyTransactions(mockedTransactionsIds);

    const transactionListAfterDeleteTransaction: Transaction[] =
        await transactionUsecase.getAllTransactions();
    expect(transactionListAfterDeleteTransaction.length).toEqual(0);
});

test('Should update an transaction', async function () {
    const transactionRepositoryMemory = new TransactionRepositoryMemory();
    const transactionUsecase = new TransactionUsecase(
        transactionRepositoryMemory
    );

    const transactionData: Transaction = {
        id: 1,
        value: 76000,
        description: 'Updated transaction!',
        origin: 'From test',
        destiny: 'To array',
        emission_date: new Date(),
    } as Transaction;

    const originalTransactionOrigin = 'From code';
    const transactionListBeforeUpdateTransaction: Transaction[] =
        await transactionUsecase.getAllTransactions();
    expect(transactionListBeforeUpdateTransaction[0].origin).toBe(
        originalTransactionOrigin
    );

    await transactionUsecase.updateTransaction(transactionData);

    const transactionListAfterUpdateTransaction: Transaction[] =
        await transactionUsecase.getAllTransactions();
    expect(transactionListAfterUpdateTransaction[0]).toStrictEqual(
        transactionData
    );
});

test('Should update value of one transaction with specified id', async function () {
    const transactionRepositoryMemory = new TransactionRepositoryMemory();
    const transactionUsecase = new TransactionUsecase(
        transactionRepositoryMemory
    );

    const transactionListBeforeUpdateTransaction: Transaction[] =
        await transactionUsecase.getAllTransactions();
    const originalTransactionValue = 25000;
    expect(transactionListBeforeUpdateTransaction[0].value).toBe(
        originalTransactionValue
    );

    const mockedTransactionId = 1;
    const newTransactionValue = 71460;
    await transactionUsecase.updateTransactionValue(
        mockedTransactionId,
        newTransactionValue
    );

    const transactionListAfterUpdateTransaction: Transaction[] =
        await transactionUsecase.getAllTransactions();
    expect(transactionListAfterUpdateTransaction[0].value).toBe(
        newTransactionValue
    );
});

test('Should update origin of one transaction with specified id', async function () {
    const transactionRepositoryMemory = new TransactionRepositoryMemory();
    const transactionUsecase = new TransactionUsecase(
        transactionRepositoryMemory
    );

    const transactionListBeforeUpdateTransaction: Transaction[] =
        await transactionUsecase.getAllTransactions();
    const originalTransactionOrigin = 'From code';
    expect(transactionListBeforeUpdateTransaction[0].origin).toBe(
        originalTransactionOrigin
    );

    const mockedTransactionId = 1;
    const newTransactionOrigin = 'From Test';
    await transactionUsecase.updateTransactionOrigin(
        mockedTransactionId,
        newTransactionOrigin
    );

    const transactionListAfterUpdateTransaction: Transaction[] =
        await transactionUsecase.getAllTransactions();
    expect(transactionListAfterUpdateTransaction[0].origin).toBe(
        newTransactionOrigin
    );
});

test('Should update destiny of one transaction with specified id', async function () {
    const transactionRepositoryMemory = new TransactionRepositoryMemory();
    const transactionUsecase = new TransactionUsecase(
        transactionRepositoryMemory
    );

    const transactionListBeforeUpdateTransaction: Transaction[] =
        await transactionUsecase.getAllTransactions();
    const originalTransactionDestiny = 'To array';
    expect(transactionListBeforeUpdateTransaction[0].destiny).toBe(
        originalTransactionDestiny
    );

    const mockedTransactionId = 1;
    const newTransactionDestiny = 'To Test Suite';
    await transactionUsecase.updateTransactionDestiny(
        mockedTransactionId,
        newTransactionDestiny
    );

    const transactionListAfterUpdateTransaction: Transaction[] =
        await transactionUsecase.getAllTransactions();
    expect(transactionListAfterUpdateTransaction[0].destiny).toBe(
        newTransactionDestiny
    );
});

test('Should update description of one transaction with specified id', async function () {
    const transactionRepositoryMemory = new TransactionRepositoryMemory();
    const transactionUsecase = new TransactionUsecase(
        transactionRepositoryMemory
    );

    const transactionListBeforeUpdateTransaction: Transaction[] =
        await transactionUsecase.getAllTransactions();
    const originalTransactionDescription = 'First transaction!';
    expect(transactionListBeforeUpdateTransaction[0].description).toBe(
        originalTransactionDescription
    );

    const mockedTransactionId = 1;
    const newTransactionDescription = 'Test Suite';
    await transactionUsecase.updateTransactionDescription(
        mockedTransactionId,
        newTransactionDescription
    );

    const transactionListAfterUpdateTransaction: Transaction[] =
        await transactionUsecase.getAllTransactions();
    expect(transactionListAfterUpdateTransaction[0].description).toBe(
        newTransactionDescription
    );
});

test('Should update emissionDate of one transaction with specified id', async function () {
    const transactionRepositoryMemory = new TransactionRepositoryMemory();
    const transactionUsecase = new TransactionUsecase(
        transactionRepositoryMemory
    );

    const transactionListBeforeUpdateTransaction: Transaction[] =
        await transactionUsecase.getAllTransactions();
    const originalTransactionEmissionDate = '2022-07-20T19:00:30';
    expect(
        transactionListBeforeUpdateTransaction[0].emission_date
    ).toStrictEqual(new Date(originalTransactionEmissionDate));

    const mockedTransactionId = 1;
    const emissionDateStringToParse = '2022-07-15T04:20:00';
    const newTransactionEmissionDate = new Date(emissionDateStringToParse);
    await transactionUsecase.updateTransactionEmissionDate(
        mockedTransactionId,
        newTransactionEmissionDate
    );

    const transactionListAfterUpdateTransaction: Transaction[] =
        await transactionUsecase.getAllTransactions();
    expect(
        transactionListAfterUpdateTransaction[0].emission_date
    ).toStrictEqual(newTransactionEmissionDate);
});
