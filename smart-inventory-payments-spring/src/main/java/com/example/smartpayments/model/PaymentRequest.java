package com.example.smartpayments.model;

import lombok.Data;

@Data
public class PaymentRequest {
    private Double amount;
    private String currency;
    private String receiptId;
}
