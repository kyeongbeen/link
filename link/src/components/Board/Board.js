import React, { useState, useEffect } from "react";
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
import dayjs from "dayjs";
import AuthAPI from "../Auth/AuthAPI";
import { useProjectId } from "../Auth/ProjectIdContext";
import { useUser } from '../Auth/UserContext';
import axios from "axios";

const Board = () => {
  const postPerPage = 5; // 페이지당 게시글 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [selectedPost, setSelectedPost] = useState({}); // 선택된 게시글
  const [openDialog, setOpenDialog] = useState(false); // 다이얼로그 열림 여부
  const [isEditing, setIsEditing] = useState(false); // 수정 중인지 여부
  const [editedPost, setEditedPost] = useState(null); // 수정 중인 게시글
  const [replies, setReplies] = useState([]); // 댓글 목록
  const [openCreateDialog, setOpenCreateDialog] = useState(false); // 글 작성 다이얼로그 열림 여부
  const [posts, setPosts] = useState([]); // 게시글 목록
  const [newPost, setNewPost] = useState(0); // 새로운 게시글 내용
  const [newReply, setNewReply] = useState(0); // 새로운 댓글 내용
  const { projectId } = useProjectId(); // 선택된 프로젝트 ID
  const { user } = useUser();


  // 날짜 변환 함수
  const formatDateToKrTime = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    const dayjsDate = dayjs(date);
    return dayjsDate.format("YYYY-MM-DD HH:mm");
  };

  // 게시글 목록 불러오기
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await AuthAPI.get(
          "/post/list",
          { headers: { Authorization: `Bearer ${user.token}` } }
        );

        // projectId 필터링
        const filteredPosts = response.data.filter(
          (post) => post.projectId === projectId // projectId와 일치하는 항목만 필터링
        );

        // 날짜 포맷팅
        const formattedPosts = filteredPosts.map((post) => ({
          ...post,
          date: formatDateToKrTime(post.createdDate),
        }));

        setPosts(formattedPosts); // 필터링된 게시글 설정
        console.log("게시글 목록: ", formattedPosts);
      } catch (error) {
        console.error("게시글 목록을 가져오는 중 오류 발생: ", error);
      }
    };
    getPosts();
  }, [projectId, posts]); // projectId가 변경될 때도 useEffect 재실행


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
    setIsEditing(true);
  };

  // 수정 저장
  const handleSaveEdit = async () => {
    try {
      console.log(user.token);
      // const response = await AuthAPI.patch(
      const response = await axios.patch(
        `http://localhost:8080/post/update/${selectedPost.postId}?title=${encodeURIComponent(editedPost.title)}&content=${encodeURIComponent(editedPost.content)}`
      , null, { headers: { Authorization: `Bearer ${user.token}` }}
    );
      editedPost.date = formatDateToKrTime(editedPost.createdDate);
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.postId === editedPost.postId ? editedPost : p))
      );
      setIsEditing(false);
      alert("게시글이 수정되었습니다.");
      handleCloseDialog();
    } catch (error) {
      console.error("게시글을 수정하는 중 오류 발생: ", error);
    }
  };

  // 게시글 삭제
  const handleDelete = async (post, reply) => {
    setSelectedPost(post);
    if (reply) {
      const replyURL = `http://localhost:8080/reply/delete/${reply.replyId}`;
      await axios.delete(replyURL, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
    }
    try {
      const boardURL = `http://localhost:8080/post/delete/${post.postId}`;
      await axios.delete(boardURL, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.postId !== selectedPost.postId)
      );
      handleCloseDialog();
      alert("게시글이 삭제되었습니다.");
    } catch (error) {
      console.error("게시글을 삭제하는 중 오류 발생: ", error);
      return null;
    }
  };

  // 댓글 추가
  const handleAddReply = async () => {
    console.log("유저 이름", user);
    const newReplyData = {
      projectId: projectId, 
      authorName: user.userName,
      content: newReply.content,
      createdDate: new Date(),
      postId: selectedPost.postId,
    };
    console.log("댓글 추가 데이터:", newReplyData);
    try {
      const response = await AuthAPI.post(
        `http://localhost:8080/reply/create/${selectedPost.postId}`,
        newReplyData, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
      const newReply = response.data;
      setReplies((prevReplies) => [...prevReplies, newReply]);
      await getReply();
      setNewReply({
        content: "",
        createDate: new Date(),
      });
    } catch (error) {
      console.error("댓글 생성 중 오류 발생:", error);
    }
  };

  // 댓글 목록 불러오기 함수
  const getReply = async () => {
    try {
      const response = await AuthAPI.get("http://localhost:8080/reply/list",
      {
        headers: {
        Authorization: `Bearer ${user.token}`
      }
      });
      setReplies(response.data);
    } catch (error) {
      console.error("댓글 목록을 가져오는 중 오류 발생: ", error);
    }
  };

  useEffect(() => {
    getReply();
  }, []);

  // 댓글 삭제
  const handleDeleteReply = async (reply) => {
    const URL = `/reply/delete/${reply.replyId}`;
    try {
      const response = await AuthAPI.delete(URL, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setReplies((prevReplies) =>
        prevReplies.filter(
          (existingReply) => existingReply.replyId !== reply.replyId
        )
      );
      alert("댓글이 삭제되었습니다.");
    } catch (error) {
      console.error("댓글을 삭제하는 중 오류 발생: ", error);
      return null;
    }
  };

  // 새로운 게시글 추가
  const handleCreatePost = async () => {
    const newPostData = {
      ...newPost,
      projectId: projectId,
    };
    console.log("POST로 보내질 데이터: ", newPostData);
    try {
      const response = await AuthAPI.post(
        "http://localhost:8080/post/create",
        newPostData, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
      // 새로 데이터 가져오기 (새로 생성된 게시글이 반영이 안 돼서 그냥 다시 불러옴)
      const getResponse = await AuthAPI.get("http://localhost:8080/post/list", {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setPosts(getResponse.data);

      setPosts((prevPosts) =>
        prevPosts.map((post) => ({
          ...post,
          date: formatDateToKrTime(post.createdDate),
        }))
      );
      setOpenCreateDialog(false);
      setNewPost({
        title: "",
        content: "",
      });

      alert("새 게시글이 작성되었습니다.");
    } catch (error) {
      console.error("게시글을 추가하는 중 오류 발생: ", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenCreateDialog(true)}
        style={{ marginBottom: "20px" }}
      >
        글 작성하기
      </Button>
      {/* 게시판 목록 테이블 */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 850 }}>
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
                <TableCell align="center">{user.userName}</TableCell>
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
            ) : null}
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
            <PostDetail post={selectedPost} user={user} />
          )}
          <DialogActions>
            {isEditing ? (
              <Button onClick={handleSaveEdit}>저장</Button>
            ) : (
              <>
                <Button onClick={handleEdit}>수정</Button>
                <Button
                  onClick={() =>
                    handleDelete(
                      selectedPost,
                      replies.find(
                        (reply) => reply.postId === selectedPost?.postId // 댓글도 삭제되기 위하여 reply도 매개변수로 줌
                      )
                    )
                  }
                  color="error"
                >
                  삭제
                </Button>
              </>
            )}
            <Button onClick={handleCloseDialog}>닫기</Button>
          </DialogActions>
          {/* 댓글 영역 */}
          {!isEditing &&
            replies
              .filter((reply) => reply.postId === selectedPost?.postId)
              .map((reply, index) => (
                <div
                  key={index}
                  style={{
                    borderBottom: "1px solid #ddd",
                    paddingBottom: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <p>
                    {" "}
                    {/* 현재 로그인 유저는 가져 올 수 없기 때문에 '미구현'으로 출력 */}
                    <strong>{reply.authorName}</strong> (
                    {formatDateToKrTime(reply.createdDate)})
                  </p>
                  <p>{reply.content}</p>
                  <DialogActions>
                    <Button
                      onClick={() => handleDeleteReply(reply)}
                      color="error"
                    >
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
                value={newReply.content}
                onChange={(e) =>
                  setNewReply({ ...newReply, content: e.target.value })
                }
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
