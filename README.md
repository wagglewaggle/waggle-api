# Exit Server

## Description

인구 밀집도 서버

## Usage
* yarn berry 버전 사용

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Migration
프로젝트 최상단에 ormconfig.json 파일 생성 후 진행 (ormconfig.example.json 참고)

```bash
# 변경사항에 대해 migration 파일 생성
npm run typeorm migration:generate -- -n migrationNameHere
yarn ts-node $(yarn bin typeorm) migration:generate migration/migrationNameHere -d data-source.ts

# 현재까지의 migration 반영
npm run typeorm migration:run
yarn ts-node $(yarn bin typeorm) migration:run -d data-source.ts

# migration 되돌리기
npm run typeorm migration:revert
yarn ts-node $(yarn bin typeorm) migration:revert -d data-source.ts

# 참고
https://typeorm.io/#/migrations
```