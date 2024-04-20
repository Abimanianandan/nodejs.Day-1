const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { format } = require('date-fns');

const app = express();

// Endpoint to create a text file with current date and time in a particular folder
app.get('/createTextFile', async (req, res) => {
    const folderName = 'date & time'; // Specify the folder name here
    try {
        // Create the folder if it doesn't exist
        await fs.mkdir(path.join(__dirname, folderName), { recursive: true });

        // Get the current date and time
        const currentDateTime = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');

        // Construct the file path
        const filePath = path.join(__dirname, folderName, `${currentDateTime}.txt`);

        // Write the current date and time to the file
        await fs.writeFile(filePath, currentDateTime);

        res.status(200).send(`Text file created at: ${filePath}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while creating the text file.');
    }
});

// Start the server
app.listen(3000)
