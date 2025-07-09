import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import Button from './Button';

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  pagination?: {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
  };
  sorting?: {
    sortBy: string;
    sortDesc: boolean;
    onSort: (field: string, desc: boolean) => void;
  };
  loading?: boolean;
  error?: string;
}

function Table<T>({
  data,
  columns,
  pagination,
  sorting,
  loading,
  error,
}: TableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: pagination
        ? {
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize,
          }
        : undefined,
      sorting: sorting
        ? [
            {
              id: sorting.sortBy,
              desc: sorting.sortDesc,
            },
          ]
        : [],
    },
    onPaginationChange: pagination
      ? (updater) => {
          const newPagination =
            typeof updater === 'function'
              ? updater({
                  pageIndex: pagination.pageIndex,
                  pageSize: pagination.pageSize,
                })
              : updater;
          pagination.onPageChange(newPagination.pageIndex);
          pagination.onPageSizeChange(newPagination.pageSize);
        }
      : undefined,
    onSortingChange: sorting
      ? (updater) => {
          const newSorting =
            typeof updater === 'function'
              ? updater([
                  {
                    id: sorting.sortBy,
                    desc: sorting.sortDesc,
                  },
                ])
              : updater;
          if (Array.isArray(newSorting) && newSorting.length > 0) {
            sorting.onSort(newSorting[0].id, newSorting[0].desc);
          }
        }
      : undefined,
    manualPagination: true,
    manualSorting: true,
    pageCount: pagination?.pageCount || -1,
  });

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Chargement...
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Aucune donnée disponible
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">
              Lignes par page:
            </span>
            <select
              value={pagination.pageSize}
              onChange={(e) =>
                pagination.onPageSizeChange(Number(e.target.value))
              }
              className="form-select rounded-md border-gray-300 text-sm"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => pagination.onPageChange(0)}
              disabled={pagination.pageIndex === 0}
              icon={<ChevronsLeft className="h-4 w-4" />}
            >
              Premier
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.pageIndex - 1)}
              disabled={pagination.pageIndex === 0}
              icon={<ChevronLeft className="h-4 w-4" />}
            >
              Précédent
            </Button>
            <span className="text-sm text-gray-700">
              Page {pagination.pageIndex + 1} sur {pagination.pageCount}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.pageIndex + 1)}
              disabled={pagination.pageIndex === pagination.pageCount - 1}
              icon={<ChevronRight className="h-4 w-4" />}
            >
              Suivant
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.pageCount - 1)}
              disabled={pagination.pageIndex === pagination.pageCount - 1}
              icon={<ChevronsRight className="h-4 w-4" />}
            >
              Dernier
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;