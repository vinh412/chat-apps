package com.vinhdd.chatapi.repository;

import com.vinhdd.chatapi.model.user.User;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);

    @Query(value = "SELECT * FROM user WHERE email LIKE %:email%", nativeQuery = true)
    List<User> findAllByContainEmail(@Param("email") String email);
    Boolean existsByEmail(@NotBlank String email);

}