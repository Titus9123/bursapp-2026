# Bursapp Market Brief

## 2026 demand read

Research signals checked during repo creation:

- Personal finance apps show strong growth projections into 2035, with 2026 market-size estimates in the tens of billions globally depending on source.
- Financial literacy gamification for Gen Z is repeatedly framed around AI personalization, rewards and mobile-first learning.
- Paper trading / stock simulator apps are live and visible on Google Play and App Store, including apps positioning around AI trading coach and risk-free practice.
- Language learning + AI tutor markets are also growing, but the existing private app foundation has stronger finance/simulator primitives than language-learning primitives.
- In-app advertising remains large in 2026; rewarded/native formats are generally more compatible with free educational apps than aggressive interstitials.

## Best opportunity

**Bursapp: free AI-assisted market-practice app**

Positioning:

> Learn how markets, risk and diversification work with a free AI-guided paper trading simulator. No real money. No financial advice.

Primary target:

- Beginners curious about investing.
- Gen Z / mobile-first users.
- Multilingual users underserved by English-only finance education.
- Users who want to practice before using a real broker.

## Modules to keep

1. **Market simulator / BSE concept**
   - Highest engagement and strongest category monetization.
   - Keep fictional baskets first.

2. **Learning roadmaps / micro-lessons**
   - Converts risky finance topic into safer education.
   - Good for retention and SEO/support content.

3. **Trivia / quizzes**
   - Fast repeat engagement.
   - Can support rewarded ads later.

4. **AI assistant as rule-based coach first**
   - Keep the AI promise but avoid API cost and risky advice.
   - Later: explain concepts, summarize simulation outcomes, never buy/sell.

5. **PWA + multilingual RTL foundation**
   - Critical advantage for distribution.
   - Languages kept: EN, ES, HE, AR, AM, RU.

6. **Ad-ready shell**
   - Inactive placeholders only in repo.
   - Later AdMob integration for app build.

## Modules to discard/defer

- **Brokers**: too risky, implies real trading/regulated activity.
- **Payments**: not needed for free-with-ads v0.
- **Wallet/SHKALOT**: can confuse users and reviewers; keep only virtual capital inside simulator.
- **Admin**: internal only.
- **Ambassadors/referrals/community**: moderation burden and low MVP necessity.
- **Real courses/video/Vimeo**: rights/cost complexity.
- **Real AI trading advice**: policy and YMYL risk.
- **Real market data**: useful later, but v0 can use fictional baskets to reduce compliance and cost.

## Suggested ad model

Free users:

- Banner: bottom or after results, not covering controls.
- Native ad: between lesson cards.
- Rewarded ad: optional extra scenario, extra quiz streak, cosmetic badge.

Paid later:

- One-time remove ads.
- Optional Pro: advanced scenarios, multiple portfolios, deeper lessons, offline packs.

## Validation metrics

- simulator_start
- scenario_change
- allocation_change
- quiz_answered
- csv_export
- install_pwa_click
- ad_slot_visible
- rewarded_ad_offer_click once implemented

## Launch sequence

1. Build PWA MVP and publish web preview.
2. Create 3 SEO pages around simulator, diversification, beginner quiz.
3. Add analytics/events without private data.
4. If engagement is good, wrap with Capacitor and submit Android first.
5. Add AdMob only when privacy/cookie/ad disclosures are ready.
