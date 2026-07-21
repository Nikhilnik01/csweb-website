// src/api/blogApi.js
import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "./constants";

/**
 * Fetch all blogs
 */
export const fetchAllBlogs = async () => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.GET_BLOGS, {
      id: null,
    });

    if (response.data.rs === 1) {
      return response.data.res.lists || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

/**
 * Fetch single blog by ID
 */
export const fetchBlogById = async (id) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.GET_BLOGS, {
      id: parseInt(id),
    });

    if (response.data.rs === 1) {
      const blogs = response.data.res.lists || [];
      return blogs.length > 0 ? blogs[0] : null;
    }
    return null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
};
