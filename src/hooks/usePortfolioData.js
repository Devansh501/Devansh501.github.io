import { useState, useEffect } from 'react';
import { fetchPortfolioData } from '../services/api';

export const usePortfolioData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchPortfolioData();
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
