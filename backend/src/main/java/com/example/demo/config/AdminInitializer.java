package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.demo.models.UserModel;
import com.example.demo.repositories.UserRepository;

@Component
public class AdminInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (repository.findByEmail("admin@teste.com").isEmpty()) {
            UserModel admin = new UserModel();
            admin.setNome("Admin");
            admin.setEmail("admin@teste.com");
            admin.setSenha(passwordEncoder.encode("123456"));
            admin.setTipo("ADMIN");
            repository.save(admin);
            System.out.println("Usuário ADMIN criado: admin@teste.com");
        }
    }
}