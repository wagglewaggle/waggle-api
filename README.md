# WaggleWaggle

## Description

인구 밀집도 Api, Scheduler

## Usage
* node v16.16.0
* yarn berry 버전 사용
* .env 생성 후 진행 (.env.example 참고)
* 주요 폴더, 파일 구조
```
.
├── apps
│   ├── api : api server 개발
│   └── scheduler : scheduler server 개발 (KT, SKT)
├── libs
│   ├── config : env config library (@lib/config)
│   └── entity : entity library (@lib/entity)
├── migration : migration dir
├── migration.sh : migration 실행 스크립트
├── ormconfig.example.json
└── .env.example
```

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development api
$ yarn run start:dev

# build
$ yarn run build api
# or
$ yarn run build scheduler

# product
$ pm2 start app.json
# or
$ pm2 start scheduler.json
```

## Migration
프로젝트 최상단에 ormconfig.json 파일 생성 후 진행 (ormconfig.example.json 참고)

```bash
# 변경사항에 대해 migration 파일 생성
./migration.sh gen {migrationName}

# 현재까지의 migration 반영
./migration.sh run

# migration 되돌리기
./migration.sh re

# migration 직접 생성
./migration.sh create {migrationName}

# 참고
https://typeorm.io/#/migrations
```