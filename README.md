# livedrop--JosephinaSakr-

# Live Drops — Flash-Sale & Follow Platform
**Diagram:** https://excalidraw.com/#json=6dKKVv5lgrbjZKeBTJuVP,Elj9Pq_RR3VniFbqKfk1NA

---

## 1) Overview

This project designs a scalable flash-sale & follow platform where creators launch live drops with limited stock and users can follow creators, browse products, and order in real-time.  

The system includes:  
- **Public APIs** (follow, catalog, drops, orders, stock, notifications).  
- **Internal APIs** (inventory, payments, notifications, cache invalidation).  
- **SQL data models** for Users, Creators, Products, Drops, Orders, Payments.  
- **Infrastructure layer** with Redis cache, Kafka event bus, S3+CDN, Audit Trail, Logs.

---

## 2) Technology & Trade-offs

- **SQL Databases (Postgres/MySQL)**  
  Chosen for strong consistency, relational integrity, and ability to handle joins (Users, Follows, Products, Drops, Orders).  
  Ensures no overselling and enforces constraints like unique idempotency keys.

- **Redis (Caching)**  
  Used for hot reads (e.g., stock, product details, user follow lists).  
  Trade-off: data can be stale → solved with **Cache Invalidation Service** listening to stock/order events from Kafka.  

- **Kafka (Message Queue / Event Bus)**  
  Decouples services and ensures scalable fan-out of events (DropStarted, StockLow, SoldOut, OrderConfirmed).  
  Chosen over simple in-memory queues for reliability and replay support.  

- **Blob Storage + CDN (S3 + CDN)**  
  Stores product media (images/videos).  
  CDN speeds up delivery for millions of users globally.  

- **Logs / Monitoring**  
  Centralized logs collect latency, error rates, cache hit/miss, and stock events.  
  Trade-off: not deep observability (like Prometheus/Grafana), but enough for this design level.  

- **WebSockets / SSE**  
  Used for real-time notifications (e.g., stock updates, order confirmations).  
  Trade-off: requires persistent connections, but necessary for <2s latency guarantee.

---

## 3) Caching Strategy

- Reads for stock, product details, and follower counts go through Redis.  
- **Invalidation**: Whenever stock or orders change, Kafka emits a StockChanged event, consumed by the Cache Invalidation Service to update or evict Redis keys.  
- Ensures low latency without serving stale stock in critical paths.  

---

## 4) Data Models

- **Users** → account info.  
- **Creators** → linked to Users.  
- **Follows** → many-to-many relation with indexes for efficient queries.  
- **Products** → creator-owned, references media URLs in blob storage.  
- **Drops** → scheduled events with stock & status.  
- **Inventory** → tracks available/reserved/sold counts.  
- **Orders** → includes idempotency key to prevent duplicates.  
- **Payments** → linked to orders, tracks provider status.  
- **Notifications** → records of user alerts delivered.  

---

## 5) Summary of Trade-offs

- **DB** → SQL chosen for consistency & constraints; scaling handled by indexing + caching.  
- **Redis** → improves read performance, but adds complexity with invalidation.  
- **Kafka** → adds operational overhead but enables reliable fan-out and event replay.  
- **WebSockets** → chosen over polling for efficiency and real-time guarantees.  
- **S3 + CDN** → external storage keeps DB light and ensures global performance.  
- **Logs** → minimal monitoring added to capture errors, latency, and cache stats.
- **Pagination** → All list endpoints use cursor + limit to split large results into smaller pages, avoiding bottlenecks.

