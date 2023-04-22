package com.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GenerateEncode {
    public static void main(String[] args) {
        String passwordEncode = new BCryptPasswordEncoder().encode("Ssy123456789@");
        System.out.println("Password: " + passwordEncode );
    }
}
