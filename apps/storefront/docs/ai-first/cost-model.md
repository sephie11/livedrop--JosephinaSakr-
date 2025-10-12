# Cost Model

## Assumptions
- Support Assistant model: GPT-4o-mini at $0.15 / 1K prompt tokens, $0.60 / 1K completion tokens  
- Multi-lingual Search model: Llama 3.1 8B Instruct via OpenRouter at $0.05 / 1K prompt tokens, $0.20 / 1K completion tokens  
- Support Assistant avg tokens: in 300, out 150  
- Multi-lingual Search avg tokens: in 40, out 20  
- Requests/day: Support Assistant 1,000 (30% cached); Multi-lingual Search 20,000 (70% cached)  

---

## Support Assistant (GPT-4o-mini)

### Calculation
Cost/action = (300/1000 × 0.15) + (150/1000 × 0.60)  
= (0.045) + (0.090)  
= **$0.135 per uncached action**

Daily cost = 0.135 × 1000 × (1 – 0.3)  
= 0.135 × 700  
= **$94.50/day**

### Results
- Cost/action = **$0.135**  
- Daily = **$94.50**

### Cost Lever
Use a smaller/cheaper responder model for most queries, only escalate to GPT-4o-mini if validator confidence is low.

---

## Multi-lingual Search (Llama 3.1 8B)

### Calculation
Cost/action = (40/1000 × 0.05) + (20/1000 × 0.20)  
= (0.002) + (0.004)  
= **$0.006 per uncached action**

Daily cost = 0.006 × 20,000 × (1 – 0.7)  
= 0.006 × 6000  
= **$36/day**

### Results
- Cost/action = **$0.006**  
- Daily = **$36**
  
### Cost Lever
Increase cache hit rate to 80% for popular queries, or reduce tokens by shortening the context.
