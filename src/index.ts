import http from 'http';
import url from 'url';

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  console.log(req.method);
});

server.on('request', () => console.log('Logger run'));

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
