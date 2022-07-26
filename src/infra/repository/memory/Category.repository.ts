import Category from 'core/entity/Category.entity';
import CategoryRepository from 'core/repository/Category.repository';

class CategoryRepositoryMemory implements CategoryRepository {
    categories: Category[] = [
        {
            id: 1,
            name: 'home expenses',
            planned_value: 4000,
            real_value: 6200,
            difference_value: 6200 - 4000,
            type: 'Renda',
            created_at: new Date(),
            updated_at: new Date(),
        },
    ];

    async createCategory(category: Category): Promise<Category> {
        const newCategory = this.incrementIdToCategories(category);
        try {
            this.categories = [...this.categories, newCategory];
            return Promise.resolve(newCategory);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to create a category. \nError: ${error}`
            );
        }
    }

    private incrementIdToCategories(category: Category): Category {
        const lastIndexOfCategoryList: number = this.categories.length - 1;
        const newCategory = {
            ...category,
            id: this.categories[lastIndexOfCategoryList].id + 1,
        };
        return newCategory;
    }

    async getCategoryById(id: number): Promise<Category> {
        let category: Category | undefined;
        try {
            category = this.categories.find((category) => category.id === id);
            this.hasCategory(category);
            return Promise.resolve(category as Category);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to find a category. \nError: ${error}`
            );
        }
    }

    private hasCategory(category: Category | undefined) {
        if (category == null)
            throw new Error('The given id does not exist in the database');
    }

    async getAllCategories(): Promise<Category[]> {
        try {
            return Promise.resolve(this.categories);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get all categories. \nError: ${error}`
            );
        }
    }
}

export default CategoryRepositoryMemory;
