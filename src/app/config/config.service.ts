import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import { ENV } from './config.constant';

export type EnvConfig = Record<string, any>;

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envValues = Object.keys(ENV).map((k) => ENV[k]);
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      PROJECT_NAME: Joi.string().required(),
      SCHEDULER_NAME: Joi.string().required(),
      ENV: Joi.string()
        .valid(...envValues)
        .default(ENV.DEVELOPMENT),
      USE_SENTRY: Joi.boolean().required().default(false),
      USE_CONSOLE_API: Joi.boolean().required().default(false),
      USE_CONSOLE_SCHEDULER: Joi.boolean().required().default(false),
      API_HOST: Joi.string().default('0.0.0.0'),
      API_PORT: Joi.number().default(3000),
      SCHEDULER_HOST: Joi.string().default('0.0.0.0'),
      SCHEDULER_PORT: Joi.number().default(3030),
      MYSQL_HOST: Joi.string().required(),
      MYSQL_PORT: Joi.number().required(),
      MYSQL_DATABASE: Joi.string().required(),
      MYSQL_USERNAME: Joi.string().required(),
      MYSQL_PASSWORD: Joi.string(),
      JWT_SECRET_KEY: Joi.string().required(),
      NAVER_CLIENT_ID: Joi.string().required(),
      NAVER_CLIENT_SECRET: Joi.string().required(),
      KAKAO_CLIENT_ID: Joi.string().required(),
      KAKAO_REDIRECT_URL: Joi.string().required(),
      GOOGLE_CLIENT_ID: Joi.string().required(),
      GOOGLE_CLIENT_SECRET: Joi.string().required(),
      GOOGLE_REDIRECT_URL: Joi.string().required(),
      APPLE_CLIENT_ID: Joi.string().required(),
      APPLE_TEAM_ID: Joi.string().required(),
      APPLE_KEY_ID: Joi.string().required(),
      APPLE_REDIRECT_URI: Joi.string().required(),
      APPLE_PRIVATE_KEY_FILE: Joi.string().required(),
      KT_API_KEY: Joi.string().required(),
      SKT_TMAP_API_KEY: Joi.string().required(),
      SKT_CONGESTION_API_KEY: Joi.string().required(),
      SLACK_API_SERVER: Joi.string().required(),
      SLACK_REPORT: Joi.string().required(),
      SENTRY_DSN: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get projectName(): string {
    return this.envConfig.PROJECT_NAME;
  }
  get schedulerName(): string {
    return this.envConfig.SCHEDULER_NAME;
  }
  get environment(): ENV {
    return this.envConfig.ENV;
  }
  get useSentry(): boolean {
    return this.envConfig.USE_SENTRY;
  }
  get useConsoleApi(): boolean {
    return this.envConfig.USE_CONSOLE_API;
  }
  get useConsoleScheduler(): boolean {
    return this.envConfig.USE_CONSOLE_SCHEDULER;
  }
  get apiHost(): string {
    return this.envConfig.API_HOST;
  }
  get apiPort(): number {
    return parseInt(this.envConfig.API_PORT, 10);
  }
  get schedulerHost(): string {
    return this.envConfig.SCHEDULER_HOST;
  }
  get schedulerPort(): number {
    return this.envConfig.SCHEDULER_PORT;
  }
  get mysqlHost(): string {
    return this.envConfig.MYSQL_HOST;
  }
  get mysqlPort(): number {
    return parseInt(this.envConfig.MYSQL_PORT, 10);
  }
  get mysqlDatabase(): string {
    return this.envConfig.MYSQL_DATABASE;
  }
  get mysqlUsername(): string {
    return this.envConfig.MYSQL_USERNAME;
  }
  get mysqlPassword(): string {
    return this.envConfig.MYSQL_PASSWORD;
  }
  get jwtSecretKey(): string {
    return this.envConfig.JWT_SECRET_KEY;
  }
  get naverClientId(): string {
    return this.envConfig.NAVER_CLIENT_ID;
  }
  get naverClientSecret(): string {
    return this.envConfig.NAVER_CLIENT_SECRET;
  }
  get kakaoClientId(): string {
    return this.envConfig.KAKAO_CLIENT_ID;
  }
  get kakaoRedirectUrl(): string {
    return this.envConfig.KAKAO_REDIRECT_URL;
  }
  get googleClientId(): string {
    return this.envConfig.GOOGLE_CLIENT_ID;
  }
  get googleClientSecret(): string {
    return this.envConfig.GOOGLE_CLIENT_SECRET;
  }
  get googleRedirectUrl(): string {
    return this.envConfig.GOOGLE_REDIRECT_URL;
  }
  get appleClientId(): string {
    return this.envConfig.APPLE_CLIENT_ID;
  }
  get appleTeamId(): string {
    return this.envConfig.APPLE_TEAM_ID;
  }
  get appleKeyId(): string {
    return this.envConfig.APPLE_KEY_ID;
  }
  get appleRedirectUri(): string {
    return this.envConfig.APPLE_REDIRECT_URI;
  }
  get applePrivateKeyFile(): string {
    return this.envConfig.APPLE_PRIVATE_KEY_FILE;
  }
  get ktApiKey(): string {
    return this.envConfig.KT_API_KEY;
  }
  get sktTmapApiKey(): string {
    return this.envConfig.SKT_TMAP_API_KEY;
  }
  get sktCongestionApiKey(): string {
    return this.envConfig.SKT_CONGESTION_API_KEY;
  }
  get slackApiServer(): string {
    return this.envConfig.SLACK_API_SERVER;
  }
  get slackReport(): string {
    return this.envConfig.SLACK_REPORT;
  }
  get sentryDsn(): string {
    return this.envConfig.SENTRY_DSN;
  }
}

export const config = new ConfigService('.env');
