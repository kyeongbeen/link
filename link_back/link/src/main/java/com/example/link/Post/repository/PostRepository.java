package com.example.link.Post.repository;

import com.example.link.Post.dto.PostDto;
import com.example.link.Post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Integer> {

    PostDto getPostsByPostId(int postId);
}
