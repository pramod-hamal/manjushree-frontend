import React from "react";

const TailwindPagination = ({
  current,
  total,
  pageSize,
  onChange,
}: {
  current: number;
  total: number;
  pageSize: number;
  onChange: any;
}) => {
  const totalPages = Math.ceil(total / pageSize);
  const displayedPages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="flex items-center justify-center mt-8">
      <nav className="inline-flex rounded-md shadow-sm">
        <button
          onClick={() => onChange(current - 1)}
          disabled={current === 1}
          className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
        >
          Previous
        </button>
        {displayedPages.map((pageNumber: number) => (
          <button
            key={pageNumber}
            onClick={() => onChange(pageNumber)}
            className={`px-4 py-2 text-sm font-medium ${
              pageNumber === current
                ? "text-white bg-indigo-600"
                : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => onChange(current + 1)}
          disabled={current === totalPages}
          className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default TailwindPagination;
