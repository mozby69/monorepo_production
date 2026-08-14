import type { ReactNode } from "react";

/* =====================
   HEADER
===================== */

export type PaginationMeta = {
   page: number;
   limit: number;
   total: number;
   totalPages: number;
};

export type TableColumn<T> = {
   key: string;
   header: ReactNode;
   render: (row: T) => ReactNode;

   className?: string;
   headerClassName?: string;
};

/* =====================
   FOOTER
===================== */

export type TablePaginationProps = {
   pagination?: PaginationMeta;
   onPageChange: (page: number) => void;
};

/* =====================
   TABLE
===================== */

export type TableProps<T> = {
   /* Header */
   title?: string;
   description?: string;

   search?: string;
   searchPlaceholder?: string;
   onSearchChange?: (value: string) => void;

   limit?: number;
   limitOptions?: number[];
   onLimitChange?: (value: number) => void;

   filters?: ReactNode;
   actions?: ReactNode;

   /* Table */
   columns: TableColumn<T>[];
   data: T[];
   rowKey?: (row: T) => React.Key;

   /* State */
   isLoading?: boolean;
   emptyMessage?: string;

   /* Row actions */
   onView?: (row: T) => void;
   onEdit?: (row: T) => void;
   onDelete?: (row: T) => void;

   actionsHeader?: ReactNode;

   /* Pagination footer */
   pagination?: PaginationMeta;
   onPageChange: (page: number) => void;
};