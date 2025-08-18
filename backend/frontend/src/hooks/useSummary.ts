import { useEffect, useState } from 'react';
import axios from 'axios';
import { format, isSameMonth, isValid } from 'date-fns';
import { API_URL } from '../config/api';

type Sale = {
  id: string;
  clientName: string;
  total: number;
  createdAt: string;
};

type Product = { id: string };

export function useSummary() {
  const [summary, setSummary] = useState({
    totalToday: 0,
    totalMonth: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const [salesRes, productsRes] = await Promise.all([
          axios.get<Sale[]>(`${API_URL}/sales`),
          axios.get<Product[]>(`${API_URL}/products`)
        ]);

        const sales = salesRes.data.filter(s => isValid(new Date(s.createdAt)));
        const today = new Date();
        const todayKey = format(today, 'yyyy-MM-dd');

        const totalToday = sales
          .filter(s => format(new Date(s.createdAt), 'yyyy-MM-dd') === todayKey)
          .reduce((acc, s) => acc + s.total, 0);

        const totalMonth = sales
          .filter(s => isSameMonth(new Date(s.createdAt), today))
          .reduce((acc, s) => acc + s.total, 0);

        setSummary({
          totalToday,
          totalMonth,
          totalProducts: productsRes.data.length,
        });
      } catch (err) {
        console.error('Erro ao carregar resumo:', err);
      }
    })();
  }, []);

  return summary;
}
