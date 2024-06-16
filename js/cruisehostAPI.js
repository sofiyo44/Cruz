require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let selectedCruiseID = null;  // This will store the selected cruise ID

// Middleware to check for an authorization token
const checkAuth = (req, res, next) => {
    const authToken = req.headers['authorization'];
    if (authToken === 'your-local-auth-token') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};

// Mock data: Simulated database query result for cruise details
const cruiseDetails = {
    1: { id: 1, name: 'Caribbean Cruise', details: 'A beautiful cruise to the Caribbean islands.', price: 1000 },
    2: { id: 2, name: 'Mediterranean Cruise', details: 'A luxurious cruise around the Mediterranean sea.', price: 1500 },
    3: { id: 3, name: 'Alaska Cruise', details: 'An adventurous cruise to the Alaskan wilderness.', price: 2000 },
    4: { id: 4, name: 'European Cruise', details: 'A scenic cruise through Europe.', price: 1800 },
    5: { id: 5, name: 'Caribbean Luxury Cruise', details: 'A luxurious cruise through the Caribbean islands.', price: 2500 },
    6: { id: 6, name: 'Northern Europe Cruise', details: 'A breathtaking cruise through Northern Europe.', price: 2300 },
};

// Endpoint to handle search parameters and interact with external API
app.get('/search', checkAuth, async (req, res) => {
    try {
        const response = await axios.get('https://rest.api.cruisehost.net/api/v1/cruises', {
            headers: {
                'Authorization': `Bearer ${process.env.EXTERNAL_API_TOKEN}`
            },
            params: req.query
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from external API', error: error.message });
    }
});

// Endpoint to handle cruise selection
app.post('/cruise/select', checkAuth, (req, res) => {
    const { cruiseID } = req.body;
    if (cruiseID) {
        selectedCruiseID = cruiseID;
        res.status(200).send('Cruise ID selected successfully.');
    } else {
        res.status(400).send('Cruise ID is required.');
    }
});

// Endpoint to get details of the selected cruise
app.get('/cruise/details', checkAuth, async (req, res) => {
    if (!selectedCruiseID) {
        return res.status(400).send('No cruise ID selected.');
    }

    try {
        const response = await axios.get(`https://rest.api.cruisehost.net/api/v1/cruises/${selectedCruiseID}`, {
            headers: {
                'Authorization': `Bearer ${process.env.EXTERNAL_API_TOKEN}`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cruise details from external API', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Cruise booking API is running at http://localhost:${port}`);
});