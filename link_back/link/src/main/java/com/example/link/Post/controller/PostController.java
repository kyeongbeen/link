package com.example.link.Post.controller;

import com.example.link.Post.dto.GetPostsResponseDTO;
import com.example.link.Post.dto.PostDto;
import com.example.link.Post.service.PostService;
import com.example.link.Reply.service.ReplyService;
import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@Tag(name = "Posts", description = "게시물 API")
@RequestMapping("/post")
@RestController
public class PostController {
    @Autowired
    private PostService postService;
    @Autowired
    private ReplyService replyService;

    @GetMapping("/list") 
    @Operation(summary = "전체 게시물 조회")
    public List<GetPostsResponseDTO> list(){
        return postService.getAllPost();
    }

    @PostMapping("/create")
    @Operation(summary = "게시물 생성")
    public List<GetPostsResponseDTO> create(@Valid @RequestBody PostDto postDto) {
        return postService.write(postDto); // HTTP 200 OK로 결과 반환
    }

    @GetMapping("/detail/{postId}")
    @Operation(summary = "게시물 상세")
    public ResponseEntity<Map<String, Object>> detail(@PathVariable("postId") Integer postId) {
        return postService.detail(postId);
    }

    @PatchMapping("/update/{postId}")
    @Operation(summary = "게시물 수정")
    public PostDto update(@PathVariable Integer postId, @RequestParam(required = false) String title, @RequestParam(required = false) String content) {
        return this.postService.updatePost(postId, title, content);
    }

    @DeleteMapping("/delete/{postId}")
    @Operation(summary = "게시물 삭제")
    public String delete(@PathVariable Integer postId) {
        return postService.delete(postId);
    }
}
