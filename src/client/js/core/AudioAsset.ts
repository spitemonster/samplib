import { Tag } from "./Tag";

import type { IAsset } from "../../../types"

export class AudioAsset implements IAsset {
	id: string
	url: string
	name: string
	tags: Array<Tag>

	constructor(id: string, name: string, url: string) {
		this.id = id
		this.url = url
		this.name = name
		this.tags = []
	}
}