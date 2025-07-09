import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import type { Collector } from '../types';

interface CollectorsState {
  collectors: Collector[];
  loading: boolean;
  error: string | null;
  selectedCollector: string | null;
  filters: {
    status: string[];
    zone: string[];
    performance: [number, number];
  };
  
  // Actions
  fetchCollectors: () => Promise<void>;
  addCollector: (collector: Partial<Collector>) => Promise<void>;
  updateCollector: (id: string, data: Partial<Collector>) => Promise<void>;
  deleteCollector: (id: string) => Promise<void>;
  setSelectedCollector: (id: string | null) => void;
  setFilters: (filters: Partial<CollectorsState['filters']>) => void;
  getCollectorPerformance: (id: string) => Promise<any>;
  getCollectorTransactions: (id: string) => Promise<any>;
  getCollectorStats: (id: string) => Promise<any>;
}

export const useCollectorsStore = create<CollectorsState>()(
  persist(
    (set, get) => ({
      collectors: [],
      loading: false,
      error: null,
      selectedCollector: null,
      filters: {
        status: [],
        zone: [],
        performance: [0, 100],
      },

      fetchCollectors: async () => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from('collectors')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) throw error;

          set({ collectors: data as Collector[] });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ loading: false });
        }
      },

      addCollector: async (collector) => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from('collectors')
            .insert([collector])
            .select()
            .single();

          if (error) throw error;

          set((state) => ({
            collectors: [...state.collectors, data as Collector],
          }));
        } catch (error) {
          set({ error: (error as Error).message });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      updateCollector: async (id, data) => {
        set({ loading: true, error: null });
        try {
          const { data: updatedCollector, error } = await supabase
            .from('collectors')
            .update(data)
            .eq('id', id)
            .select()
            .single();

          if (error) throw error;

          set((state) => ({
            collectors: state.collectors.map((c) =>
              c.id === id ? (updatedCollector as Collector) : c
            ),
          }));
        } catch (error) {
          set({ error: (error as Error).message });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      deleteCollector: async (id) => {
        set({ loading: true, error: null });
        try {
          const { error } = await supabase
            .from('collectors')
            .delete()
            .eq('id', id);

          if (error) throw error;

          set((state) => ({
            collectors: state.collectors.filter((c) => c.id !== id),
          }));
        } catch (error) {
          set({ error: (error as Error).message });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      setSelectedCollector: (id) => {
        set({ selectedCollector: id });
      },

      setFilters: (filters) => {
        set((state) => ({
          filters: {
            ...state.filters,
            ...filters,
          },
        }));
      },

      getCollectorPerformance: async (id) => {
        try {
          const { data, error } = await supabase
            .from('collector_performance')
            .select('*')
            .eq('collector_id', id)
            .order('date', { ascending: true });

          if (error) throw error;
          return data;
        } catch (error) {
          console.error('Error fetching collector performance:', error);
          throw error;
        }
      },

      getCollectorTransactions: async (id) => {
        try {
          const { data, error } = await supabase
            .from('transactions')
            .select('*')
            .eq('collector_id', id)
            .order('created_at', { ascending: false });

          if (error) throw error;
          return data;
        } catch (error) {
          console.error('Error fetching collector transactions:', error);
          throw error;
        }
      },

      getCollectorStats: async (id) => {
        try {
          const { data, error } = await supabase
            .rpc('get_collector_stats', { collector_id: id });

          if (error) throw error;
          return data;
        } catch (error) {
          console.error('Error fetching collector stats:', error);
          throw error;
        }
      },
    }),
    {
      name: 'collectors-storage',
      partialize: (state) => ({
        filters: state.filters,
        selectedCollector: state.selectedCollector,
      }),
    }
  )
);

// Hooks personnalisés pour les fonctionnalités spécifiques
export const useCollectorDetails = (id: string) => {
  const store = useCollectorsStore();
  const collector = store.collectors.find((c) => c.id === id);

  const fetchDetails = async () => {
    if (!collector) return;

    try {
      const [performance, transactions, stats] = await Promise.all([
        store.getCollectorPerformance(id),
        store.getCollectorTransactions(id),
        store.getCollectorStats(id),
      ]);

      return {
        collector,
        performance,
        transactions,
        stats,
      };
    } catch (error) {
      console.error('Error fetching collector details:', error);
      throw error;
    }
  };

  return {
    collector,
    fetchDetails,
    loading: store.loading,
    error: store.error,
  };
};

export const useCollectorAnalytics = () => {
  const collectors = useCollectorsStore((state) => state.collectors);

  const getPerformanceStats = () => {
    const total = collectors.length;
    const active = collectors.filter((c) => c.status === 'active').length;
    const averagePerformance =
      collectors.reduce((sum, c) => sum + c.performance, 0) / total;

    return {
      total,
      active,
      inactive: total - active,
      averagePerformance,
      topPerformers: collectors
        .sort((a, b) => b.performance - a.performance)
        .slice(0, 5),
      lowPerformers: collectors
        .sort((a, b) => a.performance - b.performance)
        .slice(0, 5),
    };
  };

  const getZoneStats = () => {
    const zoneMap = new Map<string, { total: number; active: number; amount: number }>();

    collectors.forEach((collector) => {
      const zoneStats = zoneMap.get(collector.zone) || {
        total: 0,
        active: 0,
        amount: 0,
      };

      zoneStats.total += 1;
      if (collector.status === 'active') zoneStats.active += 1;
      zoneStats.amount += collector.totalAmount;

      zoneMap.set(collector.zone, zoneStats);
    });

    return Array.from(zoneMap.entries()).map(([zone, stats]) => ({
      zone,
      ...stats,
      activeRate: (stats.active / stats.total) * 100,
    }));
  };

  return {
    getPerformanceStats,
    getZoneStats,
  };
};