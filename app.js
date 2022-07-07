const http = require('http');
const fs = require('fs');
const qs = require('qs');
const server = http.createServer(function(req, res){
    if(req.method === 'GET') {
        fs.readFile('./views/todo.html',function(err,data){
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.write(data);
            res.end(data);
        })
    } else{
        let data = '';
        req.on('data', chunk =>  {
            data += chunk;
        })
        req.on('end', () => {
            const userInfo = qs.parse(data);
            fs.readFile('./views/display.html','utf-8' ,function(err,datahtml){
                if(err){
                    console.log(err);
                }
                datahtml = datahtml.replace('{work}' , userInfo.work);
                datahtml = datahtml.replace('{content}' , userInfo.content);
                res.writeHead(200,{'Content-Type': 'text/html'});
                res.write(datahtml);
                return res.end();
            })
        })
        res.on('error', err => console.log(err));
    }
})
server.listen(4000,() =>{
    console.log('Server running at http://localhost:3000');
})