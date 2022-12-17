package com.toy.projectmate.web;

import com.toy.projectmate.service.posts.PostsService;
import com.toy.projectmate.web.dto.PostsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/posts")
public class PostsApiController {
    private final PostsService postsService;

    @PostMapping
    public ResponseEntity save(@RequestBody PostsDto.Request requestDto){
        return ResponseEntity.ok(postsService.save(requestDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody PostsDto.Request requestDto){
        return ResponseEntity.ok(postsService.update(id, requestDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity read(@PathVariable Long id){
        return ResponseEntity.ok(postsService.findById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        postsService.delete(id);
        return ResponseEntity.ok(id);
    }
}
