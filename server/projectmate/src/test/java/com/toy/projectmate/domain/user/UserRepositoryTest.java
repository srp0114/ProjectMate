package com.toy.projectmate.domain.user;

import org.junit.After;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertThrows;

@SpringBootTest
@Transactional
class UserRepositoryTest {
        @Autowired
        UserRepository userRepository;

        @Autowired
        EntityManager em;

        @AfterEach
        private void cleanup(){ em.clear(); }

        @Test
        public void 회원_저장하기() throws Exception{

                // given
                User user = User.builder()
                        .studentId("202020")
                        .password("password")
                        .email("sss@sss.ss")
                        .nickname("member1")
                        .role(Role.USER)
                        .build();

                // when
                User savedUser = userRepository.save(user);

                // then
                User findUser = userRepository.findById(savedUser.getId()).orElseThrow(() ->new RuntimeException("저장된 사용자가 없습니다."));

                assertThat(findUser).isEqualTo(savedUser);
                assertThat(findUser).isSameAs(user);

        }

        @Test
        public void 회원가입시_빠진_항목_존재() throws Exception{
                // given
                // 아이디 없을 시
                User user = User.builder()
                        .password("password")
                        .email("sss@sss.ss")
                        .nickname("member1")
                        .role(Role.USER)
                        .build();

                //when, then
                assertThrows(Exception.class, () -> userRepository.save(user));
        }

        @Test
        public void 회원가입시_중복된_아이디_검사() throws Exception{
                // given
                User user1 = User.builder()
                        .studentId("202020")
                        .password("password1")
                        .email("aa@sss.ss")
                        .nickname("member1")
                        .role(Role.USER)
                        .build();

                User user2 = User.builder()
                        .studentId("202020")
                        .password("password2")
                        .email("bb@sss.ss")
                        .nickname("member2")
                        .role(Role.USER)
                        .build();

                userRepository.save(user1);

                assertThrows(Exception.class, () -> userRepository.save(user2));
        }


}