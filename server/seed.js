import Database from "better-sqlite3";
const db = new Database("database.db"); //connect to database to get SQL methods

db.exec(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    message TEXT
)`);

db.exec(`INSERT INTO messages (username, message)
VALUES
('HoochTheDog', 'Anyone got any tennis balls? 🎾')`);
