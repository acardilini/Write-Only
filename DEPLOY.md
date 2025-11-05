# Deployment Guide - GitHub Pages

This guide explains how to deploy the "Just Write" application to GitHub Pages.

## Overview

The application is configured to deploy automatically to GitHub Pages using GitHub Actions. Every push to the `main` branch will trigger a new deployment.

## Prerequisites

- GitHub repository with the code
- GitHub Pages enabled in repository settings
- Node.js 16+ (for local building/testing)

## Automated Deployment (Recommended)

### Initial Setup

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Build and deployment":
     - Set **Source** to "GitHub Actions"
   - Save the settings

2. **Merge your changes to the main branch:**
   ```bash
   # First, ensure you're on your feature branch
   git checkout claude/initial-app-development-011CUparkDNUBpxhhApHXBdQ

   # Merge into main (or create a PR on GitHub and merge it)
   git checkout main
   git merge claude/initial-app-development-011CUparkDNUBpxhhApHXBdQ
   git push origin main
   ```

3. **Wait for GitHub Actions to complete:**
   - Go to the **Actions** tab in your repository
   - You should see a "Deploy to GitHub Pages" workflow running
   - Wait for it to complete (usually takes 1-2 minutes)

4. **Access your deployed application:**
   - Your app will be available at: `https://acardilini.github.io/Write-Only/`
   - Or check the deployment URL in the Pages settings

### Subsequent Deployments

After the initial setup, any push to the `main` branch will automatically trigger a new deployment:

```bash
# Make your changes
git add .
git commit -m "Your commit message"
git push origin main
```

The GitHub Actions workflow will automatically:
1. Check out the code
2. Install dependencies
3. Build the production bundle
4. Deploy to GitHub Pages

## Manual Deployment (Alternative)

If you prefer to deploy manually or want to test locally first:

### Option 1: Using GitHub Actions Manually

1. Go to the **Actions** tab in your repository
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the branch and click "Run workflow"

### Option 2: Local Build and Manual Upload

1. **Build locally:**
   ```bash
   npm install
   npm run build
   ```

   This creates a `dist/` folder with the production build.

2. **Test the production build locally:**
   ```bash
   npm run preview
   ```

   Visit `http://localhost:4173` to test.

3. **Deploy using gh-pages (requires package):**
   ```bash
   # Install gh-pages (one-time)
   npm install --save-dev gh-pages

   # Add to package.json scripts:
   # "deploy": "gh-pages -d dist"

   # Deploy
   npm run deploy
   ```

## Configuration Files

The deployment setup includes these configuration files:

1. **`vite.config.js`** - Sets the base path for GitHub Pages:
   ```javascript
   base: '/Write-Only/'
   ```

2. **`.github/workflows/deploy.yml`** - GitHub Actions workflow for automated deployment

## Troubleshooting

### Issue: 404 Page Not Found

**Solution:** Make sure the `base` path in `vite.config.js` matches your repository name:
```javascript
base: '/Write-Only/'  // Must match repository name
```

### Issue: Blank page after deployment

**Problem:** Incorrect base path or assets not loading.

**Solution:**
1. Check browser console for 404 errors
2. Verify the base path in `vite.config.js`
3. Rebuild and redeploy

### Issue: GitHub Actions workflow fails

**Solution:**
1. Check the Actions tab for error messages
2. Ensure GitHub Pages is enabled with "GitHub Actions" as source
3. Verify permissions in the workflow file
4. Check that `package-lock.json` is committed

### Issue: Old version showing after deployment

**Solution:**
1. Hard refresh the browser: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
2. Clear browser cache
3. Check the Actions tab to confirm deployment completed
4. Wait a few minutes for CDN to update

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public/` directory:
   ```
   yourdomain.com
   ```

2. Configure DNS with your domain provider:
   - Add an A record pointing to GitHub Pages IP addresses, or
   - Add a CNAME record pointing to `acardilini.github.io`

3. Enable custom domain in repository Settings → Pages

4. Update `vite.config.js`:
   ```javascript
   base: '/'  // Use root path for custom domain
   ```

## Performance Optimization

The production build includes:
- Minified JavaScript and CSS
- Code splitting
- Asset optimization
- Tree shaking

No additional configuration needed - Vite handles this automatically.

## Testing Before Deployment

Always test locally before deploying:

1. **Development mode:**
   ```bash
   npm run dev
   ```

2. **Production build (local):**
   ```bash
   npm run build
   npm run preview
   ```

3. **Test on different devices:**
   - Desktop browsers
   - Mobile browsers (Chrome, Safari)
   - Different screen sizes

## Data Persistence Note

**Important:** The application stores data in browser IndexedDB. Users should be reminded:
- Data is stored locally in their browser
- Data persists across deployments (stored client-side)
- Clearing browser cache will delete all data
- Users should export important work (Phase 4 feature)

## Deployment Checklist

Before deploying to production:

- [ ] Test application locally with `npm run preview`
- [ ] Verify all features work correctly
- [ ] Check browser console for errors
- [ ] Test on mobile devices
- [ ] Verify IndexedDB storage works
- [ ] Update README with deployment URL
- [ ] Ensure all changes are committed
- [ ] Push to main branch
- [ ] Monitor GitHub Actions workflow
- [ ] Test deployed version
- [ ] Share the deployment URL!

## Deployment URL

Once deployed, your application will be available at:

**https://acardilini.github.io/Write-Only/**

Share this URL with users to access the "Just Write" application!

## Support

If you encounter issues:
1. Check the [GitHub Actions logs](https://github.com/acardilini/Write-Only/actions)
2. Review this deployment guide
3. Check Vite documentation: https://vitejs.dev/guide/static-deploy.html
4. Open an issue in the repository
