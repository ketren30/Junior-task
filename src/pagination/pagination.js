import React, { useEffect, useState } from "react";
import './pagination.css';

export const Pagination = ({peoplePerPage, totalPeople, paginate})=> {
    let pages=[];
    const pageNeighbours=1;
    const totalNumbers = (pageNeighbours * 2) + 3;
    const [currentPage, setCurrentPage] = useState(1);
    const range = (from, to, step = 1) => {
        let i = from;
        const range = [];
        while (i <= to) {
          range.push(i);
          i += step;
        }
        return range;
    }
    
    const pagesAmount=Math.ceil(totalPeople/peoplePerPage);
    if (pagesAmount<=5) pages=range(1, pagesAmount)
    else {
        const startPage = Math.max(2, currentPage - pageNeighbours);
        const endPage = Math.min(pagesAmount - 1, currentPage + pageNeighbours);
        pages=range(startPage, endPage);

        const hasLeftSpill = startPage > 2;
        const hasRightSpill = (pagesAmount - endPage) > 1;
        const spillOffset = totalNumbers - (pages.length + 1);

        if (!hasLeftSpill && hasRightSpill) {
            const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [1, ...pages, ...extraPages, 'RIGHT', pagesAmount];
        }
        if (hasLeftSpill && hasRightSpill) {
            pages = [1, 'LEFT', ...pages, 'RIGHT', pagesAmount];
        }
        if (hasLeftSpill && !hasRightSpill) {
            const extraPages = range(startPage - spillOffset, startPage - 1);
            pages = [1, 'LEFT', ...extraPages, ...pages, pagesAmount];
        }

    }

    const OnPageClick = (pageNumber)=> {
        paginate(pageNumber);
        setCurrentPage(pageNumber);
    }
    const HandleMoveLeft = () => {
        paginate(currentPage-pageNeighbours*2-1);
        setCurrentPage(prev=>prev-pageNeighbours*2-1)
    }
    const HandleMoveRight = () => {
        paginate(currentPage+pageNeighbours*2+1);
        setCurrentPage(prev=>prev+pageNeighbours*2+1)
    }

    if (totalPeople<=peoplePerPage) return null

    return (
    <div>
        <ul className="pagination">
            {pages.map((page, index)=> {
                if (page==='LEFT') return (
                    <li className="page-item" key={index} onClick={HandleMoveLeft}>
                        &#9668;
                    </li>
                )
                if (page==='RIGHT') return (
                    <li className="page-item" key={index} onClick={HandleMoveRight}>
                        &#9658;
                    </li>
                )
                return (
                <li className={`page-item${ currentPage === page ? ' active' : ''}`} key={index} onClick={()=>OnPageClick(page)}>
                    {page}
                </li>
                )
            })}

        </ul>
    </div>
    )
}