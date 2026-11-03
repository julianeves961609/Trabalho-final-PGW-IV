package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.DTOs.UserDTO;
import com.example.demo.models.UserModel;
import com.example.demo.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // buscar todos os usuarios
    public List<UserModel> getAllUsers() {
        return repository.findAll();
    }

    // buscar somente 1 usuario
    public UserModel find(Integer id) {
        Optional<UserModel> user = repository.findById(id);
        return user.orElse(null);
    }

    // inserir um usuario (a partir do UserModel)
    public UserModel insert(UserModel user) {
        user.setSenha(passwordEncoder.encode(user.getSenha())); // criptografa
        return repository.save(user);
    }

    // inserir um usuario (a partir do UserDTO)
    public UserModel insert(UserDTO dto) {
        UserModel model = new UserModel();
        model.setNome(dto.getNome());
        model.setEmail(dto.getEmail());
        model.setSenha(passwordEncoder.encode(dto.getSenha())); // criptografa
        model.setTipo(dto.getTipo());
        return repository.save(model);
    }

    // atualizar usuario (a partir do UserModel)
    public UserModel update(UserModel user) {
        try {
            UserModel existeUser = find(user.getId());

            if (existeUser == null) {
                return null;
            }

            if (user.getNome() != null) {
                existeUser.setNome(user.getNome());
            }

            if (user.getEmail() != null) {
                existeUser.setEmail(user.getEmail());
            }

            if (user.getSenha() != null) {
                existeUser.setSenha(passwordEncoder.encode(user.getSenha())); // criptografa
            }

            if (user.getTipo() != null) {
                existeUser.setTipo(user.getTipo());
            }

            return repository.save(existeUser);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // atualizar usuario (a partir do UserDTO)
    public UserModel update(UserDTO dto) {
        try {
            UserModel existeUser = find(dto.getId());

            if (existeUser == null) {
                return null;
            }

            if (dto.getNome() != null) {
                existeUser.setNome(dto.getNome());
            }

            if (dto.getEmail() != null) {
                existeUser.setEmail(dto.getEmail());
            }

            if (dto.getSenha() != null) {
                existeUser.setSenha(passwordEncoder.encode(dto.getSenha())); // criptografa
            }

            if (dto.getTipo() != null) {
                existeUser.setTipo(dto.getTipo());
            }

            return repository.save(existeUser);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // apagar usuario
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}