# 🎙️ Bhashini Voice Assistant Setup Guide

This guide will help you obtain the necessary Bhashini API credentials to unlock all **36+ Indian languages** for high-accuracy voice recognition and text-to-speech in JusticeAI.

## 1. Register for Bhashini Credentials

1. **Visit the ULCA Portal:** Go to [Bhashini ULCA Portal](https://bhashini.gov.in/ulca/user/login).
2. **Create an Account:** Register with your email and verify your account.
3. **Generate Keys:** 
   - Navigate to **"My Profile"** or **"API Keys"**.
   - Create a new API Key.
   - You will need two pieces of information:
     - **`ulcaApiKey`** (Your main API Key)
     - **`userID`** (Found in your profile)

## 2. Configure JusticeAI

1. Locate the `.env` file in your project root (I have already created it from the example).
2. Open `.env` and fill in your credentials:

```bash
# Bhashini API Configuration
BHASHINI_API_KEY=your_actual_ulca_api_key_here
BHASHINI_USER_ID=your_actual_user_id_here
BHASHINI_PIPELINE_ID=64392f96daac500b55c543cd
```

> [!TIP]
> I have set the `BHASHINI_PIPELINE_ID` to `64392f96daac500b55c543cd` which is the most comprehensive pipeline for 36+ Indian regional and tribal languages.

## 3. Verify the Configuration

1. **Restart the Server:**
   ```bash
   npm run dev
   ```
2. **Check Logs:**
   The server will output `⚠️ Bhashini Credentials missing` if the keys are not detected. Once configured correctly, this warning will disappear.
3. **Test in Browser:**
   - Go to `/chat`.
   - Open the Voice Panel (Mic button).
   - Select a language (like Bhojpuri or Tulu).
   - Record and Stop. You should see a real-time transcription instead of the "Mock" message.

## 🌐 Supported Languages (All 36+)

We now support a wide range of scheduled and regional languages:
- **Scheduled:** Hindi, Bengali, Tamil, Telugu, Marathi, Sanskrit, etc.
- **Regional:** Bhojpuri, Tulu, Rajasthani, Haryanvi, Chhattisgarhi, Magahi, Angika, Kumaoni, Garhwali, Awadhi, Marwari, Mewati, Malvi.

---
*For technical support or issues with your Bhashini account, please visit [bhashini.gov.in](https://bhashini.gov.in/)*
