package com.toy.projectmate.web.dto.posts;

import com.toy.projectmate.domain.posts.Posts;
import lombok.*;

import java.time.LocalDateTime;

public class PostsDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Request{
        private String title;
        private String content;
        private String writer;
        private String subject;
        private String division;
        private int people_num;
        private int proceed_way;
        private int is_progress;

        public Posts toEntity(){ // dto -> entity
            Posts posts = Posts.builder()
                    .title(title)
                    .content(content)
                    .writer(writer)
                    .subject(subject)
                    .division(division)
                    .people_num(people_num)
                    .proceed_way(proceed_way)
                    .build();

            return posts;
        }
    }
    @Getter
    public static class Response{
        private Long id;
        private String title;
        private String content;
        private String writer;
        private String subject;
        private String division;
        private int people_num;
        private int proceed_way;
        private int is_progress;
        private String createdDate;
        private String modifiedDate;



        public Response(Posts entity){ // entity -> dto
            this.id = entity.getId();
            this.title = entity.getTitle();
            this.writer = entity.getWriter();
            this.content = entity.getContent();
            this.subject = entity.getSubject();
            this.division = entity.getDivision();
            this.people_num = entity.getPeople_num();
            this.proceed_way = entity.getProceed_way();
            this.is_progress=entity.getIs_progress();
            this.createdDate = entity.getCreatedDate();
            this.modifiedDate = entity.getModifiedDate();
        }
    }


}
