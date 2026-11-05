const express = require('express');
const app = express();

// LA LLAVE SECRETA (Debe coincidir con la del HTML)
const SECRET_KEY = "VexisLlaveMaestra2026";

app.get('/unlock', (req, res) => {
    res.json({ key: SECRET_KEY });
});

// Endpoint extra para el UptimeRobot (no hace nada, solo responde OK)
app.get('/', (req, res) => {
    res.send("Vexis Server Online");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor en puerto ' + PORT));