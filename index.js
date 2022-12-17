const fs = require('fs');

// Read in the text file
fs.readFile('path/to/file', 'utf8', (err, data) => {
  if (err) throw err;

  // Split the file contents into an array of lines
  const lines = data.split('\n');

  // Initialize an object to hold the insert statements for each table
  const insertsByTable = {};

  // Iterate through the array of lines
  for (const line of lines) {
    // Check if the line starts with the 'INSERT INTO' keyword
    if (line.startsWith('INSERT INTO')) {
      // If it does, get the table name from the line
      const tableName = line.split(' ')[2];

      // If the table name is not in the insertsByTable object, add it and initialize an array for its insert statements
      if (!insertsByTable[tableName]) {
        insertsByTable[tableName] = [];
      }

      // Add the line to the array of insert statements for the table
      insertsByTable[tableName].push(line.replace(';', '')); // Remove the semicolon from the end of the line
    } else {
      // If it doesn't, print the line as is
      console.log(line);
    }
  }

  // Iterate through the keys in the insertsByTable object
  for (const tableName of Object.keys(insertsByTable)) {
    // Get the array of insert statements for the table
    const inserts = insertsByTable[tableName];

    // Get the first insert statement
    const firstInsert = inserts[0];

    // Get the index of the 'VALUES' keyword in the first insert statement
    const valuesIndex = firstInsert.indexOf('VALUES');

    // Get the portion of the first insert statement before the 'VALUES' keyword
    const insertHead = firstInsert.substring(0, valuesIndex);

    // Initialize an array to hold the values for the multiple rows insert statement
    const values = [];

    // Iterate through the array of insert statements
    for (const insert of inserts) {
      // Get the index of the 'VALUES' keyword in the current insert statement
      const valuesIndex = insert.indexOf('VALUES');

      // Get the portion of the current insert statement after the 'VALUES' keyword
      const insertValues = insert.substring(valuesIndex + 'VALUES'.length);

      // Add the insert values to the array of values
      values.push(insertValues);
    }

    // Join the array of values with commas to create the multiple rows insert statement
    const multipleRowsInsert = `${insertHead} VALUES ${values.join(',')};`;

    // Print the multiple rows insert statement
    console.log(multipleRowsInsert);
  }
});
