import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@base': path.resolve(dirname, 'src-base'),
            '@client': path.resolve(dirname, 'src-client'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    }
})
