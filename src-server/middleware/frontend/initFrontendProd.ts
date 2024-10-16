import fs from 'node:fs/promises'
import path from 'node:path'

import sirv from 'sirv'

import { DIST_STATIC_ROOT_PATH } from '../../config'

import type { Express } from 'express'

export async function initFrontendProd(server: Express) {
    const template = await fs.readFile(path.resolve(DIST_STATIC_ROOT_PATH, 'index.html'), 'utf-8')

    server.use('/', sirv(DIST_STATIC_ROOT_PATH, { extensions: [] }))

    async function render() {
        return template
    }

    return { render }
}
