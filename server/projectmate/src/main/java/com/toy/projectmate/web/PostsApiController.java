package com.toy.projectmate.web;

import com.toy.projectmate.service.posts.PostsService;
import com.toy.projectmate.web.dto.PostsDto;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/posts")
public class PostsApiController {
    private final PostsService postsService;

    private final Logger logger = LoggerFactory.getLogger(PostsApiController.class);

    @ApiOperation(value="게시물 등록")
    @PostMapping
    public ResponseEntity save(@RequestBody PostsDto.Request requestDto){
        logger.info("save 메서드 호출");
        return ResponseEntity.ok(postsService.save(requestDto));
    }
    @ApiOperation(value="게시물 수정")
    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody PostsDto.Request requestDto){
        return ResponseEntity.ok(postsService.update(id, requestDto));
    }
    @ApiOperation(value="게시물 조회")
    @GetMapping("/{id}")
    public ResponseEntity read(@PathVariable Long id){
        return ResponseEntity.ok(postsService.findById(id));
    }

    @ApiOperation(value="게시물 삭제")
    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        postsService.delete(id);
        return ResponseEntity.ok(id);
    }
}
