const express = require('express');
const fs = require('fs');
const app = express();

app.get("/", function (req, res) {
    res.json('Welcome')
});

app.get('/stream', function(req, res) {
    const path = './assets/shubh.mp4';
    const start = fs.statSync(path);
    const fileSize = start.size;
    const range = req.headers.range;
    if(range) {
        const parts  = range.replace(/bytes=/,"").split("-");
         const start = parseInt(parts[0],10);
        const end = parts[1] ? parseInt(parts[0],10) : fileSize -1;
        const ChunkSize = (end-start) + 1;
          const file = fs.createReadStream(path, {start,end} );  

    const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': ChunkSize,
        'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
    }else { const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
    }
    res.writeHead(200,head);
    fs.createReadStream(path).pipe(res);

    }
}); 

app.listen(8004, function () {
    console.log("Listening on port 8004");
});

