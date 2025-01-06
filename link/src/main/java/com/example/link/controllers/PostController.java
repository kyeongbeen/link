package com.example.link.controllers;

import com.example.link.dto.PostDto;
import com.example.link.entities.Post;
import com.example.link.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RequestMapping("/post")
@Controller
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping("/list")
    public String list(Model model) {
        List<PostDto> posts = postService.getAllPost(); // 모든 post의 내용을 dto에 가져오기
        for (PostDto post : posts) {
            System.out.println(post.toString());
        }
        model.addAttribute("posts", posts); // 게시물 데이터 전달
        return "board/post_list";
    }

    @PostMapping("/create")
    public String create() {
        return "/board/post_form";
    }

    @PostMapping("/writeTest")
    public String writeTest(PostDto postdto) {
        System.out.println("제목: "+ postdto.getTitle());
        System.out.println("내용: "+ postdto.getContent());
        postService.write(postdto);
        return "board/post_list";
    }

}
