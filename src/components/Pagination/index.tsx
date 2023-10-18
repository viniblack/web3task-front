import { Pagination } from '@mui/material';
import { useState } from 'react';

const usePagination = () => {
    const [page, setPage] = useState(1);

    const handleChange = (event, newPage) => {
        setPage(newPage);
    };

    const PaginationComponent = ({numPages}) => (
        <Pagination
            count={numPages}
            page={page}
            onChange={handleChange}
            color="primary"
        />
    );

    return {
        currentPage: page,
        Pagination: PaginationComponent,
        setPage: (newPage) => setPage(newPage),
    };
};

export default usePagination;

