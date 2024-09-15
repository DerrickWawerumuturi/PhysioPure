# Insights

A blogging platform built with Next.js and React, styled using Shadcn UI, and powered by Appwrite for backend management of databases and authentication. This project is currently a work in progress, focusing on building core functionalities such as blog publishing, user authentication, and database interaction.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Known Issues](#known-issues)
- [Tech Stack](#tech-stack)
- [Local Development](#local-development)

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/blog-website.git
   ```

2. **Install dependencies**:

   ```bash
   cd blog-website
   npm install
   ```

3. **Set up environment variables**:

   - Create a `.env.local` file in the root directory.
   - Add your Appwrite project credentials and other required environment variables as follows:
     ```bash
     NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
     NEXT_PUBLIC_APPWRITE_ENDPOINT=https://your-appwrite-endpoint
     NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_appwrite_database_id
     ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Visit the project on localhost**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **User Authentication**: Managed through Appwrite's authentication system.
- **Blog Publishing**: Users can write and publish blogs.
- **Shadcn UI**: Provides a clean and modern user interface for blog creation and management.
- **Database Management**: Appwrite is used for managing blog data, including titles, content, and tags.

## Known Issues

1. **Data Fetching Issues**: Currently unable to receive data from the backend (Appwrite) to the frontend correctly.
2. **Publishing Blog**: The blog publish button within the alert dialog doesn't function properly.
3. **Missing Blog Page**: There is no dedicated blog display page as of now.
4. **Styling on Home Page**: The home page is not fully styled and needs design improvements.
5. **Alert Dialog**: There are ongoing issues with the Alert Dialog related to handling form submissions and database updates.

## Tech Stack

- **Frontend**:
  - Next.js
  - React
  - Shadcn UI (for styling components)
- **Backend**:

  - Appwrite (managing databases, storage, and user authentication)

- **Languages**:
  - TypeScript
  - JavaScript

## Local Development

To contribute or work on this project locally, follow these steps:

1. **Install dependencies** as described in the [Installation](#installation) section.
2. **Develop features** by modifying components in the `src` folder and adjusting database operations as needed.
3. **Test** your changes by running the local server and verifying the functionality.
4. **Styling** is handled via Shadcn and Tailwind CSS, so make sure to follow their guidelines for component styling.

For database operations, Appwrite manages user data, blog posts, and tags. Ensure you are authenticated before trying to perform operations like blog creation or publishing.

---

This project is still under active development, so more features and fixes will be added over time. Contributions are welcome!
