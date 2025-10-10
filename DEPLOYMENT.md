# Cloudflare Pages Deployment Instructions

This guide will help you deploy your Bhulaxmi Jewellers application to Cloudflare Pages.

## Prerequisites

- A Cloudflare account (sign up at https://dash.cloudflare.com/sign-up)
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Connect to Cloudflare Pages

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** in the left sidebar
3. Click **Create application**
4. Select the **Pages** tab
5. Click **Connect to Git**

## Step 2: Configure Your Repository

1. Select your Git provider (GitHub, GitLab, or Bitbucket)
2. Authorize Cloudflare to access your repositories
3. Select the repository containing this project
4. Click **Begin setup**

## Step 3: Build Settings

Configure the following build settings:

- **Project name**: `bhulaxmi-jewellers` (or your preferred name)
- **Production branch**: `main` (or your default branch)
- **Framework preset**: `Vite`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave as default)

### Environment Variables

No environment variables are required for basic deployment. Add any needed variables in the **Environment variables** section.

## Step 4: Deploy

1. Click **Save and Deploy**
2. Cloudflare will build and deploy your application
3. The initial deployment typically takes 2-5 minutes

## Step 5: Access Your Site

Once deployment is complete:

1. Your site will be available at: `https://[project-name].pages.dev`
2. You can set up a custom domain in **Custom domains** settings

## Custom Domain Setup (Optional)

1. Go to your project in Cloudflare Pages
2. Click **Custom domains**
3. Click **Set up a custom domain**
4. Enter your domain name
5. Follow the DNS configuration instructions

## Automatic Deployments

Cloudflare Pages automatically deploys:

- **Production**: Every push to your production branch (e.g., `main`)
- **Preview**: Every push to other branches or pull requests

## Build Optimization Tips

### Enable Build Caching

Cloudflare Pages automatically caches `node_modules` between builds for faster deployments.

### Environment-Specific Builds

To optimize for production:

```bash
# Already configured in package.json
npm run build
```

### Performance Monitoring

Monitor your site's performance:

1. Go to **Analytics** in your Cloudflare Pages project
2. View real-time traffic, performance metrics, and geographic distribution

## Troubleshooting

### Build Failures

If your build fails:

1. Check the build logs in the Cloudflare dashboard
2. Verify all dependencies are listed in `package.json`
3. Test the build locally: `npm run build`
4. Ensure Node.js version compatibility (v18+ recommended)

### SPA Routing Issues

The `public/_redirects` file is configured to handle Single Page Application routing:

```
/* /index.html 200
```

This ensures all routes are properly handled by React Router.

### Missing Assets

If images or assets don't load:

1. Verify assets are in the `public` folder or imported in components
2. Check that the build output directory is set to `dist`
3. Review the browser console for 404 errors

## Rollback Deployments

To rollback to a previous deployment:

1. Go to **Deployments** in your project
2. Find the deployment you want to restore
3. Click **...** (three dots) → **Rollback to this deployment**

## Advanced Configuration

### Custom Build Command

If you need a custom build process, update the build command in Cloudflare Pages settings.

### Node.js Version

Cloudflare Pages uses Node.js 18 by default. To specify a version:

1. Add a `.node-version` file or `.nvmrc` file to your repository root
2. Specify the version (e.g., `18.17.0`)

### Functions (Optional)

Cloudflare Pages supports serverless functions:

1. Create a `functions` directory in your project root
2. Add TypeScript/JavaScript files for API endpoints
3. Deploy - functions are automatically detected

## Performance Best Practices

1. **Enable Cloudflare CDN**: Automatic with Cloudflare Pages
2. **Image Optimization**: Use WebP format and lazy loading (already implemented)
3. **Code Splitting**: Vite handles this automatically
4. **Caching**: Cloudflare automatically caches static assets

## Security

- **HTTPS**: Enabled by default
- **DDoS Protection**: Included with Cloudflare
- **WAF**: Available on paid Cloudflare plans

## Support

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare Community](https://community.cloudflare.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

## Cost

Cloudflare Pages free tier includes:

- Unlimited bandwidth
- Unlimited requests
- 500 builds per month
- 100 custom domains

Perfect for most production applications!

---

## Quick Deploy Checklist

- [ ] Push code to Git repository
- [ ] Connect repository to Cloudflare Pages
- [ ] Configure build settings (Framework: Vite, Build command: `npm run build`, Output: `dist`)
- [ ] Deploy
- [ ] (Optional) Set up custom domain
- [ ] Test all routes and functionality

Your Bhulaxmi Jewellers application is now live! 🎉
