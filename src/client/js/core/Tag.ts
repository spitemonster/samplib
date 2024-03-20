import type { ITag } from "../../../types"

export class Tag implements ITag {
	id: string
	name: string

	constructor(id: string, name: string) {
		this.id = id
		this.name = name
	}
}