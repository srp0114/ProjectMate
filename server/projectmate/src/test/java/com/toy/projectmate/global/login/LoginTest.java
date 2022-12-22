package com.toy.projectmate.global.login;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.toy.projectmate.domain.user.Role;
import com.toy.projectmate.domain.user.User;
import com.toy.projectmate.domain.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
public class LoginTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    UserRepository userRepository;

    @Autowired
    EntityManager em;

    PasswordEncoder delegatingPasswordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    ObjectMapper objectMapper = new ObjectMapper();

    private static String KEY_USERNAME = "username";
    private static String KEY_PASSWORD = "password";
    private static String USERID = "userID";
    private static String PASSWORD = "123456789";
    private static String LOGIN_URL ="/login";

    private void clear(){
        em.flush();
        em.clear();
    }

    @BeforeEach
    private void init(){
        userRepository.save(User.builder()
                .studentId(USERID)
                .password(delegatingPasswordEncoder.encode(PASSWORD))
                .nickname("nickname1")
                .email("aa@aa")
                .role(Role.USER)
                .build());
        clear();
    }

    private Map getUserIdPasswordMap(String userId, String password){
        Map<String, String> map = new HashMap<>();
        map.put(KEY_USERNAME, userId);
        map.put(KEY_PASSWORD, password);
        return map;
    }

    private ResultActions perform(String url, MediaType mediaType, Map usernamePasswordMap) throws Exception {
        return mockMvc.perform(MockMvcRequestBuilders
                .post(url)
                .contentType(mediaType)
                .content(objectMapper.writeValueAsString(usernamePasswordMap)));

    }

    @Test
    public void 로그인_성공() throws Exception{
        // given
        Map<String, String> map = getUserIdPasswordMap(USERID, PASSWORD);

        // when
        MvcResult result = perform(LOGIN_URL, MediaType.APPLICATION_JSON, map)
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();
    }

}
