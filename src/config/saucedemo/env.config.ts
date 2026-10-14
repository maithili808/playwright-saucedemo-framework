export type EnvName = 'dev' | 'qa' | 'stage' | 'prod';

interface EnvConfig {
  baseURL: string;
  username: string;
  password: string;
}

const configs: Record<EnvName, EnvConfig> = {
  dev:   { baseURL: 'https://www.saucedemo.com', username: 'standard_user', password: 'secret_sauce' },
  qa:    { baseURL: 'https://www.saucedemo.com', username: 'standard_user', password: 'secret_sauce' },
  stage: { baseURL: 'https://www.saucedemo.com', username: 'standard_user', password: 'secret_sauce' },
  prod:  { baseURL: 'https://www.saucedemo.com', username: 'standard_user', password: 'secret_sauce' },
};

const envName = (process.env.ENV || 'dev') as EnvName;

if (!configs[envName]) {
  throw new Error(`Unknown ENV "${envName}". Use dev, qa, stage or prod.`);
}

export const env = configs[envName];