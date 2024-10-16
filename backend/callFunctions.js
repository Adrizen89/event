const { updateDates } = require('./controllers/dataCentralController');

const [eventID, dateStart, dateFinish] = process.argv.slice(2);

const runPrograms = async () => {
    if (!eventID || !dateStart || !dateFinish) {
        console.error("Veuillez spécifier un ID, une date de début et une date de fin.");
        console.log("Exemple : node callFunctions 1 '2024-12-01 10:00:00' '2024-12-01 10:00:00'");
        process.exit(1);
    }

    await updateDates(eventID, new Date(dateStart), new Date(dateFinish));
    process.exit(0);
}

runPrograms();
