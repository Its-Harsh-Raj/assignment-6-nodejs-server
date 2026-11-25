/**
 * Assignment 6: Creating a Simple Web Server with Node.js
 * 
 * Objective: Build a basic web server using the Node.js core 'http' and 'fs'
 * modules to handle different routes and serve corresponding HTML/CSS files.
 * 
 * Author: Harsh Raj (TuteDude MERN Stack Course)
 */

// 1. Import Core Node.js Modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// 2. Define Port and Host
const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

/**
 * Helper function to serve files asynchronously with proper HTTP headers and status codes.
 * 
 * @param {http.ServerResponse} res - The HTTP response object
 * @param {string} filePath - Absolute path to the file on disk
 * @param {string} contentType - MIME type (e.g. 'text/html', 'text/css')
 * @param {number} statusCode - HTTP status code (e.g. 200, 404, 500)
 */
function serveFile(res, filePath, contentType, statusCode = 200) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // Handle internal server errors (e.g. file missing or unreadable)
            console.error(`[500 ERROR] Failed to read file: ${filePath}`, err.message);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 Internal Server Error');
        } else {
            // Respond with the requested file content and headers
            res.writeHead(statusCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

// 3. Create HTTP Server Instance
const server = http.createServer((req, res) => {
    // Normalize URL path by stripping query strings and trailing slashes (except root)
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    let pathname = parsedUrl.pathname.toLowerCase();
    
    // Log incoming requests for server monitoring & grading verification
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${req.method} request received for: "${pathname}"`);

    // 4. Route Handling
    switch (pathname) {
        // Home Route (both '/' and '/home')
        case '/':
        case '/home': {
            const filePath = path.join(__dirname, 'public', 'home.html');
            serveFile(res, filePath, 'text/html', 200);
            break;
        }

        // About Route
        case '/about': {
            const filePath = path.join(__dirname, 'public', 'about.html');
            serveFile(res, filePath, 'text/html', 200);
            break;
        }

        // Contact Route
        case '/contact': {
            const filePath = path.join(__dirname, 'public', 'contact.html');
            serveFile(res, filePath, 'text/html', 200);
            break;
        }

        // Additional Enhanced Route: Services
        case '/services': {
            const filePath = path.join(__dirname, 'public', 'services.html');
            serveFile(res, filePath, 'text/html', 200);
            break;
        }

        // Static CSS Styling Route
        case '/style.css': {
            const filePath = path.join(__dirname, 'public', 'style.css');
            serveFile(res, filePath, 'text/css', 200);
            break;
        }

        // 404 Route for any unmatched paths
        default: {
            console.warn(`[404 NOT FOUND] Unhandled route: "${pathname}"`);
            const filePath = path.join(__dirname, 'public', '404.html');
            serveFile(res, filePath, 'text/html', 404);
            break;
        }
    }
});

// 5. Start Server and Listen on Port 3000
server.listen(PORT, HOST, () => {
    console.log('=====================================================');
    console.log(`🚀 Laundry Mart Server is running on: http://${HOST}:${PORT}`);
    console.log('   Available Routes:');
    console.log(`   - Home:     http://${HOST}:${PORT}/home (or /)`);
    console.log(`   - About:    http://${HOST}:${PORT}/about`);
    console.log(`   - Contact:  http://${HOST}:${PORT}/contact`);
    console.log(`   - Services: http://${HOST}:${PORT}/services`);
    console.log(`   - 404 Test: http://${HOST}:${PORT}/random-route`);
    console.log('=====================================================');
});
