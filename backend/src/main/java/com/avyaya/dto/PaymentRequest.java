package com.avyaya.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class PaymentRequest {
    
    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    private BigDecimal amount;
    
    private String currency = "INR";
    
    // Default constructor
    public PaymentRequest() {}
    
    // Constructor
    public PaymentRequest(BigDecimal amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }
    
    // Getters and Setters
    public BigDecimal getAmount() {
        return amount;
    }
    
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    
    public String getCurrency() {
        return currency;
    }
    
    public void setCurrency(String currency) {
        this.currency = currency;
    }
}