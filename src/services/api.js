export const fetchPortfolioData = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return null;
  }
};
