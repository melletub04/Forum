# Forum
Detta är ett enkelt diskussionsforum byggt med React för frontend och en Node.js-backend med SQLite för att hantera trådar och kommentarer. Användare kan skapa, redigera, visa och kommentera trådar.

## Teknologier
Backend: Node.js, Express, SQLite, BetterSQLite3, CORS, Nodemon

Frontend: React

## Hur man installerar:
### Klona repot
git clone https://github.com/5Heddan5/Forum.git
cd Forum

### Installera Backend
cd forum/Backend
npm install express sqlite3 bettersqlite3 cors nodemon

### Starta Backend-Servern med nodemon
nodemon index.js

### Installera Frontend
Gå in i en ny terminal
cd forum/Frontend
npm install

### Starta Frontend-Servern
npm run dev