import React from 'react';

const PostDetail = ({ post, onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            color: 'black',
            padding: '20px',
            border: '1px solid #ccc',
            zIndex: 1000
        }}>
            {/*포스트 상세 내용 */}
            <h2>{post.title}</h2>
            <p>{post.author}</p>
            <p>{post.content}</p>
            <button onClick={onClose}>닫기</button>
        </div>
    );
};

export default PostDetail;
