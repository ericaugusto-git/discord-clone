 <table>
 <tr>
   <td style="text-align: center;">
     <a href="https://github.com/ericaugusto-git/discord-clone/blob/main/README.md" target="_blank">
       <img src="https://github.com/ericaugusto-git/ericaugusto-git/assets/56616279/dea722d8-626b-42f0-8ad0-2b92ef1e390e" alt="US flag" width="17px">
        English
     </a>
   </td>
 </tr>
 <tr>
   <td style="text-align: center;">
     <a href="https://github.com/ericaugusto-git/discord-clone/blob/main/README-pt_BR.md" target="_blank">
       <img src="https://github.com/ericaugusto-git/ericaugusto-git/assets/56616279/aef79d33-f000-4730-8444-cc5c52c75d01" alt="Brazil flag" width="17px">
       Português
     </a>
   </td>
 </tr>
</table>

## <img src="https://github.com/user-attachments/assets/83940099-079f-4c06-bebc-6a288aceeb4a" width="30px" align="top"> Discourse - Chat em Tempo Real, Chamadas de Vídeo e Áudio
<p>
  WebApp Fullstack feito com <b>NextJs</b>, <b>Socket.IO</b> e <b>Prisma</b>. 
</p>

![discourse-MadewithClipchamp1-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/bd6cd7d9-940b-4bdf-98c6-9435a2791314)


Este projeto começou como parte deste [curso](https://www.youtube.com/watch?v=ZbX4Ok9YX94) pelo super generoso Code With Antonio, e agora tem um novo design e alguns novos recursos fora do escopo do curso. Confira:
<p>🚀 Deploy: https://discourse-live-chat.onrender.com</p>

### 💡 Principais Funcionalidades

- **💬 Mensagens**
  - Mensagens em tempo real usando [Socket.IO](https://socket.io) WebSocket e fallback de polling com [@tanstack/query](https://tanstack.com/query/latest).
    
    ![direct](https://github.com/user-attachments/assets/5895d329-0ecf-4498-841d-cbe0821aff2f)
- **🔊 Chamadas de Vídeo e Áudio**
  - Chamadas de vídeo e áudio em tempo real com [LiveKit](https://livekit.io)
 
    ![call](https://github.com/user-attachments/assets/34094a39-028f-4161-86ae-c761a707efe4)


- **📎 Anexos**
  - Enviar anexos como mensagens usando [UploadThing](https://uploadthing.com).

- **🗄️ ORM & Banco de Dados**
  - Configuração do ORM com [Prisma](https://www.prisma.io) e MySQL.

- **🔐 Autenticação**
  - Autenticação segura implementada com [Clerk](https://clerk.com).

- **📜 Scroll Infinito**
  - Carregue mensagens em lotes de 15 usando [@tanstack/query](https://tanstack.com/query/latest) para scroll infinito.

- **🏠 Servidores**
  - Crie e personalize servidores onde você pode adicionar canais de áudio, texto e vídeo.
  
    ![server_creation](https://github.com/user-attachments/assets/8ac618c0-040d-4bca-8706-3dd6cf69f263)
- **✏️ Gerenciamento de Mensagens**
  - Exclua e edite mensagens em tempo real.

- **🛠️ Gerenciamento de Membros**
  - Gerencie membros com opções de expulsar, alterar funções (Convidado/Moderador) e mais.
    
    ![image_2024-09-29_144904437](https://github.com/user-attachments/assets/1d65e3d9-4374-4e3e-bef3-a9c477566b79)



### ✨ Alterações e Novas Funcionalidades

- **💅 Nova UI**
  - Nova Interface construída com TailwindCSS e Figma [(clique aqui para ver o design)](https://www.figma.com/design/mW7pmuDuwELvesOq759VIC/Discourse?node-id=0-1&t=tAIdE2khFXYmdgcG-1).

- **🌗 Modo Claro / Escuro**
  - Suporte para temas claro e escuro com [TailwindCSS](https://tailwindcss.com)
    
    ![theme](https://github.com/user-attachments/assets/cac842b0-a9b7-49c2-88de-194fae76e422)

- **📱 Totalmente Responsivo**

    ![responsive](https://github.com/user-attachments/assets/1135d0cf-5b75-4c99-a54f-a81abf13c4e8)

- **🗄️ Novo Servidor MySql**
  - Devido ao fim do plano free "forever" da Planetscale, agora estou hospedando o banco de dados MySQL no [Aiven](https://aiven.io) 

- **👋 Página de Boas-Vindas**
  - Página inicial com CTA para convidar amigos para conversar ou criar um servidor.

- **✉️ Directs 1:1**
  - Mensagens diretas e chamadas de vídeo e áudio 1:1.
  
- **📞 Notificação de Chamadas Diretas**
  - Seja notificado sobre chamadas com opções de aceitar ou rejeitar.
  
    ![directs_notification](https://github.com/user-attachments/assets/e0949910-ec15-4c7e-ac8b-024447204904)
- **🔔 Notificação de Mensagens Diretas**
  - Usando [sonner](https://ui.shadcn.com/docs/components/sonner) para notificação de novas mensagens diretas.
 
    ![sonner](https://github.com/user-attachments/assets/387684c4-214a-4ce3-b4fb-11be8228292f)
- **🔗 Sistema de Convites**
  - Gere links de convite únicos para servidores e mensagens diretas.
 
## 🛠️ Rodar Discourse Localmente

### 1. Clone o projeto
```bash
git clone https://github.com/ericaugusto-git/discord-clone.git
cd discord-clone
```
### 2. Instale as dependências
```bash
npm install
# or
yarn install
```

### 3. Configure as Variáveis de Ambiente
Crie um arquivo .env na raiz do seu projeto e adicione as seguintes variáveis de ambiente:
```bash
# Clerk (Authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/setup
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/setup

# Prisma (Database)
DATABASE_URL='mysql://<your-database-credentials>'

# UploadThing (File Uploads)
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
UPLOADTHING_TOKEN=

# LiveKit (Real-time Video/Audio)
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_URL=wss://<your-livekit-url>

# Misc
WDS_SOCKET_PORT=0
NODE_ENV=production
```
### 4. Prisma Setup
 ```bash
prisma init
npx prisma migrate dev
```
### 5. Agora é só rodar :D
```
npm run dev
# or
yarn dev
```

## ⚠️ Aviso
Este projeto é destinado apenas para fins educacionais. Esteja ciente de que, como qualquer plataforma onde os usuários podem enviar conteúdo, há o risco de materiais inadequados ou ofensivos serem compartilhados. Os mantenedores do projeto não são responsáveis por qualquer conteúdo enviado pelos usuários. É recomendável implementar práticas de moderação de conteúdo caso você deseje disponibilizar este projeto publicamente.
