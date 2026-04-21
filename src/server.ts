import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const CLARK_URL = process.env.CLARK_SERVER_URL || 'https://clark-server.com/ping';
console.log(`Target Clark Server URL: ${CLARK_URL}`);


const pingClarkServer = async () => {
    try {
        const response = await axios.get(CLARK_URL);
        console.log(`[${new Date().toISOString()}] Ping successful: ${response.status}`);
    } catch (error: any) {
        console.error(`[${new Date().toISOString()}] Ping failed: ${error.message}`);
    }
};

app.get('/status', (req: Request, res: Response) => {
    res.json({ 
        status: "Pinger service is running", 
        target: CLARK_URL,
        timestamp: new Date() 
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Pinger API online at port ${PORT}`);
    
    pingClarkServer();

    const MINUTES = 14;
    setInterval(pingClarkServer, MINUTES * 60 * 1000);
});