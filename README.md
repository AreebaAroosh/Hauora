# Hauora
Projeto do TCC

O projeto esta divido em duas pastas:
* Front-end
* Back-end

Abaixo seguem as instruções para fazer a instalação de tudo o que é necessário para rodar o projeto.

## Instruções

O primeiro passo é clonar o projeto, note que o projeto back-end e front-end estão nesse mesmo projeto, portanto ao clonar você está clonando os dois, ele está somente dividido em pastas diferentes.

Para controlar o git eu estou usando o próprio software do [Github](https://desktop.github.com/), mas se você preferir pode usar o terminal mesmo.

Clone o projeto:
```
git clone https://github.com/muriloe/Hauora.git
```
Apos finalizar a instalação você precisa instalar o node e o angular:

### Node

Para instalar o node acesse: 
````
https://nodejs.org/en/download/
````

Após terminar a instalação, navegue pelo terminar node até a pasta onde você clonou o projeto e então acesse a pasta back-end. No terminal digite:
````
npm install --save
````
Esse comando baixa todas as dependências do projeto.

Feito isso podemos iniciar o servidor:
````
node app.js
ou
nodemon app.js
````

Agora no navegador você pode acessar:
````
localhost:3000
ou também já acessar pedindo um dado
http://localhost:3000/api/pessoas/Murilo
````
### Angular

Para instala o angular devemos navegar pelo terminal até a pasta /Haoura/front-end, então devemos instalar o angular:

````
npm install -g @angular/cli
ou
sudo npm install -g @angular/cli
````

Após instalar o angular, devemos instalar os pacotes:
````
npm install
````

Feito isso podemos rodar a aplicação angular:
````
ng s
````
Pronto!!! Agora você pode acessar no navegador o app angular:
````
Normalmente localhost:4200
o terminal mostra em que porta o servidor vai rodar
````

## Estrutura do projeto
Como já comentado o projeto node e angular funcionam de formas independentes. Um funciona sem que o outro estar funcionando. Claro que se iniciarmos o angular sem o node a aplicação não consigira obter nenhuma informação.
Dessa maneira também o servidor node pode responder tanto para o app iOS quando para o web Angular.

### Banco de dados
Estamos utilizando o banco de dados mongodb, para facilitar a vida estou utilizando o [mLab](https://mlab.com/home), nele o banco já está configurado, portanto a aplicação node aponta direto para ele, não precisando assim levantar o servidor localmente.




