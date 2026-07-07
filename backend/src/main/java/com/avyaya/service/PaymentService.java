package com.avyaya.service;

import com.avyaya.dto.PaymentRequest;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {
    
    @Value("${razorpay.key.id}")
    private String razorpayKeyId;
    
    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;
    
    private RazorpayClient razorpayClient;
    
    /**
     * Initialize Razorpay client
     */
    private void initializeRazorpayClient() throws RazorpayException {
        if (razorpayClient == null) {
            razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
        }
    }
    
    /**
     * Create Razorpay order
     * @param paymentRequest the payment details
     * @return Map containing order details
     * @throws RazorpayException if order creation fails
     */
    public Map<String, String> createOrder(PaymentRequest paymentRequest) throws RazorpayException {
        initializeRazorpayClient();
        
        // Convert amount to paisa (smallest currency unit)
        int amountInPaisa = paymentRequest.getAmount().multiply(new BigDecimal(100)).intValue();
        
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amountInPaisa);
        orderRequest.put("currency", paymentRequest.getCurrency());
        orderRequest.put("receipt", "order_" + System.currentTimeMillis());
        
        Order order = razorpayClient.orders.create(orderRequest);
        
        Map<String, String> response = new HashMap<>();
        response.put("orderId", order.get("id"));
        response.put("amount", order.get("amount").toString());
        response.put("currency", order.get("currency"));
        response.put("key", razorpayKeyId);
        
        return response;
    }
    
    /**
     * Verify Razorpay payment signature
     * @param orderId the Razorpay order ID
     * @param paymentId the Razorpay payment ID
     * @param signature the payment signature
     * @return true if signature is valid, false otherwise
     */
    public boolean verifyPaymentSignature(String orderId, String paymentId, String signature) {
        try {
            String generatedSignature = hmacSha256(orderId + "|" + paymentId, razorpayKeySecret);
            return generatedSignature.equals(signature);
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Generate HMAC SHA256 signature
     * @param data the data to sign
     * @param key the secret key
     * @return the generated signature
     * @throws Exception if signing fails
     */
    private String hmacSha256(String data, String key) throws Exception {
        Mac sha256Hmac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(), "HmacSHA256");
        sha256Hmac.init(secretKey);
        
        byte[] hash = sha256Hmac.doFinal(data.getBytes());
        StringBuilder result = new StringBuilder();
        for (byte b : hash) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }
    
    /**
     * Get payment details from Razorpay
     * @param paymentId the Razorpay payment ID
     * @return Map containing payment details
     * @throws RazorpayException if fetching payment fails
     */
    public Map<String, Object> getPaymentDetails(String paymentId) throws RazorpayException {
        initializeRazorpayClient();
        
        com.razorpay.Payment payment = razorpayClient.payments.fetch(paymentId);
        
        Map<String, Object> paymentDetails = new HashMap<>();
        paymentDetails.put("id", payment.get("id"));
        paymentDetails.put("amount", payment.get("amount"));
        paymentDetails.put("currency", payment.get("currency"));
        paymentDetails.put("status", payment.get("status"));
        paymentDetails.put("order_id", payment.get("order_id"));
        paymentDetails.put("method", payment.get("method"));
        paymentDetails.put("created_at", payment.get("created_at"));
        
        return paymentDetails;
    }
}