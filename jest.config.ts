import nextJest from 'next/jest';

// Initialize next/jest with the path to your Next.js app
const createJestConfig = nextJest({
  // Path to the Next.js app (if needed for Next.js setup)
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Use TypeScript for setup files
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1', // Adjust aliases
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// Export the Jest config with custom configuration
export default createJestConfig(customJestConfig);
