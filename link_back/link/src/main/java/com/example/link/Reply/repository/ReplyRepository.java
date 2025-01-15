package com.example.link.Reply.repository;

import com.example.link.Reply.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReplyRepository  extends JpaRepository<Reply, Integer> {
    List<Reply> findByPostId(Integer postId);

}
