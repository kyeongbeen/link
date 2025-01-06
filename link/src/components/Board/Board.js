import React, { useState } from 'react';
import PostDetail from './PostDetail';
import PaginationComponent from './Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Board = () => {
    // 게시글 데이터
    const postPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPost, setSelectedPost] = useState(null);

    // 더미 데이터 (확인용)
    const posts = Array.from({ length: 25 }, (_, index) => ({
        id: index + 1,
        title: `게시글 제목 ${index + 1}`,
        author: `작성자 ${index + 1}`,
        content: `게시글 내용 ${index + 1}의 내용입니다.`,
    }));

    // 전체 페이지 수
    const totalPage = Math.ceil(posts.length / postPerPage);

    // 현재 페이지에 보여줄 게시글
    const currentPosts = posts.slice(
        (currentPage - 1) * postPerPage,
        currentPage * postPerPage
    );

    // 페이지 변경 시
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 게시글 클릭 시 팝업 열기
    const handlePostClick = (post) => {
        setSelectedPost(post);
        console.log(post); // 게시물 데이터가 잘 전달되는지 (확인용)
    };

    // 팝업 닫기
    const handleClosePopup = () => {
        setSelectedPost(null); // 팝업을 닫으면 선택한 게시물을 초기화
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* 게시글 목록 테이블 */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="게시글 목록">
                    <TableHead>
                        <TableRow>
                            <TableCell>제목</TableCell>
                            <TableCell align="right">작성자</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentPosts.map((post) => (
                            <TableRow
                                key={post.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={() => handlePostClick(post)} // 클릭 시 팝업 열기
                                style={{ cursor: 'pointer' }} // 마우스 커서 스타일 추가
                            >
                                <TableCell component="th" scope="row">
                                    {post.title}
                                </TableCell>
                                <TableCell align="right">{post.author}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* 선택한 게시물이 있을 때만 팝업을 띄움 */}
            {selectedPost && (
                <PostDetail post={selectedPost} onClose={handleClosePopup} />
            )}

            {/* 페이지네이션 */}
            <PaginationComponent
                totalPages={totalPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Board;
