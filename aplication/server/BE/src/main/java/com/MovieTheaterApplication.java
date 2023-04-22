package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import org.springframework.transaction.annotation.EnableTransactionManagement;
@SpringBootApplication(scanBasePackages = "com")
@EnableJpaRepositories
@EnableTransactionManagement
public class MovieTheaterApplication extends SpringBootServletInitializer {

        public static void main(String[] args) {
        SpringApplicationBuilder app = new SpringApplicationBuilder(MovieTheaterApplication.class);
        app.run();
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(MovieTheaterApplication.class);
    }

}
