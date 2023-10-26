const http = require('http');
const url = require('url');
const fs = require('fs').promises;

const server = http.createServer(async function (req, res) {
    const parsedUrl = url.parse(req.url, true);
    const text = parsedUrl.query.text || 'BCIT';

    if (!parsedUrl.query.text) {
        res.writeHead(302, {
            'Location': `/labs/lab3/writeFile/?text=${text}`
        })
        res.end();
        return;
    }
    try {
        await fs.writeFile("file.txt", `${text}\n`, {
            flag: 'a'
        });
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        const response = `
            <div style="color: blue; font-size: 18px; background-color: white;">
                <p>${text}!</p>
                <p>has been written to file.txt</p>
            </div>`;
        res.end(response);
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Error appending text to file.txt')
    }
})
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});