const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['src/main.ts'],
    bundle: true,
    platform: 'node',
    target: 'node20', // O tu versión de Node
    outfile: 'dist/bundle.js',
    format: 'cjs',
    // ↑ Excluimos drivers nativos y módulos que no uses
    external: [
        '@nestjs/microservices',
        '@nestjs/websockets',
        'sqlite3',
        'better-sqlite3',
        'class-validator',
        'class-transformer',
        'class-transformer/storage'
    ],
    tsconfig: 'tsconfig.build.json',
    minify: false, // Mantener legible para depurar, o true para producción
    sourcemap: true,
}).catch(() => process.exit(1));