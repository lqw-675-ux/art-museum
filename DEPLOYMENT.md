# Deployment Instructions

This project is set up as a standard Single Page Application (SPA) with a serverless backend function.

## 1. Project Structure
- `index.html`: Main entry point.
- `index.tsx` & `src/*`: React Frontend logic.
- `api/gemini.js`: Serverless backend function.

## 2. Deploy to Vercel (Recommended)

Vercel automatically detects the `api/` directory as serverless functions.

1.  **Install Vercel CLI** (Optional, or use web UI):
    ```bash
    npm i -g vercel
    ```
2.  **Deploy**:
    ```bash
    vercel
    ```
3.  **Set Environment Variable**:
    - Go to your Vercel Dashboard -> Settings -> Environment Variables.
    - Add Key: `GEMINI_API_KEY`
    - Value: `Your_Google_Gemini_API_Key_Here` (starts with AIza...)
4.  **Redeploy** to ensure the variable is picked up.

## 3. Deploy to Netlify

1.  Create a file `netlify.toml` in the root:
    ```toml
    [build]
      command = "npm run build" # or your build command
      publish = "dist"          # or your output folder
      functions = "api"         # Tells Netlify where functions are
    ```
2.  Push to GitHub/GitLab and connect to Netlify.
3.  In Site Settings -> Environment Variables, add `GEMINI_API_KEY`.

## 4. Local Development

To run this locally with the API proxy working, you need a runner that supports serverless functions, like `vercel dev`.

```bash
# Install dependencies (assuming you have a package.json)
npm install

# Run with Vercel Dev (emulates the backend API)
vercel dev
```

*Note: Ensure you have your `GEMINI_API_KEY` in a `.env` file locally for `vercel dev` to read it.*
