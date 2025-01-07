import React, { useState } from "react";
import PostDetail from "./PostDetail";
import PaginationComponent from "./Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DialogContent, DialogContentText } from "@mui/material";

/**
 * 추후 API 연동할 때 useState에 author 추가
 */
const Board = () => {
  const postPerPage = 5; // 페이지당 게시글 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 게시글
  const [openDialog, setOpenDialog] = useState(false); // 다이얼로그 열림 여부
  const [isEditing, setIsEditing] = useState(false); // 수정 중인지 여부
  const [editedPost, setEditedPost] = useState(null); // 수정 중인 게시글
  const [newReply, setNewReply] = useState(""); // 새로운 댓글 내용
  const [openCreateDialog, setOpenCreateDialog] = useState(false); // 글 작성 다이얼로그 열림 여부
  const [newPost, setNewPost] = useState({ title: "", content: ""}); // 새로운 게시글 내용

  // 날짜 형식 변환 함수
  const formatDateToKrTime = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Date(date).toLocaleString("ko-KR", options).replace(",", "");
  };

  // 게시글 목록 데이터
  const [posts, setPosts] = useState(
    Array.from({ length: 25 }, (_, index) => ({
      id: index + 1,
      title: `게시글 제목 ${index + 1}`,
      author: `작성자 ${index + 1}`,
      content: `게시글 내용 ${index + 1}의 내용입니다.`,
      date: formatDateToKrTime(new Date()),
      replys: [], // 댓글 배열 추가
    }))
  );

  // 전체 페이지 수 계산
  const totalPage = Math.ceil(posts.length / postPerPage);
  const currentPosts = posts.slice(
    (currentPage - 1) * postPerPage,
    currentPage * postPerPage
  );

  // 페이지 변경
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
  const handleEdit = () => {
    setIsEditing(true); // 수정 모드로 변경
  };

  const handleSaveEdit = () => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === editedPost.id ? { ...post, ...editedPost } : post
      )
    );
    setIsEditing(false); // 수정 모드 해제
    setSelectedPost(editedPost); // 수정된 게시글로 선택된 게시글 변경
  };

  // 게시글 삭제
  const handleDelete = () => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== selectedPost.id)
    );
    handleCloseDialog();
  };

  // 댓글 추가
  const handleAddReply = () => {
    if (newReply.trim()) {
      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.map((post) =>
          post.id === selectedPost.id
            ? {
                ...post,
                replys: [
                  ...post.replys,
                  {
                    author: "댓글 작성자",
                    content: newReply,
                    date: formatDateToKrTime(new Date()),
                  },
                ],
              }
            : post
        );
        const updatedPost = updatedPosts.find(
          (post) => post.id === selectedPost.id
        );
        setSelectedPost(updatedPost);
        return updatedPosts;
      });
      setNewReply(""); // 댓글 입력 필드 초기화
    }
  };

  // 댓글 삭제
  const handleDeleteReply = (reply) => {
    console.log(reply);
    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.map((post) =>
        post.id === selectedPost.id
          ? {
              ...post,
              replys: post.replys.filter(
                (currentReply) => currentReply !== reply
              ),
            }
          : post
      );
      const updatedPost = updatedPosts.find(
        (post) => post.id === selectedPost.id
      );
      setSelectedPost(updatedPost);
      return updatedPosts;
    });
  };

  // 새로운 게시글 추가
  const handleCreatePost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const newPostData = {
        id: posts.length + 1,
        ...newPost,
        author: `작성자 ${posts.length + 1}`, // 작성자는 임시로 게시글 id로 설정
        date: formatDateToKrTime(new Date()),
        replys: [],
      };
      setPosts((prevPosts) => [newPostData, ...prevPosts]);
      setOpenCreateDialog(false); // 다이얼로그 닫기
      setNewPost({ title: "", content: "" }); // 입력 필드 초기화
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenCreateDialog(true)} // 글 작성 다이얼로그 열기
        style={{ marginBottom: "20px" }}
      >
        글 작성하기
      </Button>
      {/* 게시판 목록 테이블 */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 850 }} aria-label="게시글 목록">
          <TableHead>
            <TableRow>
              <TableCell align="center">제목</TableCell>
              <TableCell align="center">작성자</TableCell>
              <TableCell align="center">작성일자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts.map((post) => (
              <TableRow
                key={post.id}
                onClick={() => handlePostClick(post)}
                style={{ cursor: "pointer" }}
              >
                <TableCell align="center">{post.title}</TableCell>
                <TableCell align="center">{post.author}</TableCell>
                <TableCell align="center">{post.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationComponent
        totalPages={totalPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* 게시글 상세 다이얼로그 */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        {/* DialogContent overflow를 주어 단일 스크롤바로 만들어 문제 해결 */}
        <DialogContent style={{ overflow: "auto", maxHeight: "80vh" }}>
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
              rows={10}
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
                <Button onClick={handleDelete} color="error">
                  삭제
                </Button>
              </>
            )}
            <Button onClick={handleCloseDialog}>닫기</Button>
          </DialogActions>

          {/* 댓글 영역 */}
          {!isEditing &&
            selectedPost?.replys?.map((reply, index) => (
              <div
                key={index}
                style={{
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "10px",
                  marginBottom: "10px",
                }}
              >
                <p>
                  <strong>{reply.author}</strong> ({reply.date})
                </p>
                <p>{reply.content}</p>
                <DialogActions>
                    <Button onClick={() => handleDeleteReply(reply)} color="error">
                        삭제
                    </Button>
                </DialogActions>
              </div>
            ))}

          {/* 댓글 입력 필드 */}
          {!isEditing && (
            <div style={{ padding: "10px" }}>
              <TextField
                fullWidth
                label="댓글을 입력하세요."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                multiline
                rows={1}
              />
              <Button
                onClick={handleAddReply}
                style={{ marginTop: "10px" }}
                variant="contained"
                color="primary"
              >
                댓글 추가
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 글 작성 다이얼로그 */}
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>게시글 작성</DialogTitle>
        <DialogContentText>
          <TextField
            label="제목"
            fullWidth
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            style={{ marginBottom: "20px" }}
          />
          <TextField
            label="내용"
            fullWidth
            multiline
            rows={10}
            value={newPost.content}
            onChange={(e) =>
              setNewPost({ ...newPost, content: e.target.value })
            }
          />
        </DialogContentText>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)} color="secondary">
            닫기
          </Button>
          <Button onClick={handleCreatePost} color="primary">
            등록하기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Board;
