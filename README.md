CNJ Adapter
==========
Um adaptador REST para as consultas cnj: https://www.cnj.jus.br/sgt/infWebService.php

Para rodar:

1. npm install;
2. npm start;

Isto expoe um servico REST, por ex:
http://localhost:8080/getArrayDetalhesItemPublicoWS?seqItem=1385&tipoItem=C

Argumentos
----------

### Argumentos com os valores padrão:

--server.port=8080
--profiles=development
--publicIp=ip da primeira interface de rede encontrada na máquina

### Para passar os argumentos:

1. Por variáveis de ambiente:
  `SERVER_PORT=8080 npm start`
  `PROFILES=development node application.json`
2. Argumentos do script node:
  `node application.js --server.port=8080`
3. Via npm (somente a partir da versão 2.0.0). Utilizar -- para delimitar os argumentos da aplicação:
  `npm start -- --server.port=8080`
