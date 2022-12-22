package com.toy.projectmate.domain.user;

import com.toy.projectmate.domain.BaseTimeEntity;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@Entity
@AllArgsConstructor
@Builder
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Long id;

    /*student_id, password, email, nickname, profile_image */

    @Column(nullable = false, length=20, unique = true)
    private String studentId;

    private String password;

    @Column(nullable = false, length=100)
    private String email;

    @Column(nullable = false, length=20)
    private String nickname;

    @Enumerated(EnumType.STRING)
    private Role role; // user, admin

    @Column(length=1000)
    private String refreshToken;

    public void updatePassword(PasswordEncoder passwordEncoder, String password){
        this.password = passwordEncoder.encode(password);
    }

    public void updateName(String studentId){
        this.studentId = studentId;
    }

    public void updateNickName(String nickname){
        this.nickname = nickname;
    }

    public void updateRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
    }

    public void destroyRefreshToken(){
        this.refreshToken = null;
    }

    //== 패스워드 암호화 ==//
    public void encodePassword(PasswordEncoder passwordEncoder){
        this.password = passwordEncoder.encode(password);
    }


}
