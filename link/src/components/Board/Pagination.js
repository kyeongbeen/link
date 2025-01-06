import React from 'react';
import { Pagination, Stack } from '@mui/material';

const PaginationComponent = ({totalPages, currentPage, onPageChange}) => {
    return (
        <Stack spacing={2} alignItems="center" sx={{marginTop: 3}}>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => onPageChange(page)}
                color="primary"
            />
        </Stack>
    );
};

export default PaginationComponent;