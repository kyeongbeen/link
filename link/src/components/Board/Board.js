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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Board = () => {
    // 게시글 목록 페이지네이션 수정 삭제
    const postPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPost, setSelectedPost] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedPost, setEditedPost] = useState(null);

    // 한국시간으로 변환하는 함수
    const formatDateToKrTime = (date) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        return new Date(date).toLocaleString('ko-KR', options).replace(',', '');
    };

    // 게시글 목록 데이터 (더미 데이터)
    // TODO: 추후 백엔드 API에서 게시글 목록 로드
    const [posts, setPosts] = useState(
        Array.from({ length: 25 }, (_, index) => ({
            id: index + 1,
            title: `게시글 제목 ${index + 1}`,
            author: `작성자 ${index + 1}`,
            content: `게시글 내용 ${index + 1}의 내용입니다.`,
            date: formatDateToKrTime(new Date()), // 한국시간으로 변환해서 삽입
        }))
    );

    // 전체 페이지 수
    const totalPage = Math.ceil(posts.length / postPerPage);

    // 현재 페이지에 따른 게시글 목록
    const currentPosts = posts.slice(
        (currentPage - 1) * postPerPage,
        currentPage * postPerPage
    );

    // 페이지 변경 시
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 게시글 클릭 시 다이얼로그 열기
    const handlePostClick = (post) => {
        setSelectedPost(post);
        setEditedPost(post);
        setOpenDialog(true);
    };

    // 다이얼로그 닫기
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setIsEditing(false);
    };

    // 게시글 수정
    // TODO: 추후 백엔드 API에서 게시글 수정
    const handleEdit = () => {
        setIsEditing(true); // 수정 모드로 변경
    };

    const handleSaveEdit = () => {
        setPosts((prevPosts) =>  
            // Post에서 수정할 게시물만 찾아서 수정 post.id(게시물.id) === editedPost.id(수정할 게시물.id)
            prevPosts.map((post) => 
                post.id === editedPost.id ? { ...post, ...editedPost } : post 
            )
        );
        setIsEditing(false); // 수정 모드 해제
        setSelectedPost(editedPost); // 수정된 게시글로 선택된 게시글 변경
    };

    // 게시글 삭제
    // TODO: 추후 백엔드 API에서 게시글 삭제
    const handleDelete = () => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== selectedPost.id)); 
        handleCloseDialog();
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* 게시글 목록 테이블 */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="게시글 목록">
                    <TableHead>
                        <TableRow>
                            <TableCell>제목</TableCell>
                            <TableCell align="right">작성일자</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentPosts.map((post) => (
                            <TableRow
                                key={post.id}
                                onClick={() => handlePostClick(post)}
                                style={{ cursor: 'pointer' }}
                            >
                                <TableCell>{post.title}</TableCell>
                                <TableCell align="right">{post.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* 페이지네이션 */}
            <PaginationComponent
                totalPages={totalPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

            {/* 다이얼로그 팝업 */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle>
                    {isEditing ? (
                        <TextField
                            fullWidth
                            value={editedPost?.title}
                            onChange={(e) =>
                                setEditedPost({ ...editedPost, title: e.target.value })
                            }
                        />
                    ) : (
                        selectedPost?.title
                    )}
                </DialogTitle>
                {isEditing ? (
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={editedPost?.content}
                        onChange={(e) =>
                            setEditedPost({ ...editedPost, content: e.target.value })
                        }
                    />
                ) : (
                    <PostDetail post={selectedPost} />
                )}
                <DialogActions>
                    {isEditing ? (
                        <Button onClick={handleSaveEdit}>저장</Button>
                    ) : (
                        <>
                            <Button onClick={handleEdit}>수정</Button>
                            <Button onClick={handleDelete} color="error">삭제</Button>
                        </>
                    )}
                    <Button onClick={handleCloseDialog}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Board;
