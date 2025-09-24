
package com.example.smartpayments.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/webhook")
public class WebhookController {

    @PostMapping("/razorpay")
    public String handleRazorpayWebhook(@RequestBody Map<String, Object> payload) {
        // You can verify signature here and update order status
        System.out.println("Webhook received: " + payload);
        return "Webhook processed successfully";
    }
}
