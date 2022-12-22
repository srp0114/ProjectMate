package com.toy.projectmate.service;

import com.toy.projectmate.domain.user.User;
import com.toy.projectmate.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByStudentId(username).orElseThrow(() ->new UsernameNotFoundException("아이디가 없습니다."));
        return org.springframework.security.core.userdetails.User.builder().username(user.getStudentId())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
    }
}
