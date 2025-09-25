<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## add instalation
#servidor estatico
  - yarn add @nestjs/serve-static
  - nest g res pokemon --no-spec
  - docker-compose up -d

  - markdown... para editar readme.md

  - yarn add @nestjs/mongoose mongoose
  - yarn add class-validator class-transformer //moidicaf en main.ts
  - nest g mo common
  - nest g pi common/pipes/paseMongoId
  - nest g res seed --no-spec
  - yarn add axios

  ###GIt
  git add .
  git commit -m "PokeNest"
  git remote add origin https://github.com/ImpalaScale2023/NestMongo_avance.git
  git push -u origin main


# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
yarn install
```
3. Tener NEst CLI instalado
```
yanr add -g @nestjs/cli
```
4. Levantar la Base de datos
```
docker-compose up -d
```