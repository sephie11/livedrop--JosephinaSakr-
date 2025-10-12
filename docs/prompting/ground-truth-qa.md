# Shoplite Ground Truth Q&A

---

### Q01: How do I create a seller account on Shoplite?
**Expected retrieval context:** Document 1: User Registration & Account Management + Document 8: Seller Account Setup & Management  
**Authoritative answer:** To create a seller account, start with a buyer account, then upgrade through the **Seller Setup** page. Provide business details (legal name, tax ID, bank account) and upload documents in the **Verification Center**. Approval usually takes **2–3 business days**.  
**Required keywords in LLM response:** ["Seller Setup", "Verification Center", "2–3 business days"]  
**Forbidden content:** ["instant approval", "no verification needed"]

---

### Q02: What factors influence search result ranking on Shoplite?
**Expected retrieval context:** Document 2: Product Search & Filtering Features  
**Authoritative answer:** Search ranking considers **query relevance**, **seller quality signals**, **in-stock status**, and **recent sales momentum**. Buyers can also sort by price, rating, newest, or relevance.  
**Required keywords in LLM response:** ["relevance", "seller quality", "in-stock", "sales momentum"]  
**Forbidden content:** ["random order", "sponsored only"]

---

### Q03: Can I apply a promotional code during checkout?
**Expected retrieval context:** Document 3: Shopping Cart & Checkout Process + Document 15: Promotional Codes & Discounts  
**Authoritative answer:** Yes, promo codes are applied on the **Review step** of checkout. Some codes require a **minimum cart value**, apply only to certain categories, or are **non-stackable**.  
**Required keywords in LLM response:** ["Review step", "minimum cart value", "stackable/non-stackable"]  
**Forbidden content:** ["apply after payment"]

---

### Q04: What happens if my address is incorrect during checkout?
**Expected retrieval context:** Document 3: Shopping Cart & Checkout Process + Document 5: Order Tracking & Delivery  
**Authoritative answer:** Shoplite performs **postal code validation** and address normalization at checkout. If an address is invalid, buyers are prompted to correct it before the order can continue. Incorrect addresses are the most common cause of delivery delays.  
**Required keywords in LLM response:** ["postal code validation", "address normalization", "delivery delay"]  
**Forbidden content:** ["orders ship without checks"]

---

### Q05: How does Shoplite handle potentially fraudulent orders?
**Expected retrieval context:** Document 4: Payment Methods & Security  
**Authoritative answer:** Fraud detection uses device fingerprinting, velocity limits, and behavior patterns. High-risk orders may be flagged for **step-up verification** or placed on **manual review** before shipping.  
**Required keywords in LLM response:** ["step-up verification", "manual review", "high-risk orders"]  
**Forbidden content:** ["no fraud checks"]

---

### Q06: When are seller payouts sent?
**Expected retrieval context:** Document 4: Payment Methods & Security  
**Authoritative answer:** Payouts are usually sent **weekly** to the seller’s verified bank account. New or high-risk sellers may face a **reserve** to cover potential refunds or chargebacks.  
**Required keywords in LLM response:** ["weekly", "reserve", "chargebacks"]  
**Forbidden content:** ["daily guaranteed payout"]

---

### Q07: How do I track an order after it has shipped?
**Expected retrieval context:** Document 5: Order Tracking & Delivery  
**Authoritative answer:** Buyers receive an **Order ID** and tracking link on the Orders page and by email. Tracking events include *Picked Up*, *In Transit*, *Out for Delivery*, and *Delivered*. Split shipments each have their own tracking number.  
**Required keywords in LLM response:** ["Order ID", "tracking link", "In Transit"]  
**Forbidden content:** ["no tracking available"]

---

### Q08: What is the return policy for most items?
**Expected retrieval context:** Document 6: Return & Refund Policies  
**Authoritative answer:** Shoplite offers a **30-day return window** starting from delivery. Buyers must request a **Return Authorization (RA)**, and approved returns are refunded to the original payment method. Certain items like digital goods or hygiene products are non-returnable unless defective.  
**Required keywords in LLM response:** ["30-day return window", "Return Authorization", "original payment method"]  
**Forbidden content:** ["lifetime returns", "no returns accepted"]

---

### Q09: How are product reviews verified?
**Expected retrieval context:** Document 7: Product Reviews & Ratings  
**Authoritative answer:** Reviews marked **Verified Purchase** come from accounts with a completed order. Shoplite moderates reviews to remove prohibited content and allows buyers to edit once within 30 days.  
**Required keywords in LLM response:** ["Verified Purchase", "moderation", "edit within 30 days"]  
**Forbidden content:** ["sellers can edit reviews"]

---

### Q10: What business details are required for seller onboarding?
**Expected retrieval context:** Document 8: Seller Account Setup & Management  
**Authoritative answer:** Sellers must provide a legal business name, registration or tax ID, business address, contact details, and a matching bank account. Beneficial owners may also need ID verification.  
**Required keywords in LLM response:** ["tax ID", "business address", "bank account"]  
**Forbidden content:** ["no documents required"]

---

### Q11: How can sellers update stock automatically?
**Expected retrieval context:** Document 9: Inventory Management for Sellers  
**Authoritative answer:** Sellers can update stock via **bulk CSV uploads**, the **Seller API**, or **webhooks** for real-time synchronization. Low-stock alerts are also available.  
**Required keywords in LLM response:** ["bulk CSV", "Seller API", "webhooks"]  
**Forbidden content:** ["stock updates are manual only"]

---

### Q12: What fees does Shoplite charge sellers?
**Expected retrieval context:** Document 10: Commission, Fees & Invoices  
**Authoritative answer:** Shoplite charges a **final value fee** and a **payment processing fee**. Sellers can download monthly **statements and invoices** to review charges.  
**Required keywords in LLM response:** ["final value fee", "payment processing fee", "monthly statements"]  
**Forbidden content:** ["no fees"]

---

### Q13: How do buyers contact support?
**Expected retrieval context:** Document 11: Customer Support Procedures  
**Authoritative answer:** Buyers can contact support through the Help Center, live chat, or email. Sensitive account changes require verification, and disputes are encouraged to start in the **order message thread**.  
**Required keywords in LLM response:** ["Help Center", "live chat", "order message thread"]  
**Forbidden content:** ["no support available"]

---

### Q14: What features are included in the Shoplite mobile app?
**Expected retrieval context:** Document 12: Mobile App Features  
**Authoritative answer:** The app supports **biometric login**, push notifications for orders and price drops, barcode scanning, offline cart sync, and in-app messaging with sellers. Sellers can adjust stock and respond to buyers directly from the app.  
**Required keywords in LLM response:** ["biometric login", "push notifications", "barcode scanning"]  
**Forbidden content:** ["web only", "no seller features"]

---

### Q15: How do developers integrate with Shoplite?
**Expected retrieval context:** Document 13: Developer API Overview  
**Authoritative answer:** Developers use the API with authentication keys and **HMAC signatures**. Rate limits apply, and **webhooks** notify about order updates. A sandbox environment is available for testing.  
**Required keywords in LLM response:** ["API keys", "HMAC signatures", "webhooks"]  
**Forbidden content:** ["no rate limits"]

---

### Q16: What privacy rights do users have on Shoplite?
**Expected retrieval context:** Document 14: Security & Privacy Policies  
**Authoritative answer:** Users can view, edit, and export their personal data, and request deletion (with retention limits for legal compliance). All data is encrypted, and incidents follow a formal response process.  
**Required keywords in LLM response:** ["export", "request deletion", "encrypted"]  
**Forbidden content:** ["data sold to advertisers"]

---

### Q17: How do promo codes work at checkout?
**Expected retrieval context:** Document 15: Promotional Codes & Discounts + Document 3: Shopping Cart & Checkout Process  
**Authoritative answer:** Promo codes are applied during the **Review step** before payment. Some codes require a minimum cart value or are non-stackable. Abusive use may lead to account review.  
**Required keywords in LLM response:** ["Review step", "minimum cart value", "non-stackable"]  
**Forbidden content:** ["promo codes after payment"]

---

### Q18: How does Shoplite ensure system security?
**Expected retrieval context:** Document 14: Security & Privacy Policies  
**Authoritative answer:** Shoplite uses HTTPS for all traffic, encrypts sensitive data, trains employees in security practices, and has an incident response plan. Researchers can report vulnerabilities responsibly.  
**Required keywords in LLM response:** ["HTTPS", "encryption", "incident response plan"]  
**Forbidden content:** ["no security measures"]

---

### Q19: What are the benefits of using Fulfilled by Shoplite?
**Expected retrieval context:** Document 9: Inventory Management for Sellers + Document 5: Order Tracking & Delivery  
**Authoritative answer:** Fulfilled by Shoplite lets sellers send stock to Shoplite warehouses, where items are stored, packed, and shipped with guaranteed SLAs. Inventory cycle counts and low-stock alerts improve reliability.  
**Required keywords in LLM response:** ["warehouses", "SLAs", "inventory cycle counts"]  
**Forbidden content:** ["no seller involvement needed"]

---

### Q20: What happens if a buyer abuses return policies?
**Expected retrieval context:** Document 6: Return & Refund Policies  
**Authoritative answer:** Repeated abuse, such as excessive returns or false claims, may trigger **account review** under Shoplite’s Trust & Safety rules. Sellers can upload evidence, and buyers may face restrictions.  
**Required keywords in LLM response:** ["account review", "Trust & Safety", "restrictions"]  
**Forbidden content:** ["buyers can always return anything"]
