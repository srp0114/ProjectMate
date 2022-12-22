package com.toy.projectmate.global.config.security.jwt.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.toy.projectmate.domain.user.Role;
import com.toy.projectmate.domain.user.User;
import com.toy.projectmate.domain.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class JwtServiceTest {

    @Autowired
    JwtService jwtService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    EntityManager em;

    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.access.header}")
    private String accessHeader;
    @Value("${jwt.refresh.header}")
    private String refreshHeader;

    private static final String ACCESS_TOKEN_SUBJECT = "AccessToken";
    private static final String REFRESH_TOKEN_SUBJECT = "RefreshToken";
    private static final String USERID_CLAIM = "userId";
    private static final String BEARER = "Bearer ";

    private String userId = "userId";

    @BeforeEach
    public void init(){
        User user = User.builder().studentId(userId).password("password").email("aa@aa").nickname("nick1").role(Role.USER).build();
        userRepository.save(user);
        em.flush();
        em.clear();
    }

    private DecodedJWT getVerify(String token) {
        return JWT.require(HMAC512(secret)).build().verify(token);
    }

    @Test
    public void createAccessToken_AccessToken_발급() throws Exception{
        String accessToken = jwtService.createAccessToken(userId);

        DecodedJWT verify = getVerify(accessToken);

        String subject = verify.getSubject();
        String findUserId = verify.getClaim(USERID_CLAIM).asString();

        assertThat(findUserId).isEqualTo(userId);
        assertThat(subject).isEqualTo(ACCESS_TOKEN_SUBJECT);
    }



}