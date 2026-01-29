const express = require("express");
const cors = require("cors");
const Database = require("@replit/database");

const db = new Database();
const app = express();

app.use(cors());
app.use(express.json());

// Shops abrufen
app.get("/shops", async (req, res) => {
  const shops = (await db.get("shops")) || [];
  res.json(shops);
});

// Shop hinzufügen
app.post("/shops", async (req, res) => {
  const { name, owner, coords } = req.body;

  if (!name || !owner || !coords) {
    return res.status(400).json({ error: "Fehlende Daten" });
  }

  const shops = (await db.get("shops")) || [];
  shops.push({ name, owner, coords });

  await db.set("shops", shops);

  res.json({ success: true });
});

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
