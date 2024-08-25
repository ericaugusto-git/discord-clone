## 🎉 Discourse - Totally Original Live Chat App

This project started as part of [this course](https://www.youtube.com/watch?v=ZbX4Ok9YX94) by the extremely generous Code With Antonio, and now it has a ton of new features outside the course scope.

### 🚀 Main Features from the course

- **💬 Real-time Messaging**
  - Real-time messaging using Socket.io with WebSocket fallback and polling alerts.

- **📎 Attachments**
  - Send attachments as messages using UploadThing.

- **✏️ Message Management**
  - Delete and edit messages in real time for all users.

- **🔊 Channels**
  - Create text, audio, and video call channels for seamless communication.

- **✉️ 1:1 Conversations**
  - Direct messaging and 1:1 video calls between members.

- **🛠️ Member Management**
  - Manage members with options to kick, change roles (Guest/Moderator), and more.

- **🔗 Invitation System**
  - Generate unique invite links and manage server invitations efficiently.

- **📜 Infinite Scrolling**
  - Load messages in batches of 10 using `@tanstack/query` for infinite scrolling.

- **🏠 Server Creation & Customization**
  - Create and customize servers with full control over settings.

- **🌗 Light / Dark Mode**
  - Support for both light and dark themes, allowing users to switch seamlessly.

- **🗄️ ORM & Database**
  - ORM setup using Prisma with MySQL database hosted on Planetscale.

- **🔐 Authentication**
  - Secure authentication implemented with Clerk.

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
  - Channels can now have custom descriptions, providing more context and information about each channel's purpose.



## ⚠️ Disclaimer

This is intended for educational purposes only. Please be aware that, as with any platform where users can upload content, there is a risk of inappropriate or offensive material being shared. The project maintainers are not responsible for any content uploaded by users. It is recommended to implement content moderation practices if deploying this project publicly.
