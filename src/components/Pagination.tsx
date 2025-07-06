import Button from './button';

interface PaginationProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  totalPages: number;
  currentPage: number;
  onPageClick: (pageNumber: number) => void;
  pagesToShow: number[];
  setPagesToShow: (pages: number[]) => void;
}

const Pagination = ({
  onPrevClick,
  onNextClick,
  totalPages,
  currentPage,
  onPageClick,
  pagesToShow,
  setPagesToShow,
}: PaginationProps) => {
  const prevButtonHandler = () => {
    if (currentPage <= 1) return;
    
    const firstPage = pagesToShow[0];
    if (firstPage > 1) {
      const _pagesToShow = [...pagesToShow];
      _pagesToShow.unshift(firstPage - 1);
      _pagesToShow.pop();
      setPagesToShow(_pagesToShow);
    }

    onPrevClick();
  };

  const nextButtonHandler = () => {
    if (currentPage >= totalPages) return;
    
    const lastPage = pagesToShow[pagesToShow.length - 1];
    if (lastPage < totalPages) {
      const _pagesToShow = [...pagesToShow, lastPage + 1];
      _pagesToShow.shift();
      setPagesToShow(_pagesToShow);
    }

    onNextClick();
  };

  return (
    <div className="flex flex-row justify-center p-4">
      <div className="flex flex-row justify-center p-4 mx-4">
        <Button
          onClick={prevButtonHandler}
          disabled={currentPage === 1}
          variant="secondary"
        >
          Previous
        </Button>

        {pagesToShow.map((pageNumber) => (
          <div key={pageNumber} className="mx-2">
            <Button
              onClick={() => onPageClick(pageNumber)}
              variant={pageNumber === currentPage ? 'primary' : 'ghost'}
              disabled={pageNumber === currentPage}
            >
              {pageNumber}
            </Button>
          </div>
        ))}
        
        <Button
          onClick={nextButtonHandler}
          variant="secondary"
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
