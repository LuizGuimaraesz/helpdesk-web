# HelpDesk Web

Aplicação web para gerenciamento de chamados de suporte, com experiências específicas para clientes, técnicos e administradores. O frontend permite acompanhar atendimentos, consultar custos e gerenciar serviços e usuários, consumindo uma API REST separada.

## Funcionalidades

| Perfil        | Recursos                                                                                                                                                              |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cliente       | Criar uma conta, abrir chamados com uma categoria de serviço e consultar os próprios chamados, status e custos.                                                       |
| Técnico       | Visualizar os chamados atribuídos, iniciar e encerrar atendimentos, adicionar e remover serviços adicionais e consultar sua disponibilidade.                          |
| Administrador | Acompanhar chamados, atualizar status, gerenciar clientes, cadastrar e editar técnicos e seus horários, cadastrar e editar serviços e ativar ou desativar categorias. |

Todos os perfis autenticados podem editar nome e e-mail, alterar a senha e encerrar a sessão. A interface possui layouts adaptados para dispositivos móveis e desktop.

Os chamados são organizados em três estados:

| Estado na API | Exibição       |
| ------------- | -------------- |
| `open`        | Aberto         |
| `in_progress` | Em atendimento |
| `closed`      | Encerrado      |

O detalhamento apresenta descrição, categoria, cliente, técnico, datas e composição do custo: serviço inicial mais serviços adicionais.

## Tecnologias

| Tecnologia            | Uso                                              |
| --------------------- | ------------------------------------------------ |
| React 19              | Componentes e estado da interface.               |
| TypeScript 6          | Tipagem dos dados, contratos e componentes.      |
| Vite 8                | Servidor de desenvolvimento e build de produção. |
| React Router 7        | Navegação e seleção das rotas por perfil.        |
| Tailwind CSS 4        | Estilos, responsividade e tokens visuais.        |
| Axios                 | Comunicação HTTP com a API.                      |
| Zod 4                 | Validação de formulários e da sessão persistida. |
| Lucide React          | Ícones da interface.                             |
| clsx e tailwind-merge | Composição de classes CSS.                       |
| Fontsource            | Fonte Lato servida com os arquivos da aplicação. |

As dependências e os scripts estão definidos em [package.json](./package.json). O [package-lock.json](./package-lock.json) registra as versões usadas na instalação.

## Executando localmente

### Pré-requisitos

- Node.js **24.x**, conforme `engines` e [.nvmrc](./.nvmrc).
- npm instalado com o Node.js.
- API HelpDesk acessível, localmente ou em um ambiente remoto.

### Instalação

Com o repositório clonado, abra um terminal na pasta que contém o `package.json` deste frontend:

```sh
npm ci
```

Copie [.env.example](./.env.example) para `.env.local`.

No PowerShell:

```powershell
Copy-Item .env.example .env.local
```

No Linux ou macOS:

```sh
cp .env.example .env.local
```

Configure o endereço da API em `.env.local`:

```dotenv
VITE_API_URL=http://localhost:3333
```

Para usar a API hospedada no Render durante o desenvolvimento, substitua o valor por `https://helpdesk-api-tgu0.onrender.com`. As operações realizadas pela interface serão enviadas à API escolhida.

Inicie o frontend:

```sh
npm run dev
```

Abra a URL exibida pelo Vite no terminal. Cadastre uma conta de cliente em `/signup` ou entre com um usuário existente. O papel recebido da API determina a interface disponível; contas administrativas e técnicas dependem do cadastro e das permissões definidos pelo backend.

No Windows, caso a política do PowerShell bloqueie `npm.ps1`, use `npm.cmd` nos comandos, por exemplo `npm.cmd run dev`.

## Variáveis de ambiente

| Variável       | Finalidade                                                                                                | Exemplo local           |
| -------------- | --------------------------------------------------------------------------------------------------------- | ----------------------- |
| `VITE_API_URL` | URL base usada pelo Axios para acessar o backend. Configure antes de iniciar o servidor ou gerar o build. | `http://localhost:3333` |

A URL deve apontar para a base da API, sem acrescentar endpoints como `/sessions` ou `/tickets`.

Arquivos `.env.local` e `.env.production.local` são ignorados pelo Git. Para gerar um build local com a API remota, crie `.env.production.local`:

```dotenv
VITE_API_URL=https://helpdesk-api-tgu0.onrender.com
```

O arquivo específico de produção tem prioridade sobre `.env.local`; variáveis definidas no ambiente do build têm prioridade sobre os arquivos. Reinicie o servidor após editar a configuração. As variáveis `VITE_` são incorporadas ao JavaScript no build, portanto são públicas e alterações em produção exigem um novo deploy. Reserve esse prefixo para configurações públicas, como a URL da API. [Documentação do Vite](https://vite.dev/guide/env-and-mode).

## Scripts

| Comando           | Descrição                                                                      |
| ----------------- | ------------------------------------------------------------------------------ |
| `npm run dev`     | Inicia o servidor de desenvolvimento.                                          |
| `npm run build`   | Executa a verificação do TypeScript e gera os arquivos de produção em `dist/`. |
| `npm run preview` | Serve o build gerado para conferência local.                                   |

Para conferir a versão de produção, configure a URL da API e execute:

```sh
npm run build
npm run preview
```

O preview utiliza a configuração incorporada ao último build. Sua finalidade é validar os arquivos antes da publicação.

## Organização do projeto

```text
helpdesk-web/
├── public/                # Arquivos estáticos, incluindo o fundo do login
├── src/
│   ├── assets/            # Logos e outros arquivos importados pelo código
│   ├── components/        # UI, layouts e recursos de cada domínio
│   ├── contexts/          # Estado e ciclo de vida da autenticação
│   ├── hooks/             # Acesso ao contexto de autenticação
│   ├── pages/             # Telas públicas, compartilhadas e por perfil
│   ├── routes/            # Rotas de autenticação e dos três perfis
│   ├── services/          # Cliente Axios e chamadas aos endpoints
│   ├── types/             # Tipos de usuários, serviços e chamados
│   ├── utils/             # Conversão, formatação, custos e mensagens de erro
│   ├── App.tsx            # Composição principal da aplicação
│   ├── index.css          # Estilos globais e tokens do tema
│   └── main.tsx           # Entrada da aplicação React
├── .env.example           # Exemplo de configuração local
├── .nvmrc                 # Versão do Node.js
├── index.html             # Documento HTML de entrada
├── package.json           # Dependências e comandos
├── vercel.json            # Rewrite para navegação da SPA
└── vite.config.ts         # Configuração do Vite e Tailwind CSS
```

As páginas coordenam o carregamento dos dados e as ações do usuário. Os módulos de `services/` concentram as chamadas HTTP; `types/` descreve os contratos e `utils/` adapta os dados para apresentação. Os componentes reutilizáveis de interface ficam em `components/ui/`, junto às pastas de cada domínio.

## Rotas

| Rota                 | Acesso                           | Finalidade                                        |
| -------------------- | -------------------------------- | ------------------------------------------------- |
| `/`                  | Público                          | Login.                                            |
| `/login`             | Público                          | Redirecionamento para `/`.                        |
| `/signup`            | Público                          | Cadastro de cliente.                              |
| `/tickets`           | Cliente, técnico e administrador | Listagem ou painel de chamados conforme o perfil. |
| `/tickets/new`       | Cliente                          | Abertura de chamado.                              |
| `/tickets/:ticketId` | Cliente, técnico e administrador | Detalhamento e ações permitidas ao perfil.        |
| `/clients`           | Administrador                    | Gestão de clientes.                               |
| `/technicians`       | Administrador                    | Listagem de técnicos.                             |
| `/technicians/new`   | Administrador                    | Cadastro de técnico.                              |
| `/technicians/:id`   | Administrador                    | Edição de técnico e disponibilidade.              |
| `/services`          | Administrador                    | Gestão do catálogo de serviços.                   |
| `/technician`        | Técnico                          | Redirecionamento para `/tickets`.                 |

A seleção de rotas ocorre em [src/routes/index.tsx](./src/routes/index.tsx). Sem sessão, a aplicação apresenta as rotas públicas. Após o login, cada perfil utiliza seu próprio conjunto de rotas; caminhos desconhecidos são redirecionados para a página inicial desse conjunto.

## Autenticação e integração com a API

O [AuthContext](./src/contexts/AuthContext.tsx) mantém a sessão em memória e tenta persistir os dados no `localStorage`, usando as chaves `@helpdesk:user` e `@helpdesk:token`. Na inicialização, os dados são validados com Zod; dados incompletos ou inválidos são descartados.

As requisições autenticadas recebem o cabeçalho `Authorization: Bearer <token>`. Uma resposta `401` de uma requisição associada à sessão atual encerra essa sessão, exceto no endpoint de login. Uma resposta `403` não encerra a sessão. O logout limpa a autenticação e retorna à interface pública.

Os módulos em [src/services](./src/services) integram sessões, usuários, técnicos, serviços e chamados. Autorização, regras de negócio e persistência dos dados são responsabilidades do backend. O roteamento por perfil no frontend organiza a interface; as permissões de cada operação devem ser verificadas pela API.

## Futuras implementações

-Adicionar upload de imagem para clientes, técnicos e administrador
-Reatribuição de técnicos

## Deploy na Vercel

A API de produção utilizada pelo projeto está em [HelpDesk API no Render](https://helpdesk-api-tgu0.onrender.com).

Link do deploy frontend [HelpDesk WEB na Vercel](https://helpdesk-web-wine.vercel.app/).
