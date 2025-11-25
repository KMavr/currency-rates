import { API_CONFIG } from './api.config';

export const apiGet = async <T>(endpoint: string): Promise<T> => {
  try {
    const url = `${API_CONFIG.baseUrl}${endpoint}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(errorMessage);
  }
};
