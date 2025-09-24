
package com.example.smartpayments.service;

import com.example.smartpayments.model.PaymentRequest;
import com.example.smartpayments.model.PaymentResponse;
import com.razorpay.RazorpayException;

public interface PaymentService {
    PaymentResponse createOrder(PaymentRequest request) throws RazorpayException;
}
