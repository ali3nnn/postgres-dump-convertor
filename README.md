# Motivation

I create this script to help me convert a postgres dump form having multiple INSERT statements for one table to have one INSERT statements of more rows per each table. You can achieve the same result by using `pg_dump` with the following parameters: `--inserts --row-per-insert=NNN` (`NNN` = number of rows per `INSERT`)

# Description

This script reads in a text file containing SQL `INSERT INTO` statements and converts them into a single multiple rows `INSERT INTO` statement for each table.

## How it works

1. The script reads in the text file and splits its contents into an array of lines.
2. It iterates through the array of lines and checks if each line starts with the `INSERT INTO` keyword.
3. If a line does start with the `INSERT INTO` keyword, it extracts the table name from the line and adds it to an object that holds the insert statements for each table.
4. If a line does not start with the `INSERT INTO` keyword, it prints the line as is.
5. When all lines have been processed, the script iterates through the keys in the object and creates a single multiple rows `INSERT INTO` statement for each table by joining the array of insert statements for the table with commas.

## Example

Input:
```
INSERT INTO table1 (col1, col2) VALUES (1, 'a');
INSERT INTO table1 (col1, col2) VALUES (2, 'b');
INSERT INTO table2 (col1, col2) VALUES (3, 'c');
```

Output:
```
INSERT INTO table1 (col1, col2) VALUES (1, 'a'), (2, 'b');
INSERT INTO table2 (col1, col2) VALUES (3, 'c');
```

## Usage

To use this script, replace the `test/inputFile` argument in the `fs.readFile` function with the path to your input file and run the script using Node.js.
```
node script.js > test/outputFile
```

### Note

The script and the readme page was created using chat.openai.com
