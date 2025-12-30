# 🎮 Game Search Application - Eneba Clone

Žaidimų paieškos tinklalapis, sukurtas pagal Eneba dizainą. Naudoja React frontend ir Node.js backend.

## ✅ Užduoties Reikalavimai

- ✅ **Paieškos funkcionalumas** - fuzzy paieška pagal žaidimų pavadinimus
- ✅ **Dizainas pagal screenshot** - tikslus Eneba spalvų ir išdėstymo atkartojimas
- ✅ **Mažiausiai 3 žaidimai**: FIFA 23, Red Dead Redemption 2, Split Fiction (iš viso 10 įrašų)
- ✅ **React frontend** - modernūs komponentai su hooks
- ✅ **Node.js backend** - Express.js REST API
- ✅ **Viešos API** - `/api/list` ir `/api/list?search=<gamename>`
- ✅ **SQL duomenų bazė** - SQLite su pilna schema

## 🚀 Greitas Paleidimas

```bash
# Įdiegti visas priklausomybes
npm run install-all

# Paleisti abu serverius
npm run dev
```

**Arba atskirai:**
```bash
# Backend (Terminal 1)
cd backend && npm run dev

# Frontend (Terminal 2) 
cd frontend && npm start
```

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📁 Projekto Struktūra

```
├── backend/                 # Node.js Express API
│   ├── config/             # Duomenų bazės konfigūracija
│   ├── routes/             # API maršrutai
│   ├── data/               # SQLite duomenų bazė
│   ├── public/images/      # Žaidimų nuotraukos
│   └── server.js           # Pagrindinis serverio failas
├── frontend/               # React aplikacija
│   ├── src/
│   │   ├── components/     # React komponentai
│   │   ├── App.js          # Pagrindinis App komponentas
│   │   └── App.css         # Globalūs stiliai
│   └── public/             # Statiniai failai
└── README.md
```

## 🎯 Žaidimai Duomenų Bazėje

**Split Fiction** (4 variantai):
- EA App Key (PC) GLOBAL - €40.93
- Xbox Series X|S EUROPE - €34.14  
- Xbox Series X|S GLOBAL - €35.15
- Nintendo Switch EUROPE - €36.25

**FIFA 23** (3 variantai):
- Standard Edition (PC) Origin - €29.99
- PlayStation 5 PSN EUROPE - €34.99
- Ultimate Edition Xbox GLOBAL - €44.99

**Red Dead Redemption 2** (3 variantai):
- PC Rockstar Key GLOBAL - €24.99
- Ultimate Edition PC Steam - €39.99
- PlayStation 4 PSN EUROPE - €19.99

## 🖼️ Žaidimų Nuotraukos

**RAWG Gaming API** - nemokamas, oficialus žaidimų duomenų šaltinis:
- ✅ **Aukštos kokybės** cover images
- ✅ **Legalus** naudoti komercinėms aplikacijoms  
- ✅ **Patikimas** CDN hosting
- ✅ **CORS friendly** - veikia iš browser

**Nuotraukų šaltiniai:**
- Split Fiction: `https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg`
- FIFA 23: `https://media.rawg.io/media/games/83f/83f6f70a7c1b86cd2637b029d8b42caa.jpg`  
- Red Dead Redemption 2: `https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg`
- Backup: Custom SVG placeholder

## 🔧 API Endpoints

- `GET /api/health` - Serverio būsenos tikrinimas
- `GET /api/list` - Visi žaidimai
- `GET /api/list?search=<pavadinimas>` - Paieška (fuzzy search)
- `GET /api/games/:id` - Konkretus žaidimas pagal ID

## 🎨 Dizaino Ypatybės

- **Spalvų schema**: Tikslus Eneba tamsiai mėlynas gradientas
- **Tipografija**: Švarūs, skaitomi šriftai
- **Animacijos**: Smooth hover efektai ir perėjimai
- **Responsive**: Prisitaiko prie mobiliųjų įrenginių
- **Profesionalus**: Be emoji, su tikromis ikonoms (SVG)

## 🌐 Deployment

### Vercel (Rekomenduojama):
```bash
npm i -g vercel
vercel --prod
```

### Kitos opcijos:
- **Netlify** (Frontend) + **Railway** (Backend)
- **GitHub Pages** + **Heroku**
- **Docker** konteineriai

Detalūs instrukcijos: `DEPLOYMENT.md`

## 🛠️ Technologijos

- **Frontend**: React 18, CSS3, SVG ikonos
- **Backend**: Node.js, Express.js, CORS
- **Duomenų bazė**: SQLite3
- **Stiliai**: Custom CSS su Eneba dizainu

## 📊 Duomenų Bazės Schema

```sql
CREATE TABLE games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  platform TEXT,
  region TEXT, 
  price REAL,
  original_price REAL,
  discount INTEGER,
  image_url TEXT,
  cashback BOOLEAN DEFAULT 0,
  rating REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔍 Testavimas

Patikrinkite šiuos endpoint'us:
```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/list
curl "http://localhost:5000/api/list?search=fifa"
```

Aplikacija pilnai funkcionali ir paruošta production aplinkoms!