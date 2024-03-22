import express from 'express'
import type { Request, Response } from 'express'
import { webcrypto as crypto } from 'node:crypto'

import * as fs from 'node:fs/promises'
import { existsSync } from 'node:fs'
import * as path from 'node:path'

import multer from 'multer'

import cors from 'cors'

// import { nanoid } from 'nanoid'

import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 3000
// import { AudioAsset } from '../../types'

import { db, testDBConnection } from './db/db'
import { Asset } from './db/models/models'


// const ENV = process.env.NODE_ENV

// const __filename = fileURLToPath(import.meta.url)

const app = express()
const PUBLIC_PATH = path.resolve(__dirname, '../../dist')

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

if (process.env.NODE_ENV == 'development') {
	db.sync({ force: true })
	.then(() => {
		console.log('tables re-initialized')
	})
	.catch((err) => {
		console.error(err)
	})
} else {
	db.sync({ alter: true })
		.then(() => {
			console.log('tables initialized')
		})
		.catch((err) => {
			console.error(err)
		})
}



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
app.use(express.static(PUBLIC_PATH))

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

// app.get('/audio', async (req: Request, res: Response) => {
// 	res.sendFile(path.join(PUBLIC_PATH, ''))
// });

function generateId(e = 21): string {
	let t = ''
	const r = crypto.getRandomValues(new Uint8Array(e))
	const a = process.env.SEED as string
	
	for (let n = 0; n < e; n++) {
		t += a[63 & r[n]]
	}
	
	return t
}

async function createAudioAsset(name: string, url: string): Promise<string> {
	try {
		const asset = await Asset.create({
			id: generateId(),
			name,
			url
		})

		return asset.toJSON()
	} catch (err) {
		console.error(err)
		return err as string
	}
}


app.get('/', async (req: Request, res: Response) => {
    res.sendFile(path.join(PUBLIC_PATH, 'index.html'))
})

app.get('/assets', async (req: Request, res: Response) => {
	console.log(req.body)

	try {
		const assetsQuery = await Asset.findAll();
		const assets = assetsQuery.map((a) => a.toJSON())
		
		res.send(assets)

	} catch (error) {
		console.error(error)
		res.status(400)
		res.send(error)
	}
})

app.post('/upload', upload.single('file'), async (req, res) => {
	if (!req || !req.file || !req.body || !req.body.name) {
		return res.status(404)
	}

	await createAudioAsset(req.body.name, `audio/${req.file?.filename}`)
	res.status(200)
	res.send('you did it')
})

const server = app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`)
})

function closeServer() {
	console.info('\n||== Interrupt Signal Received ==||')
	console.info('||== Closing Server ==||')
	server.close(() => {
		db.close()
		console.info('||== Database Closed ==||')
		console.info('||== Server Closed ==||')
		process.exit(0)
	})
}

process.on('SIGINT', closeServer)
process.on('SIGTERM', closeServer)