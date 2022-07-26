import Category from 'core/entity/Category.entity';

interface CategoryRepository {
    createCategory(category: Category): Promise<Category>;
    getCategoryById(id: number): Promise<Category>;
    getAllCategories(): Promise<Category[]>;
}

export default CategoryRepository;
