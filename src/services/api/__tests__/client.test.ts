import { vi, beforeEach } from 'vitest';
import { apiGet } from '../client';
import { API_CONFIG } from '../api.config';

describe('apiGet', () => {
  const mockEndpoint = '/test-endpoint';
  const expectedUrl = `${API_CONFIG.baseUrl}${mockEndpoint}`;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully fetch and return data', async () => {
    const mockData = { test: 'data', value: 123 };
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    };

    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await apiGet(mockEndpoint);

    expect(globalThis.fetch).toHaveBeenCalledWith(expectedUrl);
    expect(mockResponse.json).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  it('should return typed data correctly', async () => {
    interface TestData {
      name: string;
      count: number;
    }

    const mockData: TestData = { name: 'test', count: 42 };
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    };

    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await apiGet<TestData>(mockEndpoint);

    expect(result).toEqual(mockData);
    expect(result.name).toBe('test');
    expect(result.count).toBe(42);
  });

  it('should throw error when response is not ok', async () => {
    const mockResponse = {
      ok: false,
      statusText: 'Not Found',
    };

    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

    await expect(apiGet(mockEndpoint)).rejects.toThrow('API request failed: Not Found');
    expect(globalThis.fetch).toHaveBeenCalledWith(expectedUrl);
  });

  it('should throw error when response has server error status', async () => {
    const mockResponse = {
      ok: false,
      statusText: 'Internal Server Error',
    };

    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

    await expect(apiGet(mockEndpoint)).rejects.toThrow('API request failed: Internal Server Error');
  });

  it('should throw error when fetch fails', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    await expect(apiGet(mockEndpoint)).rejects.toThrow('Network error');
    expect(globalThis.fetch).toHaveBeenCalledWith(expectedUrl);
  });

  it('should throw error when JSON parsing fails', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
    };

    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

    await expect(apiGet(mockEndpoint)).rejects.toThrow('Invalid JSON');
  });

  it('should handle non-Error objects in catch block', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue('String error');

    await expect(apiGet(mockEndpoint)).rejects.toThrow('Unknown error');
  });
});
