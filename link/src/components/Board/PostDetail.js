import React from "react";
import DialogContent from "@mui/material/DialogContent";
import { Typography, Box, Divider } from "@mui/material";

const PostDetail = ({ post }) => {
  // post가 null인 경우 렌더링하지 않음
  if (!post) {
    return null;
  }

  return (
    <DialogContent>
      <Box>
        {/* 제목 */}
        <Typography variant="h5" color="primary" gutterBottom>
          {post.title}
        </Typography>
        
        <Divider sx={{ my: 2 }} />

        {/* 작성자 */}
        <Typography variant="subtitle1" fontWeight="bold" color="textSecondary">
          작성자
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {post.author}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* 내용 */}
        <Typography variant="subtitle1" fontWeight="bold" color="textSecondary">
          내용
        </Typography>
        <Typography variant="body1">
          {post.content}
        </Typography>
      </Box>
    </DialogContent>
  );
};

export default PostDetail;
