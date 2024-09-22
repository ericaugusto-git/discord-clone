## 🎉 Discourse - Totally Original Live Chat App

This project started as part of [this course](https://www.youtube.com/watch?v=ZbX4Ok9YX94) by the extremely generous Code With Antonio, and now it has a new design and some new features outside of the course scope. Check it out:

### 🚀 Main Features

- **💬 Messaging**
  - Real-time messaging using [Socket.IO](https://socket.io) WebSocket and a [@tanstack/query](https://tanstack.com/query/latest) polling fallback.

- **🔊 Video and Audio call**
  - Realtime video and audio call with [LiveKit](https://livekit.io)

- **📎 Attachments**
  - Send attachments as messages using [UploadThing](https://uploadthing.com).

- **🗄️ ORM & Database**
  - ORM setup using [Prisma](https://www.prisma.io) with MySQL. 

- **🔐 Authentication**
  - Secure authentication implemented with [Clerk](https://clerk.com).

- **📜 Infinite Scrolling**
  - Load messages in batches of 15 using [@tanstack/query](https://tanstack.com/query/latest) for infinite scrolling.

- **🏠 Servers**
  - Create and customize servers where you can create audio, text and video channels.

- **✏️ Message Management**
  - Delete and edit messages in real time.

- **🛠️ Member Management**
  - Manage members with options to kick, change roles (Guest/Moderator), and more.



### ✨ Changes and new Features

- **💅 Brand new UI**
  - Aesthetically pleasing UI built with TailwindCSS and Figma [(click here to see the design)](https://www.figma.com/design/mW7pmuDuwELvesOq759VIC/Discourse?node-id=0-1&t=tAIdE2khFXYmdgcG-1).

- **🌗 Light / Dark Mode**
  - Support for both light and dark themes with [TailwindCSS](https://tailwindcss.com)

- **📱 Fully Responsive**
  - The new design is fully responsive with optimized mobile UI.

- **🌐 Internationalization (i18n)**
  - Translations for both pt-BR and EN

- **🗄️ New MySql server**
  - Because of the end of Planetscale's hobby free "forever" plan, I'm now hosting the MySql database on [Aiven](https://aiven.io) 

- **👋 Welcome Page**
  - Initial page with CTA to invite friends to chat or create a server.

- **✉️ 1:1 Directs**
  - Direct messaging and 1:1 video and audio calls.
  
- **📞Direct Call notification**
  - Get notified of calls with options to reject or accept.

- **🔔 Direct messages notification**
  - Using [sonner](https://ui.shadcn.com/docs/components/sonner) for new direct message notification.

- **🔗 Invitation System**
  - Generate unique invite links for servers and direct messages.



## ⚠️ Disclaimer

This is intended for educational purposes only. Please be aware that, as with any platform where users can upload content, there is a risk of inappropriate or offensive material being shared. The project maintainers are not responsible for any content uploaded by users. It is recommended to implement content moderation practices if deploying this project publicly.
