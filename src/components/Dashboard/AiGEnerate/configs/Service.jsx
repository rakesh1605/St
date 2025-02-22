import axios from "axios";

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyDMCvmc68AbkZ7F_RwLQh1i0PMNlNacFf0";  // Replace with a valid API key

const getVideos = async (searchQuery) => {
  try {
    if (!searchQuery) {
      throw new Error("Search query is missing");
    }

    const encodedQuery = encodeURIComponent(searchQuery);
    const url = `${YOUTUBE_BASE_URL}/search?part=snippet&q=${encodedQuery}&maxResults=1&key=${API_KEY}`;
    
    const response = await axios.get(url);
    if (response.data.items.length === 0) {
      throw new Error("No video found for this query.");
    }

    return response.data.items;  
  } catch (error) {
    console.error("YouTube API Error:", error.response?.data || error.message);
    return [];
  }
};

export default {
  getVideos,
};
