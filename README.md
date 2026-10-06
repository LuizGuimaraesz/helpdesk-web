# HelpDesk Web

Frontend em React, TypeScript e Vite.

## Desenvolvimento local

Use Node.js 24.x (também definido em `.nvmrc`).

```sh
npm ci
```

Copie `.env.example` para `.env.local` e ajuste `VITE_API_URL` se a API local usar outro endereço. Sem configuração local, o desenvolvimento usa `http://localhost:3333`.

```sh
npm run dev
```

## Deploy na Vercel

Importe o repositório na Vercel e selecione a pasta que contém este `package.json` como **Root Directory**. As configurações de build estão em `vercel.json`:

| Configuração | Valor |
| --- | --- |
| Framework | Vite |
| Node.js | 24.x |
| Instalação | `npm ci` |
| Build | `npm run build` |
| Diretório de saída | `dist` |
| API de produção | `https://helpdesk-api-tgu0.onrender.com` |

O arquivo `.env.production` já define a API informada. Se quiser gerenciar a URL pelo painel da Vercel, cadastre `VITE_API_URL=https://helpdesk-api-tgu0.onrender.com` no ambiente **Production**. Para previews, o mesmo endereço é usado por padrão; configure outra URL no ambiente **Preview** se precisar de uma API separada.

As variáveis `VITE_` são públicas e incorporadas ao JavaScript durante o build. Alterações exigem um novo deploy. Nunca coloque tokens, senhas ou segredos nessas variáveis ou no `.env.production` versionado. Arquivos `.env.local` e `.env.production.local` são ignorados pelo Git.

O build valida a URL da API e recusa URL ausente, inválida, HTTP ou localhost em produção. A regra de rewrite em `vercel.json` permite acessar e atualizar rotas internas diretamente sem erro 404.

## Verificação antes de publicar

```sh
npm run build
npm run preview
```

O preview serve o build com a API de produção. No navegador, confira login, navegação por perfil, atualização de uma rota interna e logout. Após o deploy, repita essa verificação no domínio da Vercel. A API precisa aceitar requisições desse domínio via CORS; essa configuração pertence ao backend.

Referências: [Vite na Vercel](https://vercel.com/docs/frameworks/frontend/vite), [variáveis de ambiente do Vite](https://vite.dev/guide/env-and-mode).
