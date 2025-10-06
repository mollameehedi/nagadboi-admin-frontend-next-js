import { readItems, createItem, updateItem, deleteItem } from './http';

const CATEGORY_ENDPOINT = 'products/categories';

/**
 * Fetches all categories.
 * @returns {Promise<any[]>} A promise that resolves with an array of category items.
 */
export const getCategories = async (params = {}) => {
  return readItems(CATEGORY_ENDPOINT, params);
};


/**
 * Creates a new category.
 * @param {object} data The data for the new category (e.g., { name: 'New Category' }).
 * @returns {Promise<any>} A promise that resolves with the newly created category.
 */
export const createCategory = async (data) => {
  return createItem(CATEGORY_ENDPOINT, data);
};

/**
 * Updates an existing category.
 * @param {string | number} id The ID of the category to update.
 * @param {object} data The updated data.
 * @returns {Promise<any>} A promise that resolves with the updated category.
 */
export const updateCategory = async (id, data) => {
  return updateItem(CATEGORY_ENDPOINT, id, data);
};

/**
 * Deletes a category.
 * @param {string | number} id The ID of the category to delete.
 * @returns {Promise<any>} A promise that resolves upon successful deletion.
 */
export const deleteCategory = async (id) => {
  return deleteItem(CATEGORY_ENDPOINT, id);
};
