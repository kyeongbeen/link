package com.example.link.Reply.service;

import com.example.link.Post.dto.PostDto;
import com.example.link.Post.repository.PostRepository;
import com.example.link.Reply.dto.ReplyDto;
import com.example.link.Reply.entity.Reply;
import com.example.link.Reply.repository.ReplyRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReplyService {
    @Autowired
    private ReplyRepository replyRepository;

    @Autowired
    private PostRepository postRepository;

    public List<Reply> getAllRelpy() {
        List<Reply> replies= replyRepository.findAll();
        List<ReplyDto> replyDtos= new ArrayList<>();
        for (Reply reply : replies) {
            replyDtos.add(ReplyDto.builder()
                    .replyId(reply.getReplyId())
                    .postId(reply.getPostId())
                    .projectId(reply.getProjectId())
                    .content(reply.getContent())
                    .authorName(reply.getAuthorName())
                    .createdDate(reply.getCreatedDate())
                    .build());
        }
        return replies;
    }

    public ResponseEntity<List<Reply>> write(Integer postId, Reply reply) {
        PostDto postDto = postRepository.getPostsByPostId(postId);
        Integer projectId = postDto.getProjectId(); // postDto에서  projectid를 가져옴
        Reply reply1 = Reply.builder()
                .postId(postId)
                .projectId(projectId)
                .content(reply.getContent())
                .authorName(reply.getAuthorName())
                .build();
        replyRepository.save(reply1);
        List<Reply> replies= getReplies(postId);
        return ResponseEntity.ok(replies);
    }

    public List<Reply> getReplies(Integer postId) {
        return replyRepository.findByPostId(postId);
    }

    public ReplyDto getOneReply(Integer replyId) {
        Optional<Reply> reply1 = this.replyRepository.findById(replyId);
        if( reply1.isPresent() ){ // 리뷰가 존재하면
            Reply reply = reply1.get();
            return ReplyDto.builder()  // 댓글을 replydto로 변환하여 반환(엔티티 -> dto)
                    .replyId(reply.getReplyId())
                    .postId(reply.getPostId())
                    .projectId(reply.getProjectId())
                    .content(reply.getContent())
                    .authorName(reply.getAuthorName())
                    .createdDate(reply.getCreatedDate())
                    .build();
        }
        return null;
    }

    public ReplyDto updateReply(Integer replyId, String content) {
        Reply reply = replyRepository.findById(replyId).get();

        reply.setContent(content);
        reply.setCreatedDate(LocalDateTime.now()); // 수정된 날짜로 업데이트
        replyRepository.save(reply);

        return getOneReply(replyId);
    }

    public String delete(Integer replyId) {
        replyRepository.deleteById(replyId);
        return replyId +"번 댓글이 삭제되었습니다.";
    }

}
