![logo](https://getmetadata.abhisheky495.workers.dev/og-image.png)

An API service that extracts metadata from any website, including title, description, icon, and Open Graph images. <br/>
Built with [Hono.js](https://hono.dev) and [Cloudflare Workers](https://workers.cloudflare.com) for blazing-fast performance.

<br/>

## 🚀 Quick Start

All endpoints follow the pattern - `https://getmetadata.abhisheky495.workers.dev/{domain}/{key}`

- `{domain}` - The domain to fetch metadata from.

  - https://getmetadata.abhisheky495.workers.dev/github.com

- `{key}` - The key to fetch icon, og and twitterog
  - https://getmetadata.abhisheky495.workers.dev/github.com/icon
  - https://getmetadata.abhisheky495.workers.dev/github.com/og
  - https://getmetadata.abhisheky495.workers.dev/github.com/twitterog

> All the data is being cached for 28 days and the API is rate limited to 300 requests per minute per IP.

<br/>

## 📑 Metadata

Metadata is the complete metadata of the website, including title, description, icon, and Open Graph images. First it will try to get the metadata from the website, if not found it will use [Cloudflare Browser Rendering](https://developers.cloudflare.com/browser-rendering/) to get the metadata. If a value is not found, it will be `null`.

- https://getmetadata.abhisheky495.workers.dev/github.com

```json
{
  "status": "success",
  "metadata": {
    "title": "GitHub · Change is constant. GitHub keeps you ahead. · GitHub",
    "description": "Join the world's most widely adopted, AI-powered developer platform where millions of developers, businesses, and the largest open source community build software that advances humanity.",
    "icon": "https://github.githubassets.com/favicons/favicon.svg",
    "og": {
      "title": "GitHub · Change is constant. GitHub keeps you ahead.",
      "description": "Join the world's most widely adopted, AI-powered developer platform where millions of developers, businesses, and the largest open source community build software that advances humanity.",
      "image": "https://images.ctfassets.net/8aevphvgewt8/4pe4eOtUJ0ARpZRE4fNekf/f52b1f9c52f059a33170229883731ed0/GH-Homepage-Universe-img.png",
      "twitterTitle": "GitHub · Change is constant. GitHub keeps you ahead.",
      "twitterDescription": "Join the world's most widely adopted, AI-powered developer platform where millions of developers, businesses, and the largest open source community build software that advances humanity.",
      "twitterImage": "https://images.ctfassets.net/8aevphvgewt8/4pe4eOtUJ0ARpZRE4fNekf/f52b1f9c52f059a33170229883731ed0/GH-Homepage-Universe-img.png"
    }
  }
}
```

<br/>

## ✨ Icon

To get the icon of the website, can use the below endpoint. First it will try to get the icon from the website, if not found, it will try to get the icon from the Google Favicon Service. If still not found, it will return a default placeholder [icon](https://getmetadata.abhisheky495.workers.dev/icon.png)

- https://getmetadata.abhisheky495.workers.dev/github.com/icon

<br/>

## 🖼️ Open Graph

Open Graph or OG is an image that is used to represent the website on social media. First it will try to get the Open Graph image from the website, if not found, it will return a default placeholder [image](https://getmetadata.abhisheky495.workers.dev/og-image.png)

- Og - https://getmetadata.abhisheky495.workers.dev/github.com/og
- Twitter - https://getmetadata.abhisheky495.workers.dev/github.com/twitterog

### Query parameters

- `fallback` - The fallback image is used if the Open Graph image is not found. This must be a valid image URL or it will return an error.

  - https://getmetadata.abhisheky495.workers.dev/microsoft.com/og?fallback=https://avatar.vercel.sh/123?size=400
