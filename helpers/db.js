import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

const executeQueryString = (query, params = []) => {

    return new Promise((resolve, reject) => {

        //_ ,...means that I dont care this specific param
        db.transaction((tx) => {

            tx.executeSql(
                query, 
                params,
                (_, result) => {
                    resolve(result);
                }, 
                (_, error) => {
                    reject(error);
                }
            );
    
        });
        
    });
}

export const init = () => {
    const createTableQuery = 'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);';
    return executeQueryString(createTableQuery);
};

export const insertPlace = (title, imageUri, address, lat, lng) => {

    const insertQuery = `INSERT INTO places(title, imageUri, address, lat, lng) VALUES (?, ?, ? ,?, ?)`;

    const params = [title, imageUri, address, lat, lng];

    return executeQueryString(insertQuery, params);
}

export const selectAllPlaces = () => {

    const selectQuery = 'SELECT * FROM places';

    return executeQueryString(selectQuery);
}

export const deletePlace = id => {

    const deleteQuery = `DELETE FROM places WHERE id = ?`;

    const params = [id.toString()];

    return executeQueryString(deleteQuery, params);

}