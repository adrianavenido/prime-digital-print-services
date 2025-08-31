const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
const port = 3000;

// Enable CORS for all origins
app.use(cors());

// Google Sheets API setup
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: 'https://www.googleapis.com/auth/spreadsheets.readonly',
});

const sheets = google.sheets({ version: 'v4', auth });

// API route to fetch data from Google Sheets
app.get('/get-data', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID, // Use your Google Sheets ID here
      range: 'Sheet1!A1:B10',  // Adjust the range as needed
    });
    res.json(response.data.values);  // Send the data to the frontend
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data from Google Sheets');
  }
});

// Start the backend server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
