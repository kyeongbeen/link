package com.example.link.Post.service;

import com.example.link.Post.dto.GetPostsResponseDTO;
import com.example.link.Post.dto.PostDto;
import com.example.link.Post.entity.Post;
import com.example.link.Post.repository.PostRepository;
import com.example.link.Reply.entity.Reply;
import com.example.link.Reply.service.ReplyService;
import com.example.link.User.entity.User;
import com.example.link.User.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
public class PostService {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private ReplyService replyService;
    @Autowired
    private UserRepository userRepository;


    public List<GetPostsResponseDTO> getAllPost() {
        List<Post> posts = postRepository.findAll();
        List<GetPostsResponseDTO> postDtos = new ArrayList<>();
        for (Post post : posts) {
            Optional<User> user = userRepository.findById(post.getAuthorId());
            if (user.isEmpty()) {continue;}
            log.info(String.valueOf(post.getAuthorId()));
            postDtos.add(GetPostsResponseDTO.builder()
                    .postId(post.getPostId())
                    .projectId(post.getProjectId())
                    .authorId(post.getAuthorId())
                    .authorName(userRepository.findById(post.getAuthorId()).get().getUserName())
                    .title(post.getTitle())
                    .content(post.getContent())
                    .createdDate(post.getCreatedDate())
                    .build());
        }
        return postDtos;
    }

    public List<GetPostsResponseDTO> write(PostDto postDto) {
        Post post1 = Post.builder()
                .title(postDto.getTitle())
                .content(postDto.getContent())
                .authorId(postDto.getAuthorId())
                .projectId(postDto.getProjectId())
                .build();
        postRepository.save(post1);
        return getAllPost();
    }

    public PostDto getOnePost(Integer postId) {
        Optional<Post> oPost = this.postRepository.findById(postId);
        if (oPost.isPresent()) { // 데이터가 존재하면
            // Post 엔티티 -> PostDto로 변환 반환
            Post post = oPost.get(); // Post 획득
            return PostDto.builder()
                    .postId(post.getPostId())
                    .projectId(post.getProjectId())
                    .authorId(post.getAuthorId())
                    .title(post.getTitle())
                    .content(post.getContent())
                    .createdDate(post.getCreatedDate())
                    .build();
        }
        throw new EntityNotFoundException("Post not found with id: " + postId); // 예외 처리
    }

    public ResponseEntity<Map<String, Object>> detail(Integer postId){
        PostDto post = getOnePost(postId);
        List<Reply> replies = replyService.getReplies(postId); // 해당 글에 달린 댓글 리스트 가져오기
        Map<String, Object> response = new HashMap<>();
        response.put("post", post);
        response.put("replies", replies);
        return ResponseEntity.ok(response);
    }

    public PostDto updatePost(Integer postId, String title, String content) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        if (title != null && !title.isEmpty()) {
            post.setTitle(title);
        }
        if (content != null && !content.isEmpty()) {
            post.setContent(content);
        }
        post.setCreatedDate(LocalDateTime.now()); // 수정된 날짜로 업데이트
        postRepository.save(post);
        return getOnePost(postId);
    }

    public String delete(Integer postId) {
        postRepository.deleteById(postId);
        return postId+"번 글이 삭제되었습니다.";

    }

}