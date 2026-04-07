import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['core-test/**/*.spec.ts', 'core-test/**/*.test.ts'],
        globals: true,
        environment: 'node',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            reportsDirectory: './coverage',
            enabled: true,
            clean: false,
        },
    },
});