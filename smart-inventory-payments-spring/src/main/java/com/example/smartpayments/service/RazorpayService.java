package com.example.smartpayments.service;

import com.example.smartpayments.model.PaymentRequest;
import com.example.smartpayments.model.PaymentResponse;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RazorpayService {

    private final RazorpayClient client;

    public RazorpayService(
            @Value("${razorpay.key}") String apiKey,
            @Value("${razorpay.secret}") String apiSecret) throws Exception {
        this.client = new RazorpayClient(apiKey, apiSecret);
    }

    public PaymentResponse createOrder(PaymentRequest request) throws Exception {
        JSONObject options = new JSONObject();
        options.put("amount", request.getAmount() * 100); // convert to paise
        options.put("currency", request.getCurrency());
        options.put("receipt", request.getReceiptId());

        Order order = client.Orders.create(options);

        return new PaymentResponse(
                order.get("id"),
                order.get("status"),
                order.get("amount"),
                order.get("currency")
        );
    }
}
