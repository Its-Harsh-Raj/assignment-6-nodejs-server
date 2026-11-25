# Assignment 6: Creating a Simple Web Server with Node.js

## 📋 Project Overview
A modular HTTP web server developed using Node.js core modules (`http`, `fs`, `path`) without third-party frameworks. The server handles client HTTP requests, performs route matching, sets appropriate status codes and MIME headers, and asynchronously serves HTML and CSS files with custom 404 error handling.

---

## ⚙️ How the Server Works

1. **HTTP Module (`http.createServer`)**:
   - Listens on port `3000` (or `process.env.PORT`).
   - Intercepts incoming requests and extracts the `pathname` using the WHATWG `URL` API, normalizing paths and ignoring query strings or trailing slashes.

2. **Asynchronous File Serving (`fs.readFile`)**:
   - The modular helper function `serveFile(res, filePath, contentType, statusCode)` reads the requested files asynchronously from disk to avoid blocking the single-threaded Node.js event loop.
   - Sets appropriate HTTP response headers (e.g. `Content-Type: text/html` or `text/css`) and HTTP status codes (`200 OK`, `404 Not Found`, or `500 Internal Server Error`).

3. **Routing Table**:
   - `GET /` & `GET /home`: Serves `public/home.html` (200 OK)
   - `GET /about`: Serves `public/about.html` (200 OK)
   - `GET /contact`: Serves `public/contact.html` (200 OK)
   - `GET /services`: Serves `public/services.html` (200 OK - Enhanced Route)
   - `GET /style.css`: Serves `public/style.css` (200 OK, MIME: `text/css`)
   - Any unknown path: Serves custom `public/404.html` (404 Not Found)

---

## 🧪 Test Execution Logs

```
=====================================================
🚀 Laundry Mart Server is running on: http://localhost:3000
   Available Routes:
   - Home:     http://localhost:3000/home (or /)
   - About:    http://localhost:3000/about
   - Contact:  http://localhost:3000/contact
   - Services: http://localhost:3000/services
   - 404 Test: http://localhost:3000/random-route
=====================================================
[12:55:51] GET request received for: "/home"
[12:55:51] GET request received for: "/about"
[12:55:51] GET request received for: "/contact"
[12:55:51] GET request received for: "/services"
[12:55:51] GET request received for: "/style.css"
[12:55:51] GET request received for: "/unknown-page"
[404 NOT FOUND] Unhandled route: "/unknown-page"

Test Results:
✔ GET /home         -> Status: 200 OK (1829 bytes)
✔ GET /about        -> Status: 200 OK (2027 bytes)
✔ GET /contact      -> Status: 200 OK (1504 bytes)
✔ GET /services     -> Status: 200 OK (2418 bytes)
✔ GET /style.css    -> Status: 200 OK (Content-Type: text/css)
✔ GET /unknown-page -> Status: 404 Not Found (Custom 404 Page Served)
```

---

## 🏃‍♂️ How to Run Locally

```bash
# 1. Navigate to Assignment 6 directory
cd "D:\Tutedude\MERN Stack\Assignment 6"

# 2. Start the server
npm start
# or: node server.js

# 3. Open in browser:
# http://localhost:3000/home
# http://localhost:3000/about
# http://localhost:3000/contact
# http://localhost:3000/services
```
