# Bullsap 2026

Free multilingual AI-assisted financial learning and market-practice app shell, derived from the earlier private PWA foundation and narrowed for a 2026 ad-supported launch.

## Product direction

**Primary demand bet:** AI-assisted financial literacy + paper trading simulator + beginner quizzes.

Why this direction:

- Personal finance apps and financial literacy gamification show strong 2026 growth signals.
- Paper trading / stock simulator apps already have proven demand on Google Play and App Store.
- AI raises click/engagement demand, but the app must stay educational and avoid financial advice.
- Multilingual support gives distribution angles in English, Spanish, Hebrew, Arabic, Amharic and Russian.

## Kept from the earlier app foundation

- PWA React/Vite/Tailwind foundation.
- Multilingual + RTL architecture.
- Mobile-first installable app posture.
- BSE concept: simulated market, portfolio, scenarios, risk/diversification.
- Learning/trivia idea.
- Free app shell with ad placeholders.

## Removed / deferred

- Login/register/auth as required flow.
- Backend and PostgreSQL dependency.
- Admin panel.
- Real wallet/SHKALOT economy.
- Broker/payment modules.
- Real trading or real-money claims.
- AI API calls in v0; current coach is rule-based to avoid cost and policy risk.

## Monetization plan

v0 is **free with inactive ad placeholders**. Later mobile builds can add:

- AdMob banner/native/rewarded placements for free users.
- One-time remove-ads purchase.
- Optional Pro subscription after engagement is proven.

No live ad SDK or ad network script is included in this repo yet.

## Compliance posture

- Educational simulation only.
- No real money.
- No personalized buy/sell recommendations.
- Fictional baskets first, not real securities.
- Export is free.
- No secrets or user private financial data.

## Development

```bash
npm install
npm run build
npm run dev
```

## App store path

Recommended path after web/PWA validation:

1. Add Capacitor.
2. Add AdMob only after policy/privacy screens are ready.
3. Add RevenueCat or native IAP for remove-ads entitlement.
4. Build Android first, iOS second.
