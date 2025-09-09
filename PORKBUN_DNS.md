# Porkbun DNS Configuration for Cydebe

## Overview
This guide shows you exactly how to configure your www.cydebe.com domain in Porkbun to work with your deployed Cydebe application.

## Step-by-Step DNS Setup

### 1. Login to Porkbun
1. Go to [https://porkbun.com](https://porkbun.com)
2. Login to your account
3. Go to "Domain Management"
4. Find and click on "www.cydebe.com"

### 2. Access DNS Settings
1. In the domain details page, click on "DNS" or "Manage DNS"
2. You'll see the current DNS records
3. **Important**: Delete any existing A, CNAME, or other records that might conflict

### 3. Add DNS Records Based on Your Hosting Platform

#### For Vercel Deployment:
Add these CNAME records:
```
Type: CNAME
Name: www
Content: cname.vercel-dns.com
TTL: 300

Type: CNAME
Name: @
Content: cname.vercel-dns.com
TTL: 300
```

#### For Netlify Deployment:
Add these CNAME records:
```
Type: CNAME
Name: www
Content: [your-netlify-site].netlify.app
TTL: 300

Type: CNAME
Name: @
Content: [your-netlify-site].netlify.app
TTL: 300
```

#### For Railway Deployment:
Add these CNAME records:
```
Type: CNAME
Name: www
Content: [your-railway-project].up.railway.app
TTL: 300

Type: CNAME
Name: @
Content: [your-railway-project].up.railway.app
TTL: 300
```

#### For DigitalOcean App Platform:
Add these CNAME records:
```
Type: CNAME
Name: www
Content: [your-do-app].ondigitalocean.app
TTL: 300

Type: CNAME
Name: @
Content: [your-do-app].ondigitalocean.app
TTL: 300
```

### 4. Verify DNS Configuration

#### Check DNS Propagation
After adding the records, wait 5-10 minutes, then check if DNS is working:

**On Linux/Mac:**
```bash
dig www.cydebe.com
```

**On Windows:**
```cmd
nslookup www.cydebe.com
```

You should see your hosting platform's domain in the response.

#### Test Your Site
1. Open a web browser
2. Go to `https://www.cydebe.com`
3. Your Cydebe marketing site should load
4. Go to `https://www.cydebe.com/app` for the learning application

### 5. Troubleshooting

#### DNS Not Working?
1. **Wait longer**: DNS propagation can take up to 48 hours
2. **Check spelling**: Make sure the records are typed exactly as shown
3. **Clear cache**: Try a different browser or device
4. **Check hosting**: Make sure your app is actually deployed and running

#### SSL Certificate Issues?
- Most hosting platforms (Vercel, Netlify, Railway) provide automatic SSL
- If you see SSL errors, wait a few hours for certificates to provision
- Contact your hosting platform support if issues persist

#### Site Not Loading?
1. Check if your deployment is successful
2. Verify environment variables are set correctly
3. Check browser console for JavaScript errors
4. Test the direct deployment URL first

### 6. Advanced Configuration

#### Custom Subdomains (Optional)
If you want to set up separate subdomains for different services:

```
Type: CNAME
Name: api
Content: [your-api-deployment-url]
TTL: 300

Type: CNAME
Name: network
Content: [your-network-deployment-url]
TTL: 300

Type: CNAME
Name: device
Content: [your-device-deployment-url]
TTL: 300
```

#### Email Configuration (Optional)
If you want to set up email with your domain:
```
Type: MX
Name: @
Content: [your-email-provider-mx-record]
Priority: 10
TTL: 300
```

### 7. Monitoring Your Domain

#### DNS Health Check
Regularly check your DNS health:
```bash
# Check all records
dig www.cydebe.com ANY

# Check specific record types
dig www.cydebe.com CNAME
dig www.cydebe.com A
```

#### SSL Certificate Check
```bash
# Check SSL certificate
openssl s_client -connect www.cydebe.com:443 -servername www.cydebe.com
```

### 8. Support

If you encounter issues:
1. Check Porkbun's [DNS Help Center](https://kb.porkbun.com/article/68-dns-records)
2. Contact your hosting platform's support
3. Check the main [DEPLOYMENT.md](DEPLOYMENT.md) guide
4. Open an issue on [GitHub](https://github.com/West-Industrial-LLC/cydebe/issues)

---

**🎉 Your Cydebe platform should now be globally accessible at www.cydebe.com!**

Remember:
- DNS changes can take up to 48 hours to propagate worldwide
- The site will work in Russia and all other countries
- SSL certificates are automatically managed by your hosting platform
