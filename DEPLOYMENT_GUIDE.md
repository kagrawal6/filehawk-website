# FileHawk Website Deployment Guide

## Quick Deployment to Vercel

### Option 1: GitHub + Vercel (Recommended)

1. **Initialize Git Repository**:
   ```bash
   cd filehawk-website
   git init
   git add .
   git commit -m "Initial FileHawk website"
   ```

2. **Push to GitHub**:
   ```bash
   # Create a new repository on GitHub first, then:
   git remote add origin https://github.com/your-username/filehawk-website.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

### Option 2: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   cd filehawk-website
   vercel
   ```

3. **Follow prompts**:
   - Link to existing project: No
   - Project name: filehawk-website
   - Directory: ./
   - Override settings: No

## Custom Domain Setup

1. **In Vercel Dashboard**:
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain

2. **DNS Configuration**:
   ```
   Type: CNAME
   Name: www (or @)
   Value: cname.vercel-dns.com
   ```

## Environment Variables

If you need environment variables:

1. **Create `.env.local`**:
   ```env
   VITE_GA_TRACKING_ID=your-google-analytics-id
   VITE_DOWNLOAD_BASE_URL=https://releases.filehawk.dev
   ```

2. **Add to Vercel**:
   - Project Settings → Environment Variables
   - Add each variable

## Performance Optimization

The website is already optimized with:

- **Bundle Analysis**: Run `npm run build` to see bundle size
- **Image Optimization**: Already using optimized formats
- **Caching**: Configured in `vercel.json`
- **Compression**: Automatic on Vercel

## Monitoring

1. **Vercel Analytics**: Automatically enabled
2. **Google Analytics**: Add tracking ID to environment variables
3. **Error Tracking**: Consider adding Sentry

## Updating the Site

1. **Update content** in React components
2. **Commit changes**:
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```
3. **Automatic deployment** will trigger on Vercel

## Backup Strategy

1. **Repository**: Always backed up on GitHub
2. **Vercel Deployments**: Vercel keeps deployment history
3. **Assets**: Keep original assets in version control

## Troubleshooting

### Build Fails
- Check Node.js version (18+ required)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

### Images Not Loading
- Ensure images are in `public/` folder
- Check image paths start with `/`

### Custom Domain Issues
- Wait for DNS propagation (up to 24 hours)
- Verify DNS records with your provider
- Check domain configuration in Vercel

### Performance Issues
- Run Lighthouse audit
- Check bundle size with `npm run build`
- Optimize images if needed

## Security Headers

Security headers are configured in `vercel.json`:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer Policy

## SSL Certificate

SSL is automatically handled by Vercel for:
- *.vercel.app domains
- Custom domains (Let's Encrypt)

No additional configuration needed.
