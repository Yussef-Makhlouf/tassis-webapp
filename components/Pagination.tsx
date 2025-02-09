'use client'
import { ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage = 1, totalPages = 5, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center my-16">
      <div className="relative flex items-center h-20 border border-[#20284D] rounded-[5px] bg-white">
        {/* Previous Page Button */}
        <button 
          className="flex items-center justify-center w-20 h-full border-l border-[#20284D] relative group"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        >
          <div className="flex gap-1">
            <ChevronRight className="w-6 h-6 text-[#20284D] rotate-180" />
            <ChevronRight className="w-6 h-6 text-[#20284D] rotate-180" />
            <ChevronRight className="w-6 h-6 text-[#20284D] rotate-180" />
          </div>
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => totalPages - i).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`relative w-[92px] h-full text-[30px] font-bold font-cairo text-[#20284D] border-l border-[#20284D] transition-colors
              ${currentPage === pageNumber ? 'bg-[#20284D]/5' : 'hover:bg-[#20284D]/5'}`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  )
} 