export const fetchPortfolioData = async () => {
  try {
    const isDev = import.meta.env.MODE === 'development';
    const url = isDev 
      ? `/data.json?t=${Date.now()}` 
      : (import.meta.env.VITE_API_URL || '/data.json');
      
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return null;
  }
};
