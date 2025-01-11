import { useState, useEffect } from 'react';
import Button from './button';

const Pagination = (props) => {
  const {
    onPrevClick,
    onNextClick,
    totalPages,
    currentPage,
    onPageClick,
    pagesToShow,
    setPagesToShow,
  } = props;

  console.log('pagination render');

  const prevButtonHandler = () => {
    let _pagesToShow = [...pagesToShow];
    _pagesToShow.unshift(pagesToShow[0] - 1);
    _pagesToShow.pop();

    setPagesToShow(_pagesToShow);

    onPrevClick();
  };
  const nextButtonHandler = () => {
    // if the current page is not in the pagesToShow array, shift it
    // console.log('pagesToShow', pagesToShow);

    const _pagesToShow = [
      ...pagesToShow,
      pagesToShow[pagesToShow.length - 1] + 1,
    ];
    console.log('_pagesToShow', _pagesToShow);

    _pagesToShow.shift();
    console.log('_pagesToShow', _pagesToShow);

    setPagesToShow(_pagesToShow);

    onNextClick();
  };

  return (
    <div className="flex flex-row justify-center p-4 just">
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
