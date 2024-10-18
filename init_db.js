const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv').config({ path: './src/.env' });


async function initializeDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.HOST_SQL,
        user: process.env.USER_SQL,
        password: process.env.PASSWORD_SQL,
    });

    try {

        await connection.query('CREATE DATABASE IF NOT EXISTS events;');
        await connection.query('USE events;');


        await connection.query(`
            CREATE TABLE IF NOT EXISTS events (
                id int NOT NULL AUTO_INCREMENT,
                name varchar(255) DEFAULT NULL,
                date_creation datetime DEFAULT NULL,
                date_debut datetime DEFAULT NULL,
                date_fin datetime DEFAULT NULL,
                personnes_max int DEFAULT NULL,
                lieu varchar(255) DEFAULT NULL,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        
        await connection.query(`
            CREATE TABLE IF NOT EXISTS inscriptions (
                id int NOT NULL AUTO_INCREMENT,
                event_id int DEFAULT NULL,
                name varchar(255) DEFAULT NULL,
                lastName varchar(255) DEFAULT NULL,
                date_inscription date DEFAULT NULL,
                PRIMARY KEY (id),
                KEY event_id (event_id),
                CONSTRAINT inscriptions_ibfk_1 FOREIGN KEY (event_id) REFERENCES events (id)
            ) ENGINE=InnoDB AUTO_INCREMENT=175 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        


        const proceduresDir = path.join(__dirname, 'sql/procedures');


        const procedureFiles = fs.readdirSync(proceduresDir).filter(file => file.endsWith('.sql'));

        for (const file of procedureFiles) {
            const filePath = path.join(proceduresDir, file);
            const procedureSql = fs.readFileSync(filePath, 'utf8');
            await connection.query(procedureSql);
            console.log(`Exécuté : ${file}`);
        }

        console.log('Base de données et procédures initialisées avec succès.');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données :', error);
    } finally {
        await connection.end();
    }
}

initializeDatabase().catch(err => console.error('Erreur dans le script d\'initialisation :', err));
