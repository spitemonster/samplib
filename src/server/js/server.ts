import express from 'express'
import type { Request, Response } from 'express'

import * as fs from 'node:fs/promises'
import { existsSync } from 'node:fs'
import * as path from 'node:path'

import multer from 'multer'

import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 3000
// import { AudioAsset } from '../../types'

import { db, testDBConnection } from './db/db'
import { Asset } from './db/models/models'


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

try {
	testDBConnection()
} catch (error) {
	console.log('there has been an error connecting to the database')
	console.error(error)
}

db.sync({ force: true })
	.then(() => {
		console.log('tables initialized')
	})
	.catch((err) => {
		console.error(err)
	})

// initializeDB();

// const client = new Client()

// try {
// 	await client.connect()	
// } catch (err) {
// 	console.log(err)
// }

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/audio', express.static(audioUploadsPath))
app.use(express.static(publicPath))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, audioUploadsPath)
    },
    filename: function (req, file, cb) {
        const sp = file.originalname.split('.')
        const fn = sp[0]
        const ext = sp[1]

        cb(null, `${fn}-${Date.now()}.${ext}`)
    }
})

const upload = multer({ storage: storage })

app.get('/', async (req: Request, res: Response) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})

// app.get('/audio', async (req: Request, res: Response) => {
// 	res.sendFile(path.join(publicPath, ''))
// });

function generateId() {
    return Math.random().toString(36).slice(2, 14)
}

function createAudioAsset(name: string, url: string) {
	return Asset.create({
		id: generateId(),
		name,
		url
	})
}

app.post('/upload', upload.single('file'), async (req, res) => {
	if (!req || !req.file || !req.body || !req.body.name) {
		return res.status(404)
	}

	createAudioAsset(req.body.name, `audio/${req.file?.filename}`)
	res.status(200)
	res.send("you did it")
})

const server = app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`)
})

function closeServer() {
	console.info('\n||== Interrupt Signal Received ==||')
	console.info('||== Closing Server ==||')
	server.close(() => {
		console.info('||== Server Closed ==||')
		// client.end()
		process.exit(0)
	})
}

process.on('SIGINT', closeServer)
process.on('SIGTERM', closeServer)