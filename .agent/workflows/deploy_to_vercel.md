---
description: Deploy the Extruder Portal to Vercel
---

# Deploy to Vercel

This workflow guides you through deploying your React application to Vercel.

## Prerequisites
- A GitHub account
- A Vercel account (you can sign up with GitHub)

## Step 1: Push to GitHub

First, we need to put your code on GitHub.

1.  Initialize Git (if not already done):
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```

2.  Create a new repository on GitHub:
    - Go to [github.com/new](https://github.com/new)
    - Name it `extruder-portal`
    - Keep it Public or Private (Vercel works with both)
    - Do **not** initialize with README, .gitignore, or license (we have them locally)
    - Click **Create repository**

3.  Link and push your code:
    - Copy the commands under "…or push an existing repository from the command line"
    - They will look like this (replace `YOUR_USERNAME`):
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/extruder-portal.git
    git branch -M main
    git push -u origin main
    ```

## Step 2: Deploy on Vercel

1.  Go to [vercel.com/new](https://vercel.com/new).
2.  **Import Git Repository**:
    - You should see your `extruder-portal` repository in the list.
    - Click **Import**.
3.  **Configure Project**:
    - **Framework Preset**: Vercel usually auto-detects "Vite". If not, select **Vite**.
    - **Root Directory**: `./` (default)
    - **Build Command**: `npm run build` (default)
    - **Output Directory**: `dist` (default)
    - **Environment Variables**: None needed for this project.
4.  Click **Deploy**.

## Step 3: Success

- Wait about a minute for the build to finish.
- Once complete, you will see a screenshot of your app and a **Visit** button.
- That URL (e.g., `extruder-portal.vercel.app`) is your live portal! You can share it with anyone.
