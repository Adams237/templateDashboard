import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  User,
  Alert,
  Settings,
  FilterOptions,
  SortOptions,
  PaginationOptions
} from '../types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  alerts: Alert[];
  settings: Settings;
  filters: FilterOptions;
  sorting: SortOptions;
  pagination: PaginationOptions;
  sidebarCollapsed: boolean;
  currentView: string;
  selectedItems: string[];
  searchTerm: string;
  
  // Actions
  setUser: (user: User | null) => void;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  markAlertAsRead: (id: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  updateFilters: (filters: Partial<FilterOptions>) => void;
  updateSorting: (sorting: SortOptions) => void;
  updatePagination: (pagination: Partial<PaginationOptions>) => void;
  toggleSidebar: () => void;
  setCurrentView: (view: string) => void;
  setSelectedItems: (items: string[]) => void;
  setSearchTerm: (term: string) => void;
}

const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      alerts: [],
      settings: {
        notifications: {
          email: true,
          push: true,
          sms: false,
        },
        security: {
          twoFactorEnabled: false,
          lastPasswordChange: new Date().toISOString(),
          sessionTimeout: 30,
        },
        display: {
          theme: 'light',
          language: 'fr',
          timezone: 'Africa/Douala',
        },
      },
      filters: {
        date: {
          start: '',
          end: '',
        },
        status: [],
        zones: [],
        collectors: [],
        amount: {
          min: 0,
          max: 0,
        },
      },
      sorting: {
        field: 'date',
        direction: 'desc',
      },
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
      },
      sidebarCollapsed: false,
      currentView: 'dashboard',
      selectedItems: [],
      searchTerm: '',

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      login: async (credentials) => {
        try {
          // Simulation d'une requête API
          const response = await new Promise<User>((resolve) => 
            setTimeout(() => resolve({
              id: '1',
              name: 'Admin User',
              email: credentials.email,
              role: 'admin',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
            }), 1000)
          );
          
          set({ user: response, isAuthenticated: true });
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      markAlertAsRead: (id) => {
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === id ? { ...alert, read: true } : alert
          ),
        }));
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
          },
        }));
      },

      updateFilters: (newFilters) => {
        set((state) => ({
          filters: {
            ...state.filters,
            ...newFilters,
          },
        }));
      },

      updateSorting: (newSorting) => {
        set({ sorting: newSorting });
      },

      updatePagination: (newPagination) => {
        set((state) => ({
          pagination: {
            ...state.pagination,
            ...newPagination,
          },
        }));
      },

      toggleSidebar: () => {
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        }));
      },

      setCurrentView: (view) => {
        set({ currentView: view });
      },

      setSelectedItems: (items) => {
        set({ selectedItems: items });
      },

      setSearchTerm: (term) => {
        set({ searchTerm: term });
      },
    }),
    {
      name: 'bank-admin-storage',
      partialize: (state) => ({
        settings: state.settings,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);

export default useStore;