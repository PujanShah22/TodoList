import * as SQLite from "expo-sqlite";

//Connection is initialised globally
const db = SQLite.openDatabase("todoDatabase.db");

/**
 * Create table for the first time if it does not exist &
 * It won't create if already exists.
 */
export function initDatabase(db: SQLite.Database) {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT);"
    );
  });
}

export default db;