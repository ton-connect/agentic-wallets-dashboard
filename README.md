# Agentic Wallets Dashboard

Standalone-репозиторий для `agentic-wallets-dashboard`.

Локально зафиксированные tarball-пакеты лежат в `vendor/`:
- `@ton/appkit`
- `@ton/walletkit`
- `@ton/appkit-react`
- `@tonconnect/bridge-sdk` (переопределен локально, чтобы цепочка `walletkit` не ходила за ним в GitHub)

## Запуск

Из корня репозитория:

```bash
pnpm install && pnpm dev
```

Приложение стартует на `http://localhost:5175`.

## Дополнительно

- production build: `pnpm build`
- preview build: `pnpm preview`
- typecheck: `pnpm typecheck`

## Конфигурация окружения

Файл: `src/core/configs/env.ts`.

Ключевые переменные:
- `VITE_TON_API_KEY`
- `VITE_TON_API_TESTNET_KEY`
- `VITE_TON_API_MIN_REQUEST_INTERVAL_MS`
- `VITE_AGENTIC_COLLECTION_MAINNET`
- `VITE_AGENTIC_COLLECTION_TESTNET`
- `VITE_AGENTIC_WALLET_CODE_BOC`
- `VITE_AGENTIC_OWNER_OP_GAS`
- `VITE_AGENTIC_ACTIVITY_POLL_MS`
