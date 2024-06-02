# Acme Ecommerce Web

![Screenshot](./.github/screenshot.png)

Se quiser dar uma olhada em todas as screenshots, click [aqui](https://drive.google.com/drive/folders/16tzahHdVVxuQcwvtXG-ay40JUAl5g2XL?usp=sharing).

## 📌 Índice

- [Tecnologias](#-tecnologias)
- [Projeto](#-sobre-o-projeto)
- [Layout](#-layout)
- [Instalação](#-instalação)
- [Como contribuir](#-como-contribuir)
- [Licença](#-licença)

## ⚙ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [React](https://react.dev)
- [Nextjs (App Router)](https://nextjs.org)

## 💻 Sobre o Projeto

Esse é o front-end do servidor [acme-ecommerce-server](https://github.com/rodrigosuelli/acme-ecommerce-server).

O Acme E-commerce trata-se de um projeto de desenvolvimento parcial de um e-commerce para uma loja de bijuterias e semijoias. O desenvolvimento foi parcial pois foram deixadas de lado questões como: cálculo de frete, rastreamento, emissão de nota fiscal eletrônica, envio do produto e pagamento do pedido.

O site possui as funcionalidades de cadastro, login, visualização e busca de produtos, adição de produtos ao carrinho, fechamento de pedido, e visualização e detalhamento dos pedidos já feitos. Pelo painel CMS do [Strapi](https://strapi.io/) no backend [acme-ecommerce-server](https://github.com/rodrigosuelli/acme-ecommerce-server) os administradores do site podem gerenciar categorias, produtos, pedidos e usuários. O backend também é responsável pela autenticação, envio de emails de 'esqueci minha senha' e armazenamento das imagens e dados dos produtos.

## 🔖 Layout

Você pode visualizar o layout do projeto através desse [link](<https://www.figma.com/design/noR9N7eyd6P8FzB1fWVdhz/ProjetoTCC-(BACKUP)?node-id=194-1330&t=iBITzCyXP0DaoTa6-1>). Lembrando que você precisa ter uma conta no Figma para poder interagir com os componentes do layout.

## 🚀 Instalação

### Pré-requisitos

- Ter [**Git**](https://git-scm.com/) para clonar o projeto.
- Ter [**Node.js**](https://nodejs.org/en/) instalado.
- Ter um gerenciador de pacotes como [**NPM**](https://www.npmjs.com/get-npm) ou [**Yarn**](https://classic.yarnpkg.com/en/) para instalar as dependências do projeto.

### Clonando o Repositório

```bash
git clone https://github.com/rodrigosuelli/acme-ecommerce-web.git

cd acme-ecommerce-web
```

### Instalando as dependências

```bash
$ npm install

# ou

$ yarn
```

### Conectando a aplicação com o servidor

Siga as instruções em [**acme-ecommerce-server**](https://github.com/rodrigosuelli/acme-ecommerce-server) para iniciar o servidor e deixar ele rodando na sua máquina na porta (1337).

### Executando o projeto

OBS: Lembre-se de criar um arquivo .env.local e inserir as variáveis de ambiente com base no arquivo `.env.local.example` presente na raiz do projeto.

```bash
$ npm run dev

# ou

$ yarn dev
```

## 🤔 Como contribuir

1. Faça um fork desse repositório
2. Faça um clone do seu fork (`git clone url-do-seu-fork && cd acme-ecommerce-web`)
3. Crie uma branch com sua feature ou correção de bugs (`git checkout -b minha-branch`)
4. Faça commit das suas alterações (`git commit -m 'feature/bugfix: minhas alterações'`)
5. Faça push para a sua branch (`git push origin minha-branch`)
6. Abra sua Pull Request no repositório que você fez o fork

## 📝 Licença

Este projeto está licenciado sob a licença [MIT](./LICENSE).
