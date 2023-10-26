const http = require('http');
const url = require('url');

const server = http.createServer(function(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const name = parsedUrl.query.name || 'Guest';
    const currentTime = new Date().toLocaleDateString();

    if(!parsedUrl.query.name) {
        res.writeHead(302, {
            'Location': `/labs/lab3/getDate/?name=${name}`
        });
        res.end();
        return;
    }

    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    const response = `
    <div style="color: blue; font-size: 18px; background-color: white;">
        <p>Hello, ${name}!</p>
        <p>The Current Time: ${currentTime}</p>
    </div>
    `;
    res.end(response);
})
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});