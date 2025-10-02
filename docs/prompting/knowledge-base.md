# Shoplite Knowledge Base

---

## Document 1: User Registration and Account Management

Creating a Shoplite account starts on the sign-up page. New users provide an email address, a password (minimum 8 characters), and a display name. A verification email is sent automatically; accounts must be confirmed within **24 hours** to stay active. The default role is **Buyer**. Users who plan to sell can later upgrade to **Seller** from Account → Settings → Seller Setup.

Buyers can edit profile details (name, phone, default address) at any time. Password resets are handled by the “Forgot Password” flow, which emails a one-time link. For extra security, users can enable **two-factor authentication (2FA)** via SMS or an authenticator app. If a login is detected from a new device, Shoplite sends a notification email and may require 2FA.

Account deletion is available under Account → Privacy. Deletions enter a **14-day cooling-off period** during which users can restore access. After the period, personally identifying data in order history is anonymized while transaction records are retained for compliance. Users can export their data (orders, addresses, messages) in JSON or CSV before deletion. Suspicious activity (e.g., repeated chargebacks, policy abuse) may result in temporary holds, during which some features are restricted until resolved with Support.

---

## Document 2: Product Search and Filtering Features

Shoplite search supports basic keywords, quoted phrases, and category scoping (e.g., Electronics → Laptops). Results are ranked by a blend of **query relevance**, **seller quality signals**, **in-stock status**, and **recent sales momentum**. Users can sort by price, rating, newest, or relevance. A faceted filter panel lets buyers refine by brand, price range, condition (new/refurbished), shipping speed, seller location, and attributes like size or material.

If a query returns no results, the system suggests related categories, removes the narrowest filter, or offers **“did you mean”** corrections. Autocomplete displays trending queries, recent views, and top categories. Users can **save searches** and opt into alerts for restocks or price drops. Indexing jobs regularly refresh the search catalog by parsing titles, descriptions, and structured attributes.

Sellers improve discoverability by completing attribute fields (brand, model, dimensions) and avoiding keyword stuffing. When multiple sellers list the same product, Shoplite may **merge duplicates** into a single product page with multiple offers, which reduces clutter and concentrates reviews and Q&A. Search behavior adapts to language and locale, including unit conversions where applicable.

---

## Document 3: Shopping Cart and Checkout Process

The cart supports items from multiple sellers and persists for signed-in users across sessions. Buyers can change quantities, remove items, or move them to **Save for Later**. Inventory is not reserved until checkout; if stock changes, the cart shows a warning and suggests alternatives.

Checkout has four steps: **Address → Shipping → Payment → Review**. Address entry performs **postal code validation** and normalizes fields (street, city, region) to reduce carrier errors. Shipping options (economy/standard/express) are shown per seller, with estimated delivery windows that combine seller handling time and carrier SLA. Taxes are calculated based on destination and product tax rules. **Promotional codes** and gift credits are applied on the **Review** step before final confirmation.

After confirmation, buyers receive an order number and email receipt. For digital goods, delivery is immediate by download link or license email; for physical items, the system places a temporary authorization and captures funds when the seller dispatches (or immediately for some categories per policy). If any line becomes unavailable before capture, that line is cancelled and the rest of the order proceeds.

---

## Document 4: Payment Methods and Security

Shoplite supports major credit/debit cards, selected digital wallets, and certain regional payment methods depending on country. Payments are processed by PCI-DSS-compliant providers; card data is **tokenized** and never stored in raw form by Shoplite. Risk-based checks may trigger **3-D Secure** or additional verification for suspicious transactions.

Fraud controls combine device fingerprinting, velocity limits, IP reputation, and behavioral patterns. High-risk orders can be placed on **manual review** or temporarily held before shipment; buyers are notified of the status. Refunds are issued back to the **original payment method**. Partial refunds pro-rate taxes and, when required, shipping fees. Disputes/chargebacks follow provider timelines; sellers should upload shipment proof, delivery scans, and buyer communication to assist investigations.

Sellers connect a payout bank account that must match their business or owner name. Verification may use micro-deposits or open-banking checks. Payouts are typically **weekly**, though reserve holds may apply to new or high-risk sellers to cover potential returns or chargebacks. All payment pages enforce HTTPS and strong content-security policies.

---

## Document 5: Order Tracking and Delivery

For most shipments, buyers receive a tracking link on the Orders page and by email. Common events include **Label Created**, **Picked Up**, **In Transit**, **Out for Delivery**, and **Delivered**. Orders that include items from multiple sellers may **split**; each parcel has its own tracking number and estimate.

Delivery windows combine **seller handling time** with the carrier’s SLA and destination. Some items require an adult **signature on delivery** (clearly shown at checkout). If a courier misses the recipient, they typically reattempt or hold at a pickup point. Address issues are the most common delay; checkout validation reduces errors, but if tracking stalls for 48–72 hours, buyers should message the seller from the order page so the conversation is logged for Support.

If a shipment is declared lost by the carrier, Shoplite helps the seller file a claim and assists the buyer with a **refund or replacement** per policy. For bulky items or special-handling categories, delivery partners may schedule a time window. Digital items skip physical logistics entirely and generate immediate confirmation.

---

## Document 6: Return and Refund Policies

Most items have a **30-day return window** starting from delivery, unless stated otherwise on the product page (e.g., final sale, hygiene-sealed). Buyers request a **Return Authorization (RA)** from the order page, select a reason, and upload photos if requested. Approved returns receive instructions and, when eligible, a **pre-paid label**; for “changed mind” reasons, buyers may pay return shipping.

Items must be returned in original condition with accessories and packaging. Certain categories—digital goods, consumables, intimate apparel—are **non-returnable** unless defective. Once the seller receives the return, they have **2 business days** to inspect and record the result. If approved, refunds are issued back to the original payment method; banks typically post funds within **3–10 business days**. Exchanges or store credits may be offered where available.

If a return is rejected (missing parts, signs of misuse), the seller provides photos and a note; the buyer may choose to have the item shipped back. Repeated policy abuse can trigger account review under Trust & Safety. All communications remain visible on the order’s timeline for transparency.

---

## Document 7: Product Reviews and Ratings

Reviews help other buyers evaluate products and sellers. A review includes a **1–5 star** rating, optional text, and optional photos/videos. Reviews marked **Verified Purchase** come from accounts with a completed order for that item. Shoplite may wait up to **72 hours after delivery** before inviting a review to reduce pre-delivery bias. Buyers can edit a review once within 30 days; edits are labeled as **Edited**.

Shoplite moderates for prohibited content: harassment, hate speech, doxxing, illegal items, spam, or paid endorsements without disclosure. Any user can **report** a review; flagged entries may be temporarily hidden while under review. Sellers can post one **public response** to clarify issues or offer help but cannot change buyer text.

Average product ratings use a **weighted mean** to reduce manipulation, with recent verified reviews weighted slightly more. A separate **seller rating** summarizes communication, shipping accuracy, and dispute outcomes. When duplicate listings are merged into one product page, review counts are consolidated if products are materially identical.

---

## Document 8: Seller Account Setup and Management

Businesses become sellers by completing **Know-Your-Business (KYB)** in the **Verification Center**. Required details include legal name, registration/Tax ID, business address, contact person, and ownership structure. Beneficial owners may require identity checks. Payout bank accounts must match the business or owner name and may be verified by micro-deposits.

Review typically takes **2–3 business days**. During review, sellers can draft listings but cannot receive orders. After approval, sellers gain access to catalog creation, inventory tools, shipping label purchase, promotions, and analytics dashboards. New or higher-risk sellers may have a **reserve** on payouts for an initial period to cover returns and chargebacks.

Sellers must comply with **Prohibited Items** and Listing Policies. Repeated late shipments, misrepresentation, or fee evasion can trigger warnings, listing removal, or suspension. Settings allow role-based access for team members (catalog, support, finance) so staff only see what they need.

---

## Document 9: Inventory Management for Sellers

Each listing requires a unique **SKU**. Variations (size, color, capacity) are modeled as child SKUs under a parent product. Sellers update stock manually, upload **bulk CSV** files, or integrate via **Seller API** and **webhooks** for real-time sync. Shoplite supports **reserved stock**: when an order is placed, units are deducted immediately; if payment fails, stock is returned.

Low-stock thresholds trigger dashboard badges and **email alerts**. Sellers may enable **backorders** for eligible items; the product page displays the expected restock date and extended handling time. Negative inventory is blocked, and listings auto-pause at zero. Multi-warehouse support lets sellers store quantities per location, improving **shipping estimates** by buyer address.

Audit logs record who changed stock and when. For “Fulfilled by Shoplite,” inventory moves through inbound shipments with storage limits and cycle counts. Clean attribute data (brand, model, barcode/GTIN) improves search quality and helps the platform merge duplicates correctly.

---

## Document 10: Commission and fee structure

Shoplite charges a **final value fee** on the item price (and sometimes shipping) when an order completes, plus a **payment processing fee** from the payment provider. Fee percentages vary by category and region. Optional services—promoted placements, branded packaging, or fulfillment programs—may carry additional fees. New or high-risk sellers can be subject to a temporary **reserve**.

Sellers receive a monthly **statement** with line-item fees and downloadable **invoices** for accounting. Taxes and VAT handling follow local rules; in some regions, the marketplace may be deemed the seller of record for tax collection on certain orders. Sellers are responsible for configuring tax settings where applicable and keeping registration details up to date.

Examples on the statement include sale amount, final value fee, payment fee, refunds (with pro-rated fee reversals where applicable), and adjustments (promotions, credits). Transparent reporting helps sellers reconcile payouts to bank deposits. Fee schedules are published in the Help Center and may change with notice.

---

## Document 11: Customer Support Procedures

Support channels include the Help Center, web chat, and email. Typical **SLA** targets are quick acknowledgement (within hours) and resolution within a few business days depending on complexity. Sensitive account changes require identity checks (order details, last four digits of phone, or 2FA confirmation). For seller–buyer disputes, Shoplite encourages conversation within the **order message thread** first, since it’s visible to Support.

Common issues include tracking delays, return eligibility, damaged items, and payment holds. Agents consult policy playbooks and can grant exceptions (e.g., partial refunds, label upgrades) when guidelines allow. Escalations move to specialized teams (payments risk, policy enforcement, or technical). If the platform is at fault (e.g., system bug), Shoplite may issue courtesy credits.

Support prioritizes safety and privacy. Agents never ask for full card numbers or passwords, and they redact sensitive data in tickets. Case outcomes and next steps are summarized in writing, and satisfaction surveys are optional after closure.

---

## Document 12: Mobile App Features

The Shoplite mobile app includes **biometric login** (device-supported), saved searches, push **notifications** for price drops, restocks, and delivery updates, and an offline cart that syncs when connectivity returns. Product pages support pinch-to-zoom, image galleries, and quick add-to-cart. Buyers can scan barcodes to search or quickly reorder past items.

Order tracking shows a timeline with carrier events and map snapshots when available. Chat with sellers is integrated into order details, with photo attachments for damaged-item claims. App-only promotions or early access events may appear as push campaigns; users can manage notification preferences in Settings.

Sellers can use the app to respond to messages, adjust prices/quantities, print or share labels (where supported), and receive low-stock alerts. The app respects device privacy settings and uses minimal background activity to save battery.

---

## Document 13: API documentation for developers

The Seller/Partner **API** enables catalog, inventory, order, and messaging integrations. Authentication uses API keys with **HMAC** signatures on webhook callbacks. **Rate limits** protect platform stability; clients should implement backoff on 429 responses. Common endpoints include `/products`, `/offers`, `/inventory`, `/orders`, and `/messages`. Pagination is cursor-based.

**Webhooks** (e.g., `order.created`, `order.shipped`, `refund.issued`) notify systems in near-real time; endpoints must verify signatures and return 2xx quickly. The sandbox environment mirrors production features with test data and no financial impact. Error payloads include a stable `code`, human-readable `message`, and a `trace_id` to share with Support.

Best practices: validate required attributes, keep SKUs stable, and use idempotency keys when updating offers. For security, rotate API keys regularly and scope permissions to the minimum needed. Detailed field definitions and code samples are provided in the API guide.

---

## Document 14: Security and Privacy Policies

Shoplite follows **data minimization** and **least-privilege** principles. Access to user data is restricted by role, and sensitive operations are logged. Data in transit uses HTTPS; sensitive data at rest is encrypted. Employees receive periodic security training, and third-party vendors are assessed for risk. A formal **incident response** plan defines investigation and notification timelines in case of a breach.

Users can review and update their information, export a machine-readable copy of their data, and request deletion from Account → Privacy (subject to legal retention). The platform uses cookies for essential site functionality and analytics; advertising cookies can be controlled via preferences. Anti-fraud tools (device signals, IP reputation) operate under a legitimate interest basis to protect users.

Security researchers can report vulnerabilities through a responsible disclosure process. Shoplite publishes policy updates and maintains a changelog so users know what changed and why. The company does not sell personal data and responds to lawful requests according to applicable regulations.

---

## Document 15: Promotional Codes and Discounts

Promotions include **public codes**, **targeted offers** (email/app), **single-use codes**, and automatic **cart discounts**. Rules can require a **minimum cart value**, specific categories, or first-time buyers. Some codes stack; others are **non-stackable**. Eligibility and expiration are shown at checkout; expired or ineligible codes display clear messages.

Codes are applied on the **Review** step before payment capture. If an item is cancelled or returned, Shoplite recalculates discounts fairly and may remove the promotion if eligibility is no longer met. Abusive behavior (e.g., sharing targeted codes, creating multiple accounts to reuse single-use codes) can result in removal of the discount and account review.

Sellers can fund their own coupons for store-wide or item-level promotions. The dashboard provides basic reports: redemptions, incremental sales, and gross margin impact. Platform-wide events (e.g., seasonal sales) may include additional visibility for participating offers while following the same transparency rules for buyers.

---
