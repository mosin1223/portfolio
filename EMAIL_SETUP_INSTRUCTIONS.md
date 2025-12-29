# Email Setup Instructions for Contact Form

Your contact form is now ready to receive messages! Follow these steps to set up EmailJS (100% free):

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (top right)
3. Create a free account (no credit card needed)

## Step 2: Add Email Service

1. After logging in, go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended):
   - **Gmail**: Click on Gmail icon
   - Connect your Gmail account
   - Click **Create Service**
4. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template setup:

**Template Name:** `contact_form`

**Subject:** `New Message from {{from_name}}`

**Content:**
```
Hello Mohsin Ali,

You have received a new message from your portfolio website!

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

4. Click **Save**
5. Note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to **Account** (in the dashboard)
2. Find **General** tab
3. Copy your **Public Key** (e.g., `abc123XYZ`)

## Step 5: Update Your Code

Open `d:\portfolio\script.js` and replace these placeholders:

```javascript
// Line 126 - Replace YOUR_PUBLIC_KEY
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your public key from Step 4

// Line 149 - Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID
await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);
```

**Example:**
```javascript
emailjs.init('abc123XYZ');
await emailjs.send('service_abc123', 'template_xyz789', formData);
```

## Step 6: Test Your Form

1. Open your portfolio in a browser
2. Scroll to the Contact section
3. Fill out the form and click "Send Message"
4. Check your email inbox for the message!

## Important Notes

✅ **Free Plan Limits:** 200 emails/month (plenty for a portfolio)
✅ **No Backend Needed:** Works entirely from the browser
✅ **Spam Protection:** EmailJS includes basic spam protection
✅ **Multiple Emails:** You can add multiple recipient emails in the template

## Update Fiverr & Upwork Links

Don't forget to update your profile links in `d:\portfolio\index.html`:

1. **Fiverr:** Replace `https://www.fiverr.com/` with your actual Fiverr profile URL
2. **Upwork:** Replace `https://www.upwork.com/` with your actual Upwork profile URL
3. **LinkedIn:** Replace `#` with your actual LinkedIn profile URL
4. **Email:** Replace `mohsinali@example.com` with your real email address

## Troubleshooting

**Form not sending?**
- Make sure you replaced all three values (Public Key, Service ID, Template ID)
- Check browser console (F12) for any errors
- Verify your EmailJS account is active

**Not receiving emails?**
- Check your spam folder
- Verify the template has the correct recipient email
- Test with EmailJS dashboard's "Test" feature first

**Need help?**
- EmailJS Documentation: https://www.emailjs.com/docs/
- Their support is very responsive!

---

Once setup is complete, visitors can send you messages directly through your portfolio! 🎉
