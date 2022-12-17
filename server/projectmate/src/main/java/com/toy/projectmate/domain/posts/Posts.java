package com.toy.projectmate.domain.posts;

import com.toy.projectmate.domain.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Posts extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String writer;
    @Column(length = 500, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(length = 100, nullable = false)
    private String subject;

    @Column(nullable = false)
    private String division;

    @Column(nullable = false)
    private int people_num;

    @Column(columnDefinition = "TINYINT", length = 1)
    private int proceed_way;

    @Column(columnDefinition = "TINYINT", length = 1)
    private int is_progress;

    @Column(columnDefinition = "integer default 0", nullable=false)
    private int view_count;

    @Column(columnDefinition = "integer default 0", nullable = false)
    private int mark_count;

    @Builder
    public Posts(String writer, String title, String content, String subject, String division, int people_num, int proceed_way, int is_progress) {
        this.writer = writer;
        this.title = title;
        this.content = content;
        this.subject = subject;
        this.division = division;
        this.people_num = people_num;
        this.proceed_way = proceed_way;
        this.is_progress = is_progress;
    }

    public void update(String title, String content, String subject, String division, int people_num, int proceed_way, int is_progress){
        this.title = title;
        this.content = content;
        this.subject = subject;
        this.division = division;
        this.people_num = people_num;
        this.proceed_way = proceed_way;
        this.is_progress = is_progress;
    }
}
