import { TRANSACTION_CATEGORY_TYPE } from './enums';
import Transaction from './Transaction.entity';

interface TransactionCategory {
    id: number;
    name: string;
    planned_value: number;
    real_value: number;
    difference_value: number;
    transactions: Transaction[];
    created_at: Date;
    updated_at: Date;
    type: TRANSACTION_CATEGORY_TYPE;
}

export default TransactionCategory;
