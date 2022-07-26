import Category from 'core/entity/Category.entity';
import CategoryRepository from 'core/repository/Category.repository';
import prisma from '../../database/prisma/prismaClient';

class CategoryRepositorySQL implements CategoryRepository {
    category = prisma.category;

    async createCategory(category: Category): Promise<Category> {
        try {
            return await this.category.create({ data: category });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to create a category. \nError: ${error}`
            );
        }
    }

    async getCategoryById(id: number): Promise<Category> {
        let category: Category | null;
        try {
            category = await this.category.findFirst({
                where: {
                    id: id,
                },
            });
            this.hasTransaction(category);
            return category as Category;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to find a category. \nError: ${error}`
            );
        }
    }

    private hasTransaction(category: Category | null) {
        if (category == null)
            throw new Error('The given id does not exist in the database');
    }

    async getAllCategories(): Promise<Category[]> {
        try {
            return this.category.findMany({});
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get all categories. \nError: ${error}`
            );
        }
    }
}

export default CategoryRepositorySQL;
