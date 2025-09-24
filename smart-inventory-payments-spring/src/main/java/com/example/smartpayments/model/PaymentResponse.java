package com.example.smartpayments.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaymentResponse {
    private String orderId;
    private String status;
    private Double amount;
    private String currency;
}

