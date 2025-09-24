package com.example.smartpayments.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI apiDocs() {
        return new OpenAPI()
                .info(new Info()
                        .title("Smart Inventory Payments API")
                        .description("API documentation for Razorpay/Mock Payment Service")
                        .version("1.0"));
    }
}

