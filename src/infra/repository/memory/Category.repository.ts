import Category from 'core/entity/Category.entity';
import CategoryRepository from 'core/repository/Category.repository';
import { hasFindResult } from './_utils';

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
        try {
            const lastIdOfCategories = this.categories[-1].id;
            const newCategory = { ...category, id: lastIdOfCategories + 1 };
            this.categories = [...this.categories, newCategory];
            return Promise.resolve(newCategory);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to create a category. \nError: ${error}`
            );
        }
    }

    async getCategoryById(id: number): Promise<Category> {
        let category: Category | undefined;
        try {
            category = this.categories.find((category) => category.id === id);
            hasFindResult(category?.id);
            return Promise.resolve(category as Category);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to find a category. \nError: ${error}`
            );
        }
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
