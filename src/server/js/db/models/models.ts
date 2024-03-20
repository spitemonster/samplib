import { DataTypes } from 'sequelize'

import { db } from '../db'

export const Tag = db.define('Tag', {
	id: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	}
})

export const Asset = db.define('AudioAsset', {
	id: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	url: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	}
})

Asset.hasMany(Tag, {
	as: 'tags',
	foreignKey: 'assetId'
})

Tag.hasMany(Asset, {
	as: 'assets',
	foreignKey: 'tagId'
})