
## <img src="https://github.com/user-attachments/assets/83940099-079f-4c06-bebc-6a288aceeb4a" width="30px" align="top"> Discourse - Real-Time Chat, Video & Audio Calls
<p>
  Fullstack WebApp made with <b>NextJs</b>, <b>Socket.IO</b> and <b>Prisma</b>. 
</p>


This project started as part of [this course](https://www.youtube.com/watch?v=ZbX4Ok9YX94) by the extremely generous Code With Antonio, and now it has a new design and some new features outside of the course scope. Check it out:
<p>🚀 Deploy: https://discourse-live-chat.onrender.com</p>

### 💡 Main Features

- **💬 Messaging**
  - Real-time messaging using [Socket.IO](https://socket.io) WebSocket and a [@tanstack/query](https://tanstack.com/query/latest) polling fallback.
    
    ![direct](https://github.com/user-attachments/assets/5895d329-0ecf-4498-841d-cbe0821aff2f)
- **🔊 Video and Audio call**
  - Realtime video and audio call with [LiveKit](https://livekit.io)
 
    ![call](https://github.com/user-attachments/assets/34094a39-028f-4161-86ae-c761a707efe4)


- **📎 Attachments**
  - Send attachments as messages using [UploadThing](https://uploadthing.com).

- **🗄️ ORM & Database**
  - ORM setup using [Prisma](https://www.prisma.io) with MySQL. 

- **🔐 Authentication**
  - Secure authentication implemented with [Clerk](https://clerk.com).

- **📜 Infinite Scrolling**
  - Load messages in batches of 15 using [@tanstack/query](https://tanstack.com/query/latest) for infinite scrolling.

- **🏠 Servers**
  - Create and customize servers where you can add audio, text and video channels.
  
    ![server_creation](https://github.com/user-attachments/assets/8ac618c0-040d-4bca-8706-3dd6cf69f263)
- **✏️ Message Management**
  - Delete and edit messages in real time.

- **🛠️ Member Management**
  - Manage members with options to kick, change roles (Guest/Moderator), and more.
    
    ![image_2024-09-29_144904437](https://github.com/user-attachments/assets/1d65e3d9-4374-4e3e-bef3-a9c477566b79)



### ✨ Changes and new Features

- **💅 Brand new UI**
  - Aesthetically pleasing UI built with TailwindCSS and Figma [(click here to see the design)](https://www.figma.com/design/mW7pmuDuwELvesOq759VIC/Discourse?node-id=0-1&t=tAIdE2khFXYmdgcG-1).

- **🌗 Light / Dark Mode**
  - Support for both light and dark themes with [TailwindCSS](https://tailwindcss.com)
    
    ![theme](https://github.com/user-attachments/assets/cac842b0-a9b7-49c2-88de-194fae76e422)

- **📱 Fully Responsive**

    ![responsive](https://github.com/user-attachments/assets/1135d0cf-5b75-4c99-a54f-a81abf13c4e8)

- **🗄️ New MySql server**
  - Because of the end of Planetscale's hobby free "forever" plan, I'm now hosting the MySql database on [Aiven](https://aiven.io) 

- **👋 Welcome Page**
  - Initial page with CTA to invite friends to chat or create a server.

- **✉️ 1:1 Directs**
  - Direct messaging and 1:1 video and audio calls.
  
- **📞Direct Call notification**
  - Get notified of calls with options to reject or accept.
  
    ![directs_notification](https://github.com/user-attachments/assets/e0949910-ec15-4c7e-ac8b-024447204904)
- **🔔 Direct messages notification**
  - Using [sonner](https://ui.shadcn.com/docs/components/sonner) for new direct message notification.
 
    ![sonner](https://github.com/user-attachments/assets/387684c4-214a-4ce3-b4fb-11be8228292f)
- **🔗 Invitation System**
  - Generate unique invite links for servers and direct messages.
 
## 🛠️ Running Discourse Locally

### 1. Clone the Repository
```bash
git clone https://github.com/ericaugusto-git/discord-clone.git
cd discord-clone
```
### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Set up Environment Variables
Create a .env file in the root of your project and add the following environment variables:
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

### 4. Run the Development Server :D
```
npm run dev
# or
yarn dev
```

## ⚠️ Disclaimer

This project is intended for educational purposes only. Please be aware that, as with any platform where users can upload content, there is a risk of inappropriate or offensive material being shared. The project maintainers are not responsible for any content uploaded by users. It is recommended to implement content moderation practices if deploying this project publicly.
