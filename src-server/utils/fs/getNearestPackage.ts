import fs from 'node:fs'
import { sep } from 'node:path'

// Ищет ближайшую к корню папку с package.json
export function getNearestPackage(path: string) {
    const pathParts = path.split(sep)
    let rootPath = ''

    do {
        if (fs.existsSync([...pathParts, 'package.json'].join(sep))) {
            rootPath = pathParts.join(sep)
        } else {
            pathParts.pop()
        }
    } while (pathParts.length && !rootPath)

    return rootPath
}
