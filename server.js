const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    const clan = {
        name: "Void Hunters",
        network: "opsucht.net",
        tagline: "Wir jagen nicht Kills – wir jagen Dominanz.",
        description: "Void Hunters ist ein kompetitiver Clan auf opsucht.net mit Fokus auf Teamplay, Aim und cleanem Movement.",
        focus: ["BedWars", "SkyPvP", "Practice", "Events"],
        recruitmentOpen: true,
        requirements: [
            "Mindestens 14 Jahre alt",
            "Aktiv auf opsucht.net",
            "Teamfähig, kein Ego-Trip",
            "Discord & funktionierendes Mikro",
            "Grundverständnis von Calls & Rotations"
        ],
        socials: {
            discord: "https://discord.gg/deinlink",
            opsuchtProfile: "https://opsucht.net",
            youtube: "#",
            twitch: "#"
        },
        roster: [
            { name: "Rocket", role: "Leader", note: "Shotcaller & Strat-Brain" },
            { name: "VoidNova", role: "Co-Leader", note: "Aim Demon" },
            { name: "Skylur", role: "Core", note: "Support & Clutch" },
            { name: "Nyx", role: "Core", note: "Entry & Pressure" }
        ]
    };

    res.render("index", { clan });
});

app.listen(PORT, () => {
    console.log(`Void Hunters Website läuft auf Port ${PORT}`);
});
