## Descrição

Necessário ter o [Docker](https://docs.docker.com/engine/install/) instalado.

## Instalação

```bash
$ docker compose up -d --build
```

## Url Docs
[Url](http://localhost:3000/docs) Docs

## Rotina
A rotina para inserir as universidades no banco de dados roda todos os dias a 1AM.
Caso queria rodar antes do tempo poderá alterar o arquivo university.controller.ts linha 15
para EVERY_30_SECONDS e rodar o build novamente do docker.

## Env
Necessário criar um arquivo .env na raiz do projeto. Pegar o env-example como base.

## Servidor
http://localhost:3000

