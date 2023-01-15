# WaggleWaggle

## Description

인구 밀집도 Api, Scheduler

## Usage
* node v16.16.0
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