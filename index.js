const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { format } = require('date-fns');

const app = express();

// Endpoint to create a text file with current date and time in a particular folder
app.get('/', async (req, res) => {
    const folderName = 'TimeStamp'; // Specify the folder name here
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

//New endpoint to retrieve all text files in a folder
app.get("/getTextFiles", (req, res) => {
    const folderPath = "TimeStamp";
  
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send("An error occured while listing the files from directory");
      } else {
        const textFiles = files.filter((file) => path.extname(file) === ".txt");
        res.status(200).json(textFiles);
      }
    });
  });

// Start the server
app.listen(3000)
