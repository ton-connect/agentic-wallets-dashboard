# Agentic Wallets Dashboard

## Technical Overview

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

## Продукт

Веб-приложение для управления `agentic wallet` в сети TON:
- просмотр найденных agent-кошельков владельца;
- создание нового agent-кошелька с первичным фондированием;
- пополнение, вывод активов, смена ключа оператора, revoke;
- просмотр activity-ленты по агенту.

Приложение построено на `React + Vite + @tanstack/react-query + @ton/appkit-react`.

## Роуты

- `/` — дашборд со списком агентов.
- `/create` — форма создания агента.
- `/agent/:id` — карточка конкретного агента.

## Основной функционал

1. Обнаружение агентов владельца:
- загрузка NFT владельца;
- фильтрация по configured collection;
- дозагрузка on-chain state кошельков.

2. Создание агента (`/create`):
- ввод `origin operator public key`, имени и источника;
- расчёт индекса и детерминированного адреса agent-кошелька;
- deploy + первичное фондирование TON и/или ассетами в одном флоу.

3. Операции по агенту:
- `fund` (TON / jetton / NFT);
- `withdraw all` (или выборочно, в зависимости от UI-модалки);
- `revoke` (установка operator key в `0`);
- `change public key`;
- `rename`.

4. Activity feed:
- классификация действий (`ton`, `jetton`, `nft`, `swap`, `contract`, `agent_ops`);
- дедуп по hash;
- периодический polling (`VITE_AGENTIC_ACTIVITY_POLL_MS`).

## Диплинки

### Создание кошелька (`/create`)

Страница создания агента поддерживает автозаполнение формы через query-параметры URL.

Базовый формат:

```text
/create?...
```

Поддерживаемые scalar-параметры:
- `originOperatorPublicKey` (алиасы: `operatorPublicKey`, `operatorPubkey`, `operator`, `pubkey`)
- `agentName` (алиас: `name`)
- `source`
- `callbackUrl` (алиасы: `callback`, `webhookUrl`, `webhook`)
- `tonDeposit` (алиасы: `ton`, `tonAmount`)

Поддерживаемые параметры ассетов:
- `assets=<json-array>`: URL-encoded JSON-массив объектов вида `{"kind":"jetton","address":"EQ...","amount":"12.5"}` или `{"kind":"nft","address":"EQ..."}`; дополнительно поддержаны `symbol` и `label` для fallback-мэтчинга
- повторяемый `asset`: `asset=jetton:<address>:<amount>` или `asset=nft:<address>`
- повторяемые `jetton` / `nft`: `jetton=<address>:<amount>` и `nft=<address>`

Поведение автозаполнения:
- scalar-поля применяются один раз при открытии страницы
- ассеты применяются после загрузки jetton/NFT владельца
- мэтчинг ассетов идет сначала по адресу, а для `assets=<json-array>` возможен fallback по `symbol` и `label`
- неизвестные или недоступные ассеты игнорируются
- для `jetton` подставляется `amount`, для `nft` amount не используется
- действует ограничение по числу ассетов: `max outgoing messages - 1`

Примеры:

```text
/create?operator=0x1234&name=Research%20Agent&source=telegram-bot&ton=0.2
/create?pubkey=0x1234&agentName=Ops%20Agent&asset=jetton:EQC...:15.75&asset=nft:EQD...
/create?originOperatorPublicKey=0x1234&agentName=A1&source=api&callbackUrl=https%3A%2F%2Fexample.com%2Fagent-wallet-created&tonDeposit=0.35&assets=%5B%7B%22kind%22%3A%22jetton%22%2C%22address%22%3A%22EQC...%22%2C%22amount%22%3A%2212.5%22%7D%2C%7B%22kind%22%3A%22nft%22%2C%22address%22%3A%22EQD...%22%7D%5D
```

### Смена `operatorPublicKey` (`/agent/:id`)

Страница агента поддерживает диплинк, который сразу открывает модалку смены ключа и может предзаполнить новое значение.

Поддерживаемые query-параметры:
- значение нового ключа: `nextOperatorPublicKey`, `newOperatorPublicKey`, `operatorPublicKey`, `operatorPubkey`, `operator`, `pubkey`
- явный флаг открытия модалки: `action=change-public-key`, `modal=change-public-key`, `changePublicKey`, `change-public-key`, `updateOperatorPublicKey`, `update-operator-public-key`

Примеры:

```text
/agent/EQ...?operatorPublicKey=0x1234
/agent/EQ...?action=change-public-key&operatorPublicKey=0x1234
```

Ключ можно передавать в hex-формате (`0x...`) или в decimal. После открытия модалки служебные query-параметры удаляются из URL.

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
