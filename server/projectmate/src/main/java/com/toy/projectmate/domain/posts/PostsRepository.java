package com.toy.projectmate.domain.posts;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PostsRepository extends JpaRepository<Posts, Long> {
    @Override
    Page<Posts> findAll(Pageable pageable);

    @Modifying
    @Query("update Posts p set p.view_count = p.view_count+1 where p.id =:id")
    int updateViewCount(Long id);
}
