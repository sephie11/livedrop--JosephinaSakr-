### 1) AI Capability Map


| Capability             | Intent (user)                                      | Inputs (this sprint)                              | Risk 1–5 | p95 ms | Est. cost/action | Fallback                               | Selected |
|------------------------|----------------------------------------------------|----------------------------------------------|---------:|-------:|-----------------:|----------------------------------------|:-------:|
| AI Support Assistant   | “Answer User's question (EX: where’s my order?)    | Policies/FAQ markdown; order-status API; Redactor | 2        | 1200 |           ~$0.18  | Router → bigger LLM, else escalate     |Selected  |
| Review Summarization   | “Show list of reviews”                             | Product reviews corpus; Redactor                  | 3        | 1200 |          ~$0.004  | Show top helpful reviews; escalate if needed |   |
| AI Search Typeahead    | “ Ai Suggest what user is trying to search, fast”  | Product titles, tags, categories                  | 3        | 300  |        ~$0.0065   | Default prefix DB suggestions          |         |
| Product Q&A            | “Is it compatible/vegan/size guide?”               | Product attributes + descriptions                 | 4        | 2000 |           ~$0.01  | Link to FAQ section                    |         |
| Multi-lingual Search   | “Search in user's wanted language”                 | Catalog metadata; language detector               | 4        | 500  |         ~$0.003   | Fallback to English search             |Selected |

---
## Why these two

I picked **AI Support Assistant** and **Multi-lingual Search** because they directly make the shopping experience smoother while keeping risk low.  

- **Support Assistant** takes pressure off the support team by answering FAQs and order-status questions automatically, reducing the overall contact rate.  
- **Multi-lingual Search** makes the catalog easier to use for customers who prefer Arabic, French, or other languages, which can boost conversion by helping more people find what they want.  

Both rely on data and tools we already have, simple to use, and have a safe fallback path if something goes wrong.
