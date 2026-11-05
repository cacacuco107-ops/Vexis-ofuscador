const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

// LA LLAVE SECRETA (Nunca sale de aquí)
const SECRET_KEY = "TU_LLAVE_SECRETA_AQUI"; 
// El código de autorización (Dola lo recomendó)
const AUTH_CODE = "VexisAuth2026";

app.post('/unlock', (req, res) => {
    const { payload, auth } = req.body;

    // 1. Verificación de Origen
    if (auth !== AUTH_CODE) {
        return res.status(403).json({ error: "No autorizado" });
    }

    if (!payload) {
        return res.status(400).json({ error: "Falta payload" });
    }

    try {
        // 2. Desencriptación (Doble Base64 + XOR)
        // En Render hacemos lo mismo que hace el script de Lua, pero en JS.
        const step1 = Buffer.from(payload, 'base64').toString('utf-8');
        
        let step2 = "";
        for (let i = 0; i < step1.length; i++) {
            step2 += String.fromCharCode(step1.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length));
        }
        
        const cleanSource = Buffer.from(step2, 'base64').toString('utf-8');

        // 3. Devolvemos el código limpio, NO la llave.
        res.json({ code: cleanSource });

    } catch (e) {
        res.status(500).json({ error: "Error de desencriptación" });
    }
});

app.get('/', (req, res) => res.send("Vexis Server Online"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor en puerto ' + PORT));