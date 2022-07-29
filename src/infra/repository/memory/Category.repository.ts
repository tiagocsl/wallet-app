import Category from 'core/entity/Category.entity';
import { CATEGORY_TYPE } from 'core/entity/enums';
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

    async deleteCategory(id: number): Promise<void> {
        try {
            const categoryIndex = this.categories.findIndex(
                (category) => category.id === id
            );
            this.categories.splice(categoryIndex, 1);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to delete category. \nError: ${error}`
            );
        }
    }

    async deleteManyCategories(ids: number[]): Promise<void> {
        try {
            ids.forEach((id) => {
                const categoryIndex = this.categories.findIndex(
                    (category) => category.id === id
                );
                this.categories.splice(categoryIndex, 1);
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to delete many categories. \nError: ${error}`
            );
        }
    }

    async updateCategory(categoryData: Category): Promise<void> {
        try {
            this.categories.find((category) => {
                if (category.id === categoryData.id) {
                    category.name = categoryData.name
                        ? categoryData.name
                        : category.name;

                    category.planned_value = categoryData.planned_value
                        ? categoryData.planned_value
                        : category.planned_value;

                    category.real_value = categoryData.real_value
                        ? categoryData.real_value
                        : category.real_value;

                    category.difference_value = categoryData.difference_value
                        ? categoryData.difference_value
                        : category.difference_value;

                    category.type = categoryData.type
                        ? categoryData.type
                        : category.type;
                } else {
                    throw new Error(
                        'The given id does not exist in the database'
                    );
                }
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update category. \nError: ${error}`
            );
        }
    }

    async updateCategoryName(id: number, name: string): Promise<void> {
        try {
            this.categories.find((category) => {
                if (category.id === id) {
                    category.name = name;
                } else {
                    throw new Error(
                        'The given id does not exist in the database'
                    );
                }
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
            this.categories.find((category) => {
                if (category.id === id) {
                    category.planned_value = planned_value;
                } else {
                    throw new Error(
                        'The given id does not exist in the database'
                    );
                }
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
            this.categories.find((category) => {
                if (category.id === id) {
                    category.real_value = real_value;
                } else {
                    throw new Error(
                        'The given id does not exist in the database'
                    );
                }
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
            this.categories.find((category) => {
                if (category.id === id) {
                    category.difference_value = difference_value;
                } else {
                    throw new Error(
                        'The given id does not exist in the database'
                    );
                }
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update category emission difference_value. \nError: ${error}`
            );
        }
    }

    async updateCategoryType(id: number, type: CATEGORY_TYPE): Promise<void> {
        try {
            this.categories.find((category) => {
                if (category.id === id) {
                    category.type = type;
                } else {
                    throw new Error(
                        'The given id does not exist in the database'
                    );
                }
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update category type. \nError: ${error}`
            );
        }
    }
}

export default CategoryRepositoryMemory;
