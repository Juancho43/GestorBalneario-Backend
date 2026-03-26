import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['core-test/**/*.spec.ts', 'core-test/**/*.test.ts'],
        globals: true,
        environment: 'node',
    },
});