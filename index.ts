import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'query-string';
import * as url from 'url';
import { writeFile } from 'fs';
import { request } from 'https';

const port = 5000; 
let resposta = '';
const server = createServer((
    request: IncomingMessage,
    response: ServerResponse)=>{
        const urlparse = url.parse(request.url?request.url:'',true);
        const params = parse(urlparse.search? urlparse.search: ''); 

        if(urlparse.pathname == './criar-atualizar-usuario') {
            writeFile('users/' + params.id + '.txt', JSON.stringify(params), function(err: any){
                if(err) throw err;
                resposta = 'Usuário criado com sucesso';
                response.statusCode = 100;
                response.setHeader('Content-Type','text/plain');
                response.end(resposta);
                
            })
        }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

