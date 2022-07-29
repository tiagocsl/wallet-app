import Category from 'core/entity/Category.entity';
import { CATEGORY_TYPE } from 'core/entity/enums';

interface CategoryRepository {
    createCategory(category: Category): Promise<Category>;
    getCategoryById(id: number): Promise<Category>;
    getAllCategories(): Promise<Category[]>;
    deleteCategory(id: number): Promise<void>;
    deleteManyCategories(ids: number[]): Promise<void>;
    updateCategory(category: Category): Promise<void>;
    updateCategoryName(id: number, name: string): Promise<void>;
    updateCategoryPlannedValue(id: number, planned_value: number): Promise<void>;
    updateCategoryRealValue(id: number, real_value: number): Promise<void>;
    updateCategoryDifferenceValue(id: number, difference_value: number): Promise<void>;
    updateCategoryType(id: number, type: CATEGORY_TYPE): Promise<void>;
}

export default CategoryRepository;
