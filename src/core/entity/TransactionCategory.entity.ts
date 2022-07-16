import { TRANSACTION_CATEGORY_TYPE } from './enums';

interface TransactionCategory {
    id: number;
    name: string;
    planned_value: number;
    real_value: number;
    difference_value: number;
    created_at: Date;
    updated_at: Date;
    type: TRANSACTION_CATEGORY_TYPE;
}

export default TransactionCategory;
