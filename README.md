## 🎉 Discourse - Totally Original Live Chat App

This project started as part of [this course](https://www.youtube.com/watch?v=ZbX4Ok9YX94) by the extremely generous Code With Antonio, and now it has a new design and some new features outside of the course scope. Check it out:

### 🚀 Main Features

- **💬 Messaging**
  - Real-time messaging using [Socket.IO](https://socket.io) WebSocket and native polling fallback.

- **🔊 Video and Audio call**
  - Realtime video and audio call with [LiveKit](https://livekit.io)

- **📎 Attachments**
  - Send attachments as messages using [UploadThing](https://uploadthing.com).

- **🗄️ ORM & Database**
  - ORM setup using Prisma with MySQL. 

- **🔐 Authentication**
  - Secure authentication implemented with [Clerk](https://clerk.com).

- **📜 Infinite Scrolling**
  - Load messages in batches of 15 using [@tanstack/query](https://tanstack.com/query/latest) for infinite scrolling.

- **🌗 Light / Dark Mode**
  - Support for both light and dark themes with [TailwindCSS](https://tailwindcss.com)

- **🏠 Server Creation & Customization**
  - Create and customize servers.

- **✏️ Message Management**
  - Delete and edit messages in real time.

- **🛠️ Member Management**
  - Manage members with options to kick, change roles (Guest/Moderator), and more.

- **🔗 Invitation System**
  - Generate unique invite links and manage server invitations efficiently.


### ✨ Changes and new Features after the course

- **💅 Brand new UI**
  - Aesthetically pleasing UI built with TailwindCSS and Figma [(click here to see the design)](https://www.figma.com/design/mW7pmuDuwELvesOq759VIC/Discourse?node-id=0-1&t=tAIdE2khFXYmdgcG-1).

- **📱 Fully Responsive**
  - The new design is fully responsive with optimized mobile UI.

- **🗄️ New MySql server**
  - Because of the end of Planetscale's hobby free "forever" plan, I'm now hosting the MySql database on [Aiven](https://aiven.io) 

- **👋 Welcome Page**
  - Initial page with an invitation to join a general server or create a new one.

- **🖼️ Profile Personalization**
  - Users can now personalize their profiles with a "Status" and an "About Me" section to express themselves.

- **🤝 Friend System**
  - Added the ability to add and manage friends.

- **📝 Channel Descriptions**
  - Channels can now have custom descriptions, providing more context and information about each channels purpose.

- **✉️ 1:1 Directs**
  - Direct messaging and 1:1 video calls.



## ⚠️ Disclaimer

This is intended for educational purposes only. Please be aware that, as with any platform where users can upload content, there is a risk of inappropriate or offensive material being shared. The project maintainers are not responsible for any content uploaded by users. It is recommended to implement content moderation practices if deploying this project publicly.
