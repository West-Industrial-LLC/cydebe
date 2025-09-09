# 🌐 Cydebe Global Deployment Guide

## Overview
This guide will help you deploy Cydebe globally, making it accessible from the US, Russia, and other countries using your www.cydebe.com domain purchased from Porkbun.

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended - Free & Global)
Vercel provides excellent global performance with edge locations worldwide.

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy Marketing Site
```bash
cd marketing
vercel --prod
# Follow the prompts to create/link your project
```

#### Step 3: Deploy Frontend App
```bash
cd ../frontend
vercel --prod
```

#### Step 4: Connect Domain
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Domains
4. Add `www.cydebe.com` and `cydebe.com`
5. Copy the DNS records provided

#### Step 5: Configure Porkbun DNS
1. Login to [Porkbun](https://porkbun.com)
2. Go to Domain Management → www.cydebe.com
3. Add the DNS records from Vercel:
   - Type: CNAME, Name: www, Content: cname.vercel-dns.com
   - Type: CNAME, Name: @, Content: cname.vercel-dns.com

---

### Option 2: Netlify (Alternative)
Netlify also provides global CDN with good performance.

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Deploy
```bash
# Marketing Site
cd marketing
netlify deploy --prod

# Frontend App
cd ../frontend
netlify deploy --prod
```

#### Step 3: Connect Domain
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site → Site settings → Domain management
3. Add custom domain: www.cydebe.com

#### Step 4: Configure Porkbun DNS
Add these records in Porkbun:
- Type: CNAME, Name: www, Content: [your-netlify-site].netlify.app
- Type: CNAME, Name: @, Content: [your-netlify-site].netlify.app

---

### Option 3: Railway (Full-Stack)
Railway can host both frontend and backend services.

#### Step 1: Install Railway CLI
```bash
curl -fsSL https://railway.app/install.sh | sh
```

#### Step 2: Deploy
```bash
railway login
railway init
railway up
```

#### Step 3: Connect Domain
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Select your project → Settings → Domains
3. Add www.cydebe.com

#### Step 4: Configure Porkbun DNS
- Type: CNAME, Name: www, Content: [your-railway-project].up.railway.app
- Type: CNAME, Name: @, Content: [your-railway-project].up.railway.app

---

### Option 4: DigitalOcean App Platform
Good for more control and custom configurations.

#### Step 1: Create App Spec
```yaml
# .do/app.yaml
name: cydebe
services:
- name: marketing
  source_dir: marketing
  github:
    repo: West-Industrial-LLC/cydebe
  run_command: npm start
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production

- name: frontend
  source_dir: frontend
  github:
    repo: West-Industrial-LLC/cydebe
  run_command: npm start
  instance_count: 1
  instance_size_slug: basic-xxs
```

#### Step 2: Deploy
1. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Create new app from GitHub
3. Connect your repository
4. Use the app spec above

#### Step 3: Connect Domain
1. In your app dashboard → Settings → Domains
2. Add www.cydebe.com

#### Step 4: Configure Porkbun DNS
- Type: CNAME, Name: www, Content: [your-do-app].ondigitalocean.app
- Type: CNAME, Name: @, Content: [your-do-app].ondigitalocean.app

---

## 🌍 Global Accessibility Configuration

### 1. Content Delivery Network (CDN)
All platforms above automatically provide global CDN distribution.

### 2. SSL Certificate
All platforms provide automatic HTTPS certificates.

### 3. CORS Configuration
The application is configured to allow access from any origin for global accessibility.

### 4. Language Support
The application supports multiple languages including Russian (ru), English (en), Spanish (es), French (fr), and German (de).

---

## 🔧 Environment Configuration

### Production Environment Variables
Create `.env.production` files in each service directory:

#### Marketing Site (.env.production)
```env
NEXT_PUBLIC_APP_URL=https://www.cydebe.com/app
NEXT_PUBLIC_API_URL=https://api.cydebe.com
NEXT_PUBLIC_MARKETING_URL=https://www.cydebe.com
NODE_ENV=production
```

#### Frontend (.env.production)
```env
NEXT_PUBLIC_API_BASE_URL=https://api.cydebe.com
NEXT_PUBLIC_LOCAL_NETWORK_URL=https://network.cydebe.com
NEXT_PUBLIC_LOCAL_DEVICE_URL=https://device.cydebe.com
NODE_ENV=production
```

#### Backend API (.env)
```env
PORT=3004
NODE_ENV=production
OPENAI_API_KEY=your_production_key
CORS_ORIGIN=https://www.cydebe.com
```

---

## 📊 Monitoring & Analytics

### 1. Google Analytics
Add your GA tracking ID to the environment variables.

### 2. Error Monitoring
Consider adding Sentry or similar error monitoring.

### 3. Performance Monitoring
Use Vercel's analytics or add custom performance monitoring.

---

## 🚨 Important Notes

### Russia Access
- All major hosting platforms work in Russia
- No special configuration needed for Russian users
- Content is accessible globally

### Domain Configuration
- Always use `www.cydebe.com` as your primary domain
- Set up redirects from `cydebe.com` to `www.cydebe.com`
- DNS propagation may take 24-48 hours

### SSL & Security
- All platforms provide automatic SSL certificates
- HTTPS is enforced for security
- CORS is configured for global access

### Scaling
- Vercel and Netlify automatically scale
- Railway and DigitalOcean require manual scaling configuration
- Monitor usage and scale accordingly

---

## 🆘 Troubleshooting

### DNS Issues
1. Check DNS propagation: `dig www.cydebe.com`
2. Clear DNS cache: `sudo dscacheutil -flushcache` (macOS)
3. Wait 24-48 hours for full propagation

### Deployment Issues
1. Check build logs in your hosting platform
2. Verify environment variables are set correctly
3. Ensure all dependencies are installed

### Performance Issues
1. Enable CDN in your hosting platform
2. Optimize images and assets
3. Use proper caching headers

---

## 📞 Support

If you encounter issues:
1. Check the [GitHub Issues](https://github.com/West-Industrial-LLC/cydebe/issues)
2. Review the deployment logs
3. Contact support for your hosting platform

---

**🎉 Your Cydebe platform will be globally accessible at www.cydebe.com!**
