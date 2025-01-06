import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const PostDetail = ({ post, onClose }) => {
    // post가 null인 경우 렌더링하지 않도록 처리
    // 처리해 주지 않으면 닫기 버튼을 눌렀을 때 오류 발생
    if (!post) {
        return null;
    }
    return (
        <DialogContent>
            <DialogContentText>
                <p><strong>작성자:</strong> {post.author}</p>
                <p>{post.content}</p>
            </DialogContentText>
            {/* 닫기 버튼은 board.js에서 구현 */}
            {/* <button onClick={onClose} style={{ marginTop: '10px' }}>닫기</button> */}
        </DialogContent>
    );
};

export default PostDetail;
