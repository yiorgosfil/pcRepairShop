"use client"

import type { TicketSearchResultsType } from "@/lib/queries/getTicketSearchResults"

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  SortingState,
  getPaginationRowModel,
  getFilteredRowModel,
  getFacetedUniqueValues,
  getSortedRowModel,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  CircleCheckIcon,
  CircleXIcon,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useMemo, useEffect } from 'react'
import { usePolling } from "@/hooks/usePolling"
import { Button } from "@/components/ui/button"
import Filter from '@/components/react-table/Filter'

type Props = {
  data: TicketSearchResultsType
}
type RowType = TicketSearchResultsType[0]

export default function TicketTable({ data }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'ticketDate',
      desc: false
    }
  ])

  usePolling(searchParams.get('searchText'), 300000)

  const pageIndex = useMemo(() => {
    const page = searchParams.get('page')
    return page ? parseInt(page) - 1 : 0
  }, [searchParams.get('page')])

  const columnHeadersArray: Array<keyof RowType> = [
    "ticketDate",
    "title",
    "tech",
    "firstName",
    "lastName",
    "email",
    "completed",
  ]

  const columnWidths = {
    completed: 150,
    ticketDate: 150,
    title: 250,
    tech: 225,
    email: 225,
  }
  const columnHelper = createColumnHelper<RowType>()

  const columns = columnHeadersArray.map(columnName => {
    return columnHelper.accessor(row => {
      const value = row[columnName]
      if (columnName === "ticketDate" && value instanceof Date) {
        return value.toLocaleDateString('nl-NL', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      }
      if (columnName === 'completed') {
        return value ? 'VOLTOOID' : 'OPEN'
      }
      return value
    }, {
      id: columnName,
      size: columnWidths[columnName as keyof typeof columnWidths] ?? undefined,
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            className='pl-1 w-full flex justify-between'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {columnName[0].toUpperCase() + columnName.slice(1)}
            {column.getIsSorted() === 'asc' && <ArrowUp className='ml-2 h-4 w-4' />}
            {column.getIsSorted() === 'desc' && <ArrowDown className='ml-2 h-4 w-4' />}
            {column.getIsSorted() !== 'desc' && column.getIsSorted() !== 'asc' && <ArrowUpDown className='ml-2 h-4 w-4' />}
          </Button>
        )
      },
      cell: ({ getValue }) => {
        const value = getValue()
        if (columnName === 'completed') {
          return (
            <div className='grid place-content-center'>
              {value === 'OPEN' ? <CircleXIcon className='opacity-25' /> : <CircleCheckIcon className='text-green-600' />}
            </div>
          )
        }
        return value
      }
    })
  })

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageIndex,
        pageSize: 10,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
  })

  useEffect(() => {
    const currentPageIndex = table.getState().pagination.pageIndex
    const pageCount = table.getPageCount()

    if (pageCount <= currentPageIndex && currentPageIndex > 0) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', '1')
      router.replace(`?${params.toString()}`, { scroll: false })
    }
  }, [table.getState().columnFilters]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='mt-6 flex flex-col gap-4'>
      <div className='rounded-lg overflow-hidden border border-border'>
        <Table className='border'>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className='bg-secondary p-1' style={{ width: header.getSize() }}>
                    <div>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      }
                    </div>
                    {header.column.getCanFilter() ? (
                      <div className='grid place-content-center'>
                        <Filter column={header.column} />
                      </div>
                    ) : null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                className='cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40'
                onClick={() => router.push(`/tickets/form?ticketId=${row.original.id}`)}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className='border'>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='flex justify-between items-center gap-1 flex-wrap'>
        <div>
          <p className='whitespace-nowrap font-bold'>
            {`Pagina ${table.getState().pagination.pageIndex + 1} van ${Math.max(1, table.getPageCount())}`}
            &nbsp;&nbsp;
            {`(${table.getFilteredRowModel().rows.length} ${table.getFilteredRowModel().rows.length !== 1 ? 'totale resultaten' : 'resultaat'})`}
          </p>
        </div>
        <div className='flex flex-row justify-end md:size-full gap-1'>
          <div className='flex flex-row gap-1'>
            <Button
              variant='outline'
              onClick={() => router.refresh()}
            >
              Gegevens verversen
            </Button>
            <Button
              variant='outline'
              onClick={() => table.resetSorting()}
            >
              Sortering resetten
            </Button>
            <Button
              variant='outline'
              onClick={() => table.resetColumnFilters()}
            >
              Filters resetten
            </Button>
          </div>
          <div className='flex flex-row gap-1'>
            <Button
              variant='outline'
              onClick={() => {
                const newIndex = table.getState().pagination.pageIndex - 1
                table.setPageIndex(newIndex)
                const params = new URLSearchParams(searchParams.toString())
                params.set('page', (newIndex + 1).toString())
                router.replace(`?${params.toString()}`, { scroll: false })
              }}
              disabled={!table.getCanPreviousPage()}
            >
              Vorige
            </Button>
            <Button
              variant='outline'
              onClick={() => {
                const newIndex = table.getState().pagination.pageIndex + 1
                table.setPageIndex(newIndex)
                const params = new URLSearchParams(searchParams.toString())
                params.set('page', (newIndex + 1).toString())
                router.replace(`?${params.toString()}`, { scroll: false })
              }}
              disabled={!table.getCanNextPage()}
            >
              Volgende
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
