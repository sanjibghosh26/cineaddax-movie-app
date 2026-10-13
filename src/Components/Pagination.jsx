
function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const buttonClass =
    "inline-flex shrink-0 items-center justify-center rounded-lg border text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm";

  return (
    <nav
      aria-label="Movie pagination"
      className="mx-auto mt-8 flex w-full max-w-full flex-wrap items-center justify-center gap-1.5 px-2 sm:mt-12 sm:gap-2 sm:px-4"
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`${buttonClass} border-white/10 bg-white/5 px-2.5 py-2 text-slate-300 hover:bg-white/10 sm:px-4 sm:py-2.5`}
        aria-label="Go to previous page"
      >
        <span className="sm:hidden">← Prev</span>
        <span className="hidden sm:inline">← Previous</span>
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => onPageChange(pageNumber)}
          aria-current={pageNumber === page ? "page" : undefined}
          aria-label={`Go to page ${pageNumber}`}
          className={`${buttonClass} min-w-8 px-2.5 py-2 sm:min-w-10 sm:px-3 sm:py-2.5 ${
            pageNumber === page
              ? "border-fuchsia-500 bg-fuchsia-600 text-white"
              : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className={`${buttonClass} border-white/10 bg-white/5 px-2.5 py-2 text-slate-300 hover:bg-white/10 sm:px-4 sm:py-2.5`}
        aria-label="Go to next page"
      >
        <span className="sm:hidden">Next →</span>
        <span className="hidden sm:inline">Next →</span>
      </button>
    </nav>
  );
}

export default Pagination;
