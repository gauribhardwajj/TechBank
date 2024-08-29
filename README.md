This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Simple Banking Website
This is a simple banking website built using Next.js and MongoDB. The website allows users to create accounts, view profiles, and transfer money between users. The project is a basic demonstration of full-stack web development, utilizing a MongoDB backend and deployed on Vercel.

###Features
`Home Page:` Overview of the website with links to other pages.
`Create User Page:` Allows you to create a new user with a unique name and email.
`Transfer Money Page:` Enables users to transfer money between existing accounts.
`User Profile Page:` Displays the profile details of a specific user, including their current balance.
`All Users List Page:` Lists all the users with their basic details.

##Tech Stack
* Frontend: Next.js - A React framework for server-side rendering and generating static websites.
* Backend: MongoDB - A NoSQL database used to store user data.
* Deployment: Vercel - A platform for deploying frontend frameworks and static sites.

##Database Schema
The User model is defined using Mongoose with the following schema:

```javascript
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    currentBalance: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Contributions are welcome! Please fork the repository and use a feature branch. Pull requests are gladly accepted.
