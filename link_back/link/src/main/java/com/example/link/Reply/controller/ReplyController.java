package com.example.link.Reply.controller;

import com.example.link.Post.repository.PostRepository;
import com.example.link.Reply.dto.ReplyDto;
import com.example.link.Reply.entity.Reply;
import com.example.link.Reply.service.ReplyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Replies", description = "댓글 API")
@RequestMapping("/reply")
@RestController
public class ReplyController {
    @Autowired
    private ReplyService replyService;

    @Autowired
    private PostRepository postRepository;

    @GetMapping("/list")
    @Operation(summary = "전체 댓글 조회")
    public List<Reply> list() {
        return replyService.getAllRelpy();
    }

    @PostMapping("/create/{postId}")
    @Operation(summary = "댓글 생성")
    public ResponseEntity<List<Reply>> createReply(@PathVariable("postId") Integer postId, @RequestBody Reply reply) {
        return replyService.write(postId, reply);
    }

    @PatchMapping("/update/{replyId}")
    @Operation(summary = "댓글 수정")
    public ReplyDto update(@PathVariable int replyId, @RequestParam(required = false) String content) {
        return replyService.updateReply(replyId, content);
    }

    @DeleteMapping("/delete/{replyId}")
    @Operation(summary = "댓글 삭제")
    public String delete(@PathVariable Integer replyId) {
        return replyService.delete(replyId);
    }

}
