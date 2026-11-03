package com.example.demo.security;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.demo.models.UserModel;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    // cria o token com e-mail, perfil e data de expiração
    public String gerarToken(UserModel user) {
        Date agora = new Date();
        return JWT.create()
                .withSubject(user.getEmail())
                .withClaim("role", user.getTipo())
                .withIssuedAt(agora)
                .withExpiresAt(new Date(agora.getTime() + expiration))
                .sign(Algorithm.HMAC256(secret));
    }

    // confere assinatura e validade (lança exceção se for inválido ou expirado)
    public DecodedJWT decodificar(String token) {
        return JWT.require(Algorithm.HMAC256(secret))
                .build()
                .verify(token);
    }

    // true se o token é válido e não expirou
    public boolean tokenValido(String token) {
        try {
            decodificar(token);
            return true;
        } catch (JWTVerificationException e) {
            return false;
        }
    }
}