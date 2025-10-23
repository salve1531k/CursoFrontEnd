# TODO: Complete Stock Management System

## 1. Update package.json with dependencies
- Add mongoose, next-auth, bcryptjs, react-hot-toast, @types/bcryptjs, @next-auth/mongodb-adapter

## 2. Create .env.local
- Add MONGO_URI, NEXTAUTH_SECRET, NEXTAUTH_URL

## 3. Create /lib/dbConnect.ts
- Implement MongoDB connection with Mongoose

## 4. Create models
- /lib/models/Usuario.ts
- /lib/models/Produto.ts
- /lib/models/Movimentacao.ts

## 5. Create API routes
- /pages/api/auth/[...nextauth].ts
- /pages/api/produtos/index.ts
- /pages/api/produtos/[id].ts
- /pages/api/movimentacoes/index.ts

## 6. Create pages
- /app/login/page.tsx
- /app/dashboard/page.tsx
- /app/produtos/page.tsx
- /app/estoque/page.tsx

## 7. Update /app/layout.tsx
- Add SessionProvider and Toaster

## 8. Implement authentication middleware
- Create middleware.ts for protected routes

## 9. Test and verify features
- Run npm install, npm run dev, check functionality
