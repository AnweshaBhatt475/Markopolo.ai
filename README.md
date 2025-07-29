# 🔗 URL Shortener Service

This is a simple URL Shortener Service built with **NestJS** and **MongoDB** as part of the Junior Backend Engineering Assignment for **Markopolo.ai**.

It allows users to:
- Shorten long URLs
- Use custom short codes (optional)
- Redirect to the original URL via the short code
- Track click analytics
- View Swagger API documentation

---

## 🚀 Live Project

- **Backend URL:** [https://markopolo-ai-2.onrender.com](https://markopolo-ai-2.onrender.com)  
- **Swagger Docs:** [https://markopolo-ai-2.onrender.com/docs](https://markopolo-ai-2.onrender.com/docs)  
- **Demo Video:** [Loom Video Explanation](https://www.loom.com/share/81f4ae540c5b4351bb2960adda05c692)

---

## 📦 Tech Stack

- **Framework:** NestJS
- **Database:** MongoDB (with Mongoose)
- **API Docs:** Swagger

---

## ⚙️ Local Setup Instructions

### Prerequisites
- Node.js (v18 or above)
- MongoDB (local or cloud instance)
- Git

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/url-shortener.git]
cd url-shortener



2. Install Dependencies
npm install

3. Create a .env File
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/shortner
BASE_URL=http://localhost:3000


4. Start the Server
npm run start:dev
Server will run at: http://localhost:3000


🐳 Docker Setup (Optional)
⚠️ Docker support is not implemented in this project.

If implemented, you would:

Create a Dockerfile

Create docker-compose.yml
Run docker-compose up --build


📚 API Endpoints
🔸 POST /api/shorten – Shorten a URL
Request Body:
{
  "url": "https://www.example.com/a-very-long-url-to-shorten",
  "customCode": "my-custom-link" // optional
}


Success Response (201):
{
  "originalUrl": "https://www.example.com/a-very-long-url-to-shorten",
  "shortUrl": "http://localhost:3000/r/my-custom-link"
}


Error Response (409): If customCode is already taken



🔸 GET /r/:shortCode – Redirect to Original URL
Behavior:

Increments click count

Redirects to original URL

Error Response (404): If short code not found

🔸 GET /api/stats/:shortCode – Get URL Analytics
Success Response (200):
{
  "originalUrl": "https://www.example.com/a-very-long-url-to-shorten",
  "shortUrl": "http://localhost:3000/r/my-custom-link",
  "clicks": 15
}
Error Response (404): If short code not found


📄 API Documentation
Swagger UI available at:
👉 https://markopolo-ai-2.

📹 Video Explanation
🎥 Watch the complete demo and walkthrough:
https://www.loom.com/share/81f4ae540c5b4351bb2960adda05c692


