# RAG System Evaluation

---

## Retrieval Quality Tests (10)
| Test ID | Question | Expected Documents | Pass Criteria |
|---------|----------|--------------------|---------------|
| R01 | How do I create a seller account? | [User Registration & Account Management; Seller Account Setup & Management] | Both docs appear in retrieved results |
| R02 | What factors affect search ranking? | [Product Search & Filtering Features] | Correct doc appears in top-k |
| R03 | Where can I apply a promo code? | [Shopping Cart & Checkout Process; Promotional Codes & Discounts] | Both docs retrieved |
| R04 | How does Shoplite detect fraud? | [Payment Methods & Security] | Correct doc retrieved |
| R05 | When are seller payouts sent? | [Payment Methods & Security] | Correct doc retrieved |
| R06 | How does address validation work? | [Shopping Cart & Checkout Process; Order Tracking & Delivery] | At least one doc retrieved |
| R07 | How are duplicate listings handled? | [Product Search & Filtering Features] | Correct doc retrieved |
| R08 | What is the return window? | [Return & Refund Policies] | Correct doc retrieved |
| R09 | How do reviews get verified? | [Product Reviews & Ratings] | Correct doc retrieved |
| R10 | What details are required for seller onboarding? | [Seller Account Setup & Management] | Correct doc retrieved |

---

## Response Quality Tests (15)
| Test ID | Question | Required Keywords | Forbidden Terms | Expected Behavior |
|---------|----------|-------------------|-----------------|------------------|
| Q01 | Seller account creation | ["Seller Setup","Verification Center","2–3 business days"] | ["instant approval"] | Accurate step-by-step answer |
| Q02 | Search ranking | ["relevance","seller quality","in-stock","sales momentum"] | ["random order"] | Answer lists all key factors |
| Q03 | Promo code application | ["Review step","minimum cart value","non-stackable"] | ["after payment"] | Clear checkout explanation |
| Q04 | Fraud checks | ["step-up verification","manual review","high-risk orders"] | ["no fraud checks"] | Answer mentions fraud workflow |
| Q05 | Payouts | ["weekly","reserve","chargebacks"] | ["daily guaranteed payout"] | Correct payout policy |
| Q06 | Address validation | ["postal code validation","address normalization"] | ["no checks"] | Answer highlights validation |
| Q07 | Order tracking | ["Order ID","tracking link","In Transit"] | ["no tracking"] | Clear tracking explanation |
| Q08 | Return policy | ["30-day return window","Return Authorization","original payment method"] | ["lifetime returns"] | Correct return policy |
| Q09 | Reviews | ["Verified Purchase","moderation","edit within 30 days"] | ["sellers can edit"] | Clear review rules |
| Q10 | Fees | ["final value fee","payment processing fee","monthly statements"] | ["no fees"] | Correct fee structure |
| Q11 | Mobile app features | ["biometric login","push notifications","barcode scanning"] | ["web only"] | Answer highlights app features |
| Q12 | API integration | ["API keys","HMAC signatures","webhooks"] | ["no rate limits"] | Correct API explanation |
| Q13 | Privacy rights | ["export","request deletion","encrypted"] | ["data sold"] | Answer explains rights clearly |
| Q14 | Fulfilled by Shoplite | ["warehouses","SLAs","inventory cycle counts"] | ["no seller involvement"] | Clear logistics answer |
| Q15 | Return abuse | ["account review","Trust & Safety","restrictions"] | ["always return"] | Answer warns about abuse |

---

## Edge Case Tests (5)
| Test ID | Scenario | Expected Response Type |
|---------|----------|-----------------------|
| E01 | User asks about a feature not in KB (e.g., “Shoplite flight booking”) | Refusal with polite message |
| E02 | Ambiguous query (“How do I sign up?”) | Clarification request (buyer or seller?) |
| E03 | Conflicting snippets retrieved | Prefer specific/most relevant doc |
| E04 | Empty query | Return error or ask user to provide a question |
| E05 | Overly broad query (“Tell me everything about Shoplite”) | Summarize + suggest narrowing |
