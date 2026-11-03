package com.example.demo.DTOs;

import com.fasterxml.jackson.annotation.JsonAlias;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDTO {
    private String email;

    @JsonAlias("password")
    private String senha;
}