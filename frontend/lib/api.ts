// API client with automatic authentication handling
export const apiClient = {
  async fetch(url: string, options: RequestInit = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    // Add Authorization header if token exists
    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: defaultHeaders,
      credentials: 'include', // Always include cookies
    };

    console.log('Making API request to:', url, 'with config:', config);

    const response = await fetch(url, config);
    
    // If unauthorized, clear token and redirect to login
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
    }

    return response;
  },

  // Helper methods for common HTTP verbs
  get: (url: string, options?: RequestInit) => apiClient.fetch(url, { ...options, method: 'GET' }),
  post: (url: string, data?: unknown, options?: RequestInit) => apiClient.fetch(url, { ...options, method: 'POST', body: JSON.stringify(data) }),
  put: (url: string, data?: unknown, options?: RequestInit) => apiClient.fetch(url, { ...options, method: 'PUT', body: JSON.stringify(data) }),
  delete: (url: string, options?: RequestInit) => apiClient.fetch(url, { ...options, method: 'DELETE' }),
};

export default apiClient;
