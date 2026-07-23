package com.avyaya.config;

import com.avyaya.model.User;
import com.avyaya.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Seeds the admin user on first startup if it doesn't already exist.
 * Credentials: admin@avyaya.com / avyaya@admin2025
 */
@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByEmail("admin@avyaya.com")) {
            User admin = new User();
            admin.setName("Avyaya Admin");
            admin.setEmail("admin@avyaya.com");
            admin.setPassword(passwordEncoder.encode("avyaya@admin2025"));
            admin.setAddress("Mumbai, India");
            admin.setRole("ROLE_ADMIN");
            userRepository.save(admin);
            System.out.println("✅ Admin user seeded: admin@avyaya.com");
        }
    }
}
