# React + TypeScript + Vite + Firebase Starter

## Installation

Clone or download this repo then run

```bash
npm install
```

Rename .env.local.examle file to .env.local and enter firebase SDK info.

## Set Cloud Firestore rules

### Mixed public and private access

["This rule works well for apps that require publicly readable elements, but need to restrict edit access to those elements' owners. For example, a chat app or blog."](https://firebase.google.com/docs/rules/basics?authuser=0&hl=en)

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true
      allow create: if request.auth.uid == request.resource.data.userId;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }
  }
}
```

## Spin up dev server

```bash
npm run dev
```

