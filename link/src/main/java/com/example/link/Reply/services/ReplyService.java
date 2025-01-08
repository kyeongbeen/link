package com.example.link.Reply.services;

import com.example.link.Post.dto.PostDto;
import com.example.link.Post.entities.Post;
import com.example.link.Post.services.PostService;
import com.example.link.Project.entity.Project;
import com.example.link.Project.service.ProjectService;
import com.example.link.Reply.dto.ReplyDto;
import com.example.link.Reply.entity.Reply;
import com.example.link.Reply.repositories.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReplyService {
    @Autowired
    private ReplyRepository replyRepository;
    @Autowired
    private PostService postService;

    public List<Reply> getAllRelpy() {
        List<Reply> replys= replyRepository.findAll();
        List<ReplyDto> replyDtos= new ArrayList<>();
        for (Reply reply : replys) {
            replyDtos.add(ReplyDto.builder()
                    .replyId(reply.getReplyId())
                    .postId(reply.getPostId())
                    .projectId(reply.getProjectId())
                    .content(reply.getContent())
                    .authorName(reply.getAuthorName())
                    .createdDate(reply.getCreatedDate())
                    .build());

        }
        return replys;
    }

    public void write(Integer postId, Reply reply) {
        PostDto postDto = postService.getOnePost(postId);
        Integer projectId = postDto.getProjectId(); // postDto에서  projectid를 가져옴
        Reply reply1 = Reply.builder()
                .postId(postId)
                .projectId(projectId)
                .content(reply.getContent())
                .authorName(reply.getAuthorName())
                .build();
       replyRepository.save(reply1);
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
    public void delete(ReplyDto replyDto) {
        this.replyRepository.delete(replyDto.toEntity());
    }

}
