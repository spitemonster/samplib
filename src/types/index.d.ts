export type ITag = {
    id: string
    name: string
}

export interface IAsset {
	id: string
    tags: Array<Tag>
	name: string
}

// export interface AudioAsset extends Asset {
// 	url: string
// }

// export type AudioBlock = {
//     url: string
//     id: string
// }

// export type AudioAsset = {
//     url: string
//     id: string
//     name: string
//     tags: Array<Tag>
// }

// export type Scene = {
//     blocks: Array<AudioBlock>
// }

// export type Events = {
//     updateAsset: AudioAsset
// }
