import { CATEGORY_TYPE } from './enums';

interface Category {
    id: number;
    name: string;
    planned_value: number;
    real_value: number;
    difference_value: number;
    created_at: Date;
    updated_at: Date;
    type: CATEGORY_TYPE;
}

export default Category;
