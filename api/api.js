/**
 * Base URL for API requests.
 */
const API_KEY = '4VezeIapA1'
const BASE_URL = 'https://comp2140.uqcloud.net/api/';

/**
 * Fetches all posts from the API.
 * @returns {Promise} - Promise resolving to an array of all posts.
 */
export const getAllSongs = async () => {
  const url = `${BASE_URL}sample/?api_key=${API_KEY}`;
  const response = await fetch(url);
  return response.json();
};

/**
 * Fetches a single post by ID.
 * @param {string} id - The ID of the post.
 * @returns {Promise} - Promise resolving to the post object.
 */
export const getSongById = async (id) => {
  const url = `${BASE_URL}sample/${id}/?api_key=${API_KEY}`;
  const response = await fetch(url);
  return response.json();
};

/**
 * Creates a new post.
 * @param {object} post - The post object containing title and body.
 * @returns {Promise} - Promise resolving to the created post object.
 */
export const createSong = async (post) => {
    const url = `${BASE_URL}sample/?api_key=${API_KEY}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept' : 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  return response.json();
};

/**
 * Updates an existing post by ID.
 * @param {string} id - The ID of the post to update.
 * @param {object} post - The updated post object.
 * @returns {Promise} - Promise resolving to the updated post object.
 */
export const updateSong = async (id, post) => {
    const url = `${BASE_URL}sample/${id}/?api_key=${API_KEY}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
        'Accept' : 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  return response.json();
};

/**
 * Creates a new post.
 * @param {object} post - The post object containing title and body.
 * @returns {Promise} - Promise resolving to the created post object.
 */
export const createRating = async (post) => {
    const url = `${BASE_URL}samplerating/?api_key=${API_KEY}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept' : 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  return response.json();
};

/**
 * Updates an existing post by ID.
 * @param {string} id - The ID of the post to update.
 * @param {object} post - The updated post object.
 * @returns {Promise} - Promise resolving to the updated post object.
 */
export const updateRating = async (id, post) => {
    const url = `${BASE_URL}samplerating/${id}/?api_key=${API_KEY}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
        'Accept' : 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  return response.json();
};

/**
 * Fetches the rating for a given song ID.
 * 
 * @param {string} song_ID - The ID of the song.
 * @returns {Promise<Object>} The JSON response containing the rating.
 */
export const getRatingBySongID = async (song_ID) => {
    const url = `${BASE_URL}samplerating/?api_key=${API_KEY}&sample_id=${song_ID}`;
    const response = await fetch(url);
    return response.json();
  };

/**
 * Fetches all locations.
 * 
 * @returns {Promise<Array<Object>>} The JSON response containing a list of all locations.
 */
export const getAllLocations = async () => {
    const url = `${BASE_URL}location/?api_key=${API_KEY}`;
    const response = await fetch(url);
    return response.json();
  };

/**
 * Fetches the details of a location by its ID.
 * 
 * @param {string} location_id - The ID of the location.
 * @returns {Promise<Object>} The JSON response containing the location details.
 */
export const getLocationByID = async (location_id) => {
    const url = `${BASE_URL}location/${location_id}/?api_key=${API_KEY}`;
  const response = await fetch(url);
  return response.json();
}

/**
 * Fetches the songs associated with a given location ID.
 * 
 * @param {string} location_id - The ID of the location.
 * @returns {Promise<Array<Object>>} The JSON response containing a list of songs for the location.
 */
export const getSongsByLocationID = async (location_id) => {
    const url = `${BASE_URL}sampletolocation/?api_key=${API_KEY}&location_id=${location_id}`;
    const response = await fetch(url);
    return response.json();
};

  /**
 * Finds an object mapping a sample to a location by location_id and sample_id.
 * @param {number} locationId - The location_id to search for.
 * @param {number} sampleId - The sample_id to search for.
 * @returns {Promise} - Promise resolving to the found object or null.
 */
export const findSampleToLocation = async (locationId, sampleId) => {
    const url = `${BASE_URL}sampletolocation/?api_key=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
  
    const found = data.find(
      item => {
        return Number(item.location_id) === Number(locationId) && Number(item.sample_id) === Number(sampleId);
      }
    );
 
    return found ? found.id : null;
  };

  /**
 * Deletes an object mapping a sample to a location by location_id and sample_id.
 * @param {number} locationId - The location_id of the object.
 * @param {number} sampleId - The sample_id of the object.
 * @returns {Promise} - Promise resolving to a boolean indicating success or failure.
 */
export const deleteSampleToLocation = async (locationId, sampleId) => {
    const id = await findSampleToLocation(locationId, sampleId);
    
    if (id === null) {
      console.log("False");
      return false;
    }
    
    const url = `${BASE_URL}sampletolocation/${id}/?api_key=${API_KEY}`;
    
    const response = await fetch(url, {
      method: 'DELETE'
    });
    
    
  };

  /**
 * Creates a new mapping between a sample and a location.
 * @param {number} locationId - The ID of the location.
 * @param {number} sampleId - The ID of the sample.
 * @returns {Promise} - Promise resolving to the created object.
 */
export const createSampleToLocation = async (locationId, sampleId) => {
    const url = `${BASE_URL}sampletolocation/?api_key=${API_KEY}`;
    
    const newObject = {
      location_id: locationId,
      sample_id: sampleId,
    };
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newObject),
    });
    
    return response.json();
  };
  