import { readItems, createItem, updateItem, deleteItem } from './http';

const CONTACT_ENDPOINT = 'users';

/**
 * Fetches contacts with an optional set of parameters.
 * @param {object} [params={}] An object containing query parameters (e.g., { limit: 10, sort: 'name' }).
 * @returns {Promise<any[]>} A promise that resolves with an array of contact items.
 */
export const getContacts = async (params = {}) => {
  return readItems(CONTACT_ENDPOINT, params);
};

/**
 * Creates a new contact.
 * @param {object} data The data for the new contact.
 * @returns {Promise<any>} A promise that resolves with the newly created contact.
 */
export const createContact = async (data) => {
  return createItem(CONTACT_ENDPOINT, data);
};

/**
 * Updates an existing contact.
 * @param {string | number} id The ID of the contact to update.
 * @param {object} data The updated data.
 * @returns {Promise<any>} A promise that resolves with the updated contact.
 */
export const updateContact = async (id, data) => {
  return updateItem(CONTACT_ENDPOINT, id, data);
};

/**
 * Deletes a contact.
 * @param {string | number} id The ID of the contact to delete.
 * @returns {Promise<any>} A promise that resolves upon successful deletion.
 */
export const deleteContact = async (id) => {
  return deleteItem(CONTACT_ENDPOINT, id);
};
