import { readItems, createItem, updateItem, deleteItem } from './http';

const User_ENDPOINT = 'users';

/**
 * Fetches all Users.
 * @returns {Promise<any[]>} A promise that resolves with an array of User items.
 */
export const getUsers = async (params = {}) => {
  return readItems(User_ENDPOINT, params);
};


/**
 * Creates a new User.
 * @param {object} data The data for the new User (e.g., { name: 'New User' }).
 * @returns {Promise<any>} A promise that resolves with the newly created User.
 */
export const createUser = async (data) => {
  return createItem(User_ENDPOINT, data);
};

/**
 * Updates an existing User.
 * @param {string | number} id The ID of the User to update.
 * @param {object} data The updated data.
 * @returns {Promise<any>} A promise that resolves with the updated User.
 */
export const updateUser = async (id, data) => {
  return updateItem(User_ENDPOINT, id, data);
};

/**
 * Deletes a User.
 * @param {string | number} id The ID of the User to delete.
 * @returns {Promise<any>} A promise that resolves upon successful deletion.
 */
export const deleteUser = async (id) => {
  return deleteItem(User_ENDPOINT, id);
};
