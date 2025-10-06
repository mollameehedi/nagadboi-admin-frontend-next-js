const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


const buildQueryString = (params) => {
  if (!params || Object.keys(params).length === 0) {
    return '';
  }
  const queryString = new URLSearchParams(params).toString();
  return `?${queryString}`;
};


/**
 * Handles the HTTP response, throwing an error for non-ok responses.
 * @param {Response} response The fetch API response object.
 * @returns {Promise<any>} The JSON data from the response.
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = `HTTP error! Status: ${response.status}. Message: ${errorData.message || 'Unknown error'}`;
    throw new Error(errorMessage);
  }
  return response.json();
};

/**
 * Fetches a list of all items from a given endpoint.
 * @param {string} endpoint The API endpoint to read from (e.g., 'users', 'products').
 * @returns {Promise<any[]>} A promise that resolves with an array of items.
 */
export const readItems = async (endpoint,params) => {
  try {
     const url = `${BASE_URL}/${endpoint}${buildQueryString(params)}`;
    const response = await fetch(url);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error reading items from ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Creates a new item by sending a POST request.
 * @param {string} endpoint The API endpoint to create an item in (e.g., 'users', 'products').
 * @param {object} data The data object for the new item.
 * @returns {Promise<any>} A promise that resolves with the newly created item.
 */
export const createItem = async (endpoint, data) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error creating item in ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Updates an existing item by sending a PUT request.
 * @param {string} endpoint The API endpoint for the item (e.g., 'users', 'products').
 * @param {string | number} id The ID of the item to update.
 * @param {object} data The updated data object.
 * @returns {Promise<any>} A promise that resolves with the updated item.
 */
export const updateItem = async (endpoint, id, data) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error updating item ${id} in ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Deletes an item by sending a DELETE request.
 * @param {string} endpoint The API endpoint for the item (e.g., 'users', 'products').
 * @param {string | number} id The ID of the item to delete.
 * @returns {Promise<any>} A promise that resolves with the confirmation of deletion.
 */
export const deleteItem = async (endpoint, id) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
      method: 'DELETE',
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error deleting item ${id} from ${endpoint}:`, error);
    throw error;
  }
};
