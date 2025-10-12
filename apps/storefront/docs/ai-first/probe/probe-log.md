# Probe Log – Support Assistant & Multi-lingual Search  

---

## Probe: Support Assistant

**Query:** "Where is my order #12345?"  
- Router → intent classified as: order-status 
- Redactor → masked PII → "order #<ID>"  
- Embedding retrieval → skipped (API intent)  
- API call → order-status API returned "Shipped, in 3 days"  
- Responder → generated: "Your order has shipped and should arrive in 3 days."  
- Validator → PASS (grounded in API response)  

**Latency Breakdown:**  
- Router + Redactor: 120 ms  
- API call: 180 ms  
- Responder: 420 ms  
- Validator + render: 200 ms  
**Total:** ~920 ms (≤ 1200 ms target reached)

---

## Probe: Multi-lingual Search

**Query:** "chaussures de sport" (French for “sport shoes”)  
- Redactor → no PII found  
- Language detector → identified fr (French)  
- Embedding step → query embedded → vector DB search  
- Retrieval → top-3 results: [“Running Shoes”, “Tennis Shoes”, “Sneakers”]  
- Responder → ranked and returned top-3  
- Validator → PASS (all items exist in catalog)  

**Latency Breakdown:**  
- Redactor + detection: 90 ms  
- Embedding + retrieval: 210 ms  
- Ranking: 140 ms  
- Rendering: 40 ms  
**Total:** ~480 ms (≤ 500 ms target reached)

---

## Summary

- **Support Assistant**: met latency target, successfully grounded to API.  
- **Multi-lingual Search**: met latency target, validated catalog matches.  
- Both touchpoints worked and showed feasability
