# Vercel Deployment Instructions

## Current Issue
The Vercel deployment is failing with `ERR_MODULE_NOT_FOUND: Cannot find module '/var/task/dist/server/entry.mjs'`

This is caused by Vercel using cached build artifacts from the old deployment.

## Solution: Force Clean Deployment

### Step 1: Delete the Project from Vercel (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Find your project `astrojs-react-prakarsh`
3. Click on the project
4. Go to **Settings** (top right)
5. Scroll to the bottom → **Delete Project**
6. Confirm deletion

### Step 2: Reconnect and Deploy Fresh

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Astro
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave default (Astro handles this)
   - **Install Command**: `npm install`

### Step 3: Add Environment Variables

Before deploying, add these environment variables:

1. Go to **Settings** → **Environment Variables**
2. Add the following:

```
PUBLIC_SUPABASE_URL=https://qkuukbcdnlzbngmmytzg.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrdXVrYmNkbmx6Ym5nbW15dHpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NDgzNjgsImV4cCI6MjA4MzQyNDM2OH0.g0aHJa-Z9R4gSy8eanbmEkC8FjkEiIo5w4oMkR9P5n8
```

3. Make sure to select **All Environments** (Production, Preview, Development)

### Step 4: Deploy

1. Click **Deploy**
2. Wait for the build to complete
3. Your site should now be live!

---

## Alternative: Clear Cache Without Deleting

If you don't want to delete the project:

### Option A: Via Vercel CLI

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login
vercel login

# Link to your project
vercel link

# Deploy with no cache
vercel --prod --force
```

### Option B: Via Dashboard

1. Go to your project in Vercel
2. Go to **Settings** → **General**
3. Scroll to **Build & Development Settings**
4. Click **Edit** next to Build Command
5. Change it temporarily to: `rm -rf .vercel && npm run build`
6. Save and redeploy
7. After successful deployment, change it back to: `npm run build`

---

## Verify Deployment

After deployment, check:

1. ✅ Homepage loads without errors
2. ✅ Events page shows loading spinner then displays events
3. ✅ Clicking on an event shows the detail page
4. ✅ No loading screen when switching between events
5. ✅ Data loads from Supabase (or falls back to local data)

---

## Troubleshooting

### If deployment still fails:

1. **Check Build Logs**: Look for any errors during the build process
2. **Verify Node Version**: Vercel should use Node.js 22.x (configured in build output)
3. **Check Environment Variables**: Make sure they're set correctly
4. **Try Manual Deploy**: 
   ```bash
   git add .
   git commit -m "Force redeploy"
   git push
   ```

### Common Issues:

- **"Module not found"**: Clear cache and redeploy
- **"Supabase not responding"**: Check environment variables
- **"500 Internal Server Error"**: Check function logs in Vercel dashboard

---

## Project Configuration

Current setup:
- **Framework**: Astro 5.17.1
- **Adapter**: @astrojs/vercel 8.2.11
- **Output**: Server (SSR)
- **Runtime**: Node.js 22.x
- **Data Source**: Supabase (with local fallback)

---

## Files Changed

Recent changes made to fix deployment:
- ✅ `astro.config.mjs` - Updated Vercel adapter import
- ✅ `.gitignore` - Added `.vercel/` to ignore build artifacts
- ✅ `src/hooks/use-events.ts` - Added Supabase with local fallback
- ✅ `src/pages/event/[id].astro` - Added category detection with fallback

---

## Support

If you continue to have issues:
1. Check Vercel function logs: Project → Deployments → Click deployment → Functions tab
2. Check browser console for client-side errors
3. Verify Supabase connection in Supabase dashboard
