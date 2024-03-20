import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
	dialect: 'postgres',
	database: process.env.PGDATABASE,
	username: process.env.PGUSER
})

export async function testDBConnection() {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.log("there was an error connecting to the database: ", error);
	}		
}

export const db = sequelize