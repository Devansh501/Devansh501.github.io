import { useState, useEffect } from 'react';
import { fetchPortfolioData } from '../services/api';

// Create a global cache to store data
let cachedData = null;

export const usePortfolioData = () => {
  const [data, setData] = useState(cachedData);
  const [loading, setLoading] = useState(!cachedData);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If we have cached data, don't fetch again
    if (cachedData) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const result = await fetchPortfolioData();
        cachedData = result || {}; // Update the cache
        setData(result || {});
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return { data, loading, error };
};
