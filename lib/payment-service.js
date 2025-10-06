import { readItems, createItem, updateItem, deleteItem } from './http';

const PAYMENT_ENDPOINT = 'todos';

/**
 * Fetches payments with an optional set of parameters.
 * @param {object} [params={}] An object containing query parameters (e.g., { limit: 10, sort: 'date' }).
 * @returns {Promise<any[]>} A promise that resolves with an array of payment items.
 */
export const getPayments = async (params = {}) => {
  return readItems(PAYMENT_ENDPOINT, params);
};

/**
 * Creates a new payment.
 * @param {object} data The data for the new payment.
 * @returns {Promise<any>} A promise that resolves with the newly created payment.
 */
export const createPayment = async (data) => {
  return createItem(PAYMENT_ENDPOINT, data);
};

/**
 * Updates an existing payment.
 * @param {string | number} id The ID of the payment to update.
 * @param {object} data The updated data.
 * @returns {Promise<any>} A promise that resolves with the updated payment.
 */
export const updatePayment = async (id, data) => {
  return updateItem(PAYMENT_ENDPOINT, id, data);
};

/**
 * Deletes a payment.
 * @param {string | number} id The ID of the payment to delete.
 * @returns {Promise<any>} A promise that resolves upon successful deletion.
 */
export const deletePayment = async (id) => {
  return deleteItem(PAYMENT_ENDPOINT, id);
};
