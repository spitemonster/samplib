import express from 'express'
import type { Request, Response } from 'express'

import * as fs from 'node:fs/promises'
import { existsSync } from 'node:fs'
import * as path from 'node:path'

import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 3000
// const ENV = process.env.NODE_ENV

// const __filename = fileURLToPath(import.meta.url)

const app = express()
const publicPath = path.resolve(__dirname, '../../dist')

const audioUploadsPath = path.join(__dirname, '/uploads/audio/')
app.use('/audio', express.static(audioUploadsPath))

try {
    if (!existsSync(audioUploadsPath)) {
        await fs.mkdir(audioUploadsPath, { recursive: true })
    }
} catch (err) {
    console.log(err)
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/audio', express.static(audioUploadsPath))
app.use(express.static(publicPath))

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '/uploads/audio')
//     },
//     filename: function (req, file, cb) {
//         const sp = file.originalname.split('.')
//         const fn = sp[0]
//         const ext = sp[1]

//         cb(null, `${fn}-${Date.now()}.${ext}`)
//     },
// })

// const upload = multer({ storage: storage })

app.get('/', async (req: Request, res: Response) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`)
})
