import React from 'react';
import { Pagination, Stack } from '@mui/material';

const PaginationComponent = ({totalPages, currentPage, onPageChange}) => {
    return (
        // 페이지네이션 컴포넌트
        <Stack spacing={2} alignItems="center" sx={{marginTop: 3}}>
            <Pagination
                count={totalPages} // 전체 페이지 수
                page={currentPage} // 현재 페이지
                onChange={(_, page) => onPageChange(page)} // 페이지 변경 시 이벤트
                color="primary" // 페이지네이션 색상
            />
        </Stack>
    );
};

export default PaginationComponent;