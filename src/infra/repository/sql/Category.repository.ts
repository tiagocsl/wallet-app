import Category from 'core/entity/Category.entity';
import { CATEGORY_TYPE } from 'core/entity/enums';
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
            return category as Category;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to find a category. \nError: ${error}`
            );
        }
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

    async deleteCategory(id: number): Promise<void> {
        try {
            this.category.delete({
                where: {
                    id: id,
                },
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to delete category. \nError: ${error}`
            );
        }
    }

    async deleteManyCategories(ids: number[]): Promise<void> {
        try {
            this.category.deleteMany({
                where: {
                    id: {
                        in: ids,
                    },
                },
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to delete many categories. \nError: ${error}`
            );
        }
    }

    async updateCategory(category: Category): Promise<void> {
        try {
            this.category.update({
                data: category,
                where: { id: category.id },
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update category. \nError: ${error}`
            );
        }
    }

    async updateCategoryName(id: number, name: string): Promise<void> {
        try {
            this.category.update({
                data: { name },
                where: { id },
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update category name. \nError: ${error}`
            );
        }
    }

    async updateCategoryPlannedValue(
        id: number,
        planned_value: number
    ): Promise<void> {
        try {
            this.category.update({
                data: { planned_value },
                where: { id },
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update category planned_value. \nError: ${error}`
            );
        }
    }

    async updateCategoryRealValue(
        id: number,
        real_value: number
    ): Promise<void> {
        try {
            this.category.update({
                data: { real_value },
                where: { id },
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update category real_value. \nError: ${error}`
            );
        }
    }

    async updateCategoryDifferenceValue(
        id: number,
        difference_value: number
    ): Promise<void> {
        try {
            this.category.update({
                data: { difference_value },
                where: { id },
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update category difference_value. \nError: ${error}`
            );
        }
    }

    async updateCategoryType(id: number, type: CATEGORY_TYPE): Promise<void> {
        try {
            this.category.update({
                data: { type },
                where: { id },
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update category type. \nError: ${error}`
            );
        }
    }
}

export default CategoryRepositorySQL;
