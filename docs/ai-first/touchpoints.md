### 2) Touchpoint Specs

## 1. AI Support Assistance

### Problem Statement
Customers often ask simple questions like “Where is my order?” or “What’s the return policy?”. Handling these manually wastes support time. A Support Assistant can answer most of these automatically, reduce ticket load, and escalate only when needed.

### Happy Path
1. User submits a question in chat.
2. **User query is converted into embeddings** for AI understanding.  
3. **Bad word detection** runs → if triggered, safe response.  
4. **Planner/Router** classifies intent (FAQ, order-status, chit-chat).  
5. Query passes through **Redactor** (PII masking).
6. For FAQ: embedding retrieval (RAG) finds top-3 chunks.
7. For User's Orders Status: call "order-status" API.
8. Responder LLM generates draft answer.
9. **Validator** checks against retrieved text or API output.
10. If valid → send to user.  
11. If not valid → router tries fallback LLM.  
12. If still fails → escalate to human.  


### Grounding & Guardrails
- **Grounding sources**: FAQ markdown, policies, order-status API.  
- **Guardrails**:  
  - Redactor → PII removal.  
  - Bad word detection → safe reply.  
  - Off-topic → “Sorry, not in scope.”  
  - Validator → fact-check & schema enforcement.  
  - Rate limiting & monitoring.  

### Human-in-the-loop
- Trigger: validator confidence <0.7 even after fallback.  
- SLA: human replies in ≤10 minutes.  

### Latency Budget (≤1200 ms)
- Router + Redactor: 150 ms  
- Embedding + retrieval: 200 ms  
- API call: 200 ms  
- Responder: 400 ms  
- Validator + rendering: 250 ms  
= **~1200 ms**  

### Error & Fallback Behavior
- Retrieval fails → escalate.  
- API down → apology + escalate.  
- Validator fails → bigger LLM → escalate.  

### PII Handling
- **Redactor component** masks sensitive info.  
- Only order IDs sent to API.  
- Logs stored with placeholders; removed after 30 days.  

### Success Metrics
- Product: AI resolution rate = resolved_ai / total_queries.  
- Product: Avg latency ≤1200 ms.  
- Business: Support contact rate decreased.  

### Feasibility Note
FAQ + order-status API exist. 
Next step: prototype Redactor + RAG pipeline with fallback routing in casde of problems.


## 2. Multi-lingual Search

### Problem Statement
Many customers search in Arabic, French, or other languages. Today, these queries often fail. Multi-lingual Search lets users type naturally, detects the language, and maps it to the catalog, improving accessibility and conversions.

### Happy Path
1. User enters query in any language.
2. **User query is converted into embeddings** for AI understanding. 
3. **Bad word detection** runs → safe block if needed.  
4. Query passes through **Redactor component** (masks accidental PII).  
5. Language detector identifies source language.  
6. **Embedding step**: normalized query converted into embeddings.  
7. Retrieval (RAG) finds matching catalog entries.  
8. Responder ranks top-5 results.  
9. **Validator** ensures results exist in catalog.  
10. If valid → display to user.  
11. If not valid → fallback to English search.  
12. Logs stored anonymized.  

### Grounding & Guardrails
- **Grounding sources**: product titles, tags, categories (catalog metadata).  
- **Guardrails**:  
  - Redactor → PII removal.  
  - Bad word detection → block unsafe input.  
  - Validator → confirm results exist in catalog.  
  - Rate limiting & monitoring.  

### Human-in-the-loop
- Trigger: frequent “no results” queries.  
- SLA: product team reviews weekly.  

### Latency Budget (≤500 ms)
- Redactor + language detection: 100 ms  
- Embedding search: 200 ms  
- Ranking/filtering: 150 ms  
- Rendering: 50 ms  
= **~500 ms**  

### Error & Fallback Behavior
- Detector fails → fallback to English search.  
- Vector DB down → fallback to backup Dbs.  

### PII Handling
- **Redactor component** removes PII from queries.  
- Logs anonymized and accumulated.  

### Success Metrics
- Product: Zero-results rate dicreased.  
- Product: Search CTR (Click through Rate) increased.  
- Business: Conversion uplift = orders_with_multilingual / baseline_orders.  

### Feasibility Note
Catalog metadata already available. 
Next step: test small set of queries with embeddings + lightweight language detector.
