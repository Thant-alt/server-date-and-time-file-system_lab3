const http = require('http');
const url = require('url');
const fs = require('fs').promises;
const path = require('path');

const server = http.createServer(async function(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const filename = parsedUrl.query.filename;

    if(!filename) {
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        })
        res.end('File name is not provided in the query parameter');
        return;
    }
    try {
        const filePath = path.join(__dirname, '..', 'writeFile', filename);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        console.log("Entering try block22");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const response = `
            <div style="color: green; font-size: 18px; background-color: white;">
                <p>Content of ${filename}:</p>
                <pre>${fileContent}</pre>
            </div>`;

        res.end(response);
        

    }catch(error) {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        })
        res.end("Error reading the file.");
    }
})

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});