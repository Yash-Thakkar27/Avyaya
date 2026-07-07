package com.avyaya.service;

import com.avyaya.dto.AuthResponse;
import com.avyaya.dto.LoginRequest;
import com.avyaya.dto.RegisterRequest;
import com.avyaya.model.User;
import com.avyaya.repository.UserRepository;
import com.avyaya.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    /**
     * Register a new user
     * @param registerRequest user registration details
     * @return AuthResponse with JWT token
     * @throws RuntimeException if email already exists
     */
    public AuthResponse register(RegisterRequest registerRequest) {
        // Check if user already exists
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email address already in use!");
        }
        
        // Create new user
        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setAddress(registerRequest.getAddress());
        
        User result = userRepository.save(user);
        
        // Generate JWT token
        String jwt = tokenProvider.generateToken(result.getEmail());
        
        return new AuthResponse(jwt, result.getId(), result.getName(), result.getEmail());
    }
    
    /**
     * Authenticate user login
     * @param loginRequest user login credentials
     * @return AuthResponse with JWT token
     */
    public AuthResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(loginRequest.getEmail());
        
        User user = userRepository.findByEmail(loginRequest.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        return new AuthResponse(jwt, user.getId(), user.getName(), user.getEmail());
    }
}