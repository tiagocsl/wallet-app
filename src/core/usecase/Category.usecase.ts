import Category from 'core/entity/Category.entity';
import { CATEGORY_TYPE } from 'core/entity/enums';
import categoryRepository from 'core/repository/Category.repository';
import * as utils from './_utils';

class CategoryUsecase {
    categoryRepository: categoryRepository;

    constructor(categoryRepository: categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async createCategory(category: Category): Promise<Category> {
        try {
            const newCategory: Category =
                await this.categoryRepository.createCategory(category);
            return newCategory;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to create a category. \nError: ${error}`
            );
        }
    }

    async getCategoryById(id: number): Promise<Category> {
        try {
            const category: Category =
                await this.categoryRepository.getCategoryById(id);
            utils.hasFindResult(category.id);
            return category;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get category. \nError: ${error}`
            );
        }
    }

    async getAllCategories(): Promise<Category[]> {
        try {
            const categoryList: Category[] =
                await this.categoryRepository.getAllCategories();
            return categoryList;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get all categories. \nError: ${error}`
            );
        }
    }

    async deleteCategory(id: number): Promise<void> {
        try {
            await this.categoryRepository.deleteCategory(id);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to delete an category. \nError: ${error}`
            );
        }
    }

    async deleteManyCategories(ids: number[]): Promise<void> {
        try {
            await this.categoryRepository.deleteManyCategories(ids);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to delete categories. \nError: ${error}`
            );
        }
    }

    async updateCategory(categoryData: Category): Promise<void> {
        try {
            await this.categoryRepository.updateCategory(categoryData);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update category. \nError: ${error}`
            );
        }
    }

    async updateCategoryName(id: number, name: string): Promise<void> {
        try {
            await this.categoryRepository.updateCategoryName(id, name);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update an category name. \nError: ${error}`
            );
        }
    }

    async updateCategoryPlannedValue(
        id: number,
        planned_value: number
    ): Promise<void> {
        try {
            await this.categoryRepository.updateCategoryPlannedValue(
                id,
                planned_value
            );
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update an category planned_value. \nError: ${error}`
            );
        }
    }

    async updateCategoryRealValue(
        id: number,
        real_value: number
    ): Promise<void> {
        try {
            await this.categoryRepository.updateCategoryRealValue(
                id,
                real_value
            );
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update an category real_value. \nError: ${error}`
            );
        }
    }

    async updateCategoryDifferenceValue(
        id: number,
        difference_value: number
    ): Promise<void> {
        try {
            await this.categoryRepository.updateCategoryDifferenceValue(
                id,
                difference_value
            );
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update an category difference_value. \nError: ${error}`
            );
        }
    }

    async updateCategoryType(id: number, type: CATEGORY_TYPE): Promise<void> {
        try {
            await this.categoryRepository.updateCategoryType(id, type);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update an category type. \nError: ${error}`
            );
        }
    }
}

export default CategoryUsecase;
