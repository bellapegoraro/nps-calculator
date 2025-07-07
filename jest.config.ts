import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
  },
  modulePathIgnorePatterns: ['<rootDir>/.next/'],    
};

export default config;
