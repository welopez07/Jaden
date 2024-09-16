package com.jaden_detalles.jaden.service;

import com.jaden_detalles.jaden.model.Role;
import com.jaden_detalles.jaden.model.User;
import com.jaden_detalles.jaden.repository.IRoleRepository;
import com.jaden_detalles.jaden.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private IUserRepository iUserRepository;
    @Autowired
    private IRoleRepository iRoleRepository;

    public User registerUser(String name, String email, String password, String roleName){
        Role role = IRoleRepository.findByName(roleName).orElseThrow(()-> new RuntimeException("Role not found"));

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);

        return IUserRepository.save(user);
    }

    public List<User> detAllUsers(){
        return IUserRepository.findAll();
    }

    public User updateUser(Long id, User updateUser){
        return IUserRepository.findById(id).map(user ->{
            user.setName(updateUser.getName());
            user.setEmail(updateUser.getEmail());
            user.setPassword(updateUser.getPassword());
            user.setRole(updateUser.getRole());
            return IUserRepository.save(user);
        }).orElseThrow(()-> new RuntimeException("User not found"))
    }

    public void deleteUser (long id){
        IUserRepository.deleteById(id);
    }






}
