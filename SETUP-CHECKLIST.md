# AromaSouq Setup - Quick Checklist

Print this and check off as you go! ✓

## Prerequisites (10 min)
- [ ] Node.js v20+ installed and verified
- [ ] Git installed and verified
- [ ] pnpm installed globally
- [ ] Claude Code CLI working
- [ ] VS Code installed

## Supabase Setup (15 min)
- [ ] Supabase account created
- [ ] Project "aromasouq-production" created
- [ ] Database password saved securely
- [ ] Connection strings copied
- [ ] API keys (anon + service role) copied
- [ ] Storage bucket: products (public)
- [ ] Storage bucket: brands (public)
- [ ] Storage bucket: users (public)
- [ ] Storage bucket: documents (private)
- [ ] Credentials saved in `supabase-credentials.txt`

## Backend Setup (20 min)
- [ ] NestJS project created in `aromasouq-api/`
- [ ] Dependencies installed
- [ ] Prisma initialized
- [ ] `.env` file configured with Supabase credentials
- [ ] Prisma schema created with User & Vendor models
- [ ] Initial migration run successfully
- [ ] Prisma Client generated
- [ ] Seed file created
- [ ] Database seeded (3 users, 1 vendor, 8 categories)
- [ ] Verified data in Prisma Studio

## Authentication Module (20 min)
- [ ] Auth folder structure created
- [ ] DTOs created (register, login)
- [ ] JWT Strategy created
- [ ] JWT Guard created
- [ ] Prisma Service created
- [ ] Auth Service created
- [ ] Auth Controller created
- [ ] Auth Module created
- [ ] App Module updated
- [ ] CORS enabled in main.ts

## Frontend Setup (15 min)
- [ ] Next.js project created in `aromasouq-web/`
- [ ] Dependencies installed
- [ ] `.env.local` configured
- [ ] Tailwind config updated with Oud Gold theme
- [ ] Global CSS updated with fonts
- [ ] Next.js config updated for Supabase images

## MCP Configuration (5 min)
- [ ] `.claude/` directory created
- [ ] `mcp.json` created with filesystem server
- [ ] `config.json` created
- [ ] MCP connection tested

## Testing (10 min)
- [ ] Backend server starts successfully (port 3001)
- [ ] Registration API tested with curl
- [ ] Login API tested with curl
- [ ] Protected profile route tested
- [ ] Frontend server starts successfully (port 3000)
- [ ] Next.js welcome page loads in browser

## Final Verification
- [ ] Both servers running simultaneously
- [ ] No error messages in terminals
- [ ] Prisma Studio shows data correctly
- [ ] Test accounts working:
  - admin@aromasouq.ae / admin123
  - customer@test.com / admin123
  - vendor@test.com / admin123

---

## 🎯 Total Time: 90 minutes
## ✅ Status: [ ] Complete

**When all checked, you're ready to build features!** 🚀

---

## Quick Start Commands

**Start Backend:**
```cmd
cd C:\Users\deept\AromaSouq\aromasouq-api
pnpm start:dev
```

**Start Frontend:**
```cmd
cd C:\Users\deept\AromaSouq\aromasouq-web
pnpm dev
```

**Open Prisma Studio:**
```cmd
cd C:\Users\deept\AromaSouq\aromasouq-api
npx prisma studio
```

**View Supabase Dashboard:**
https://supabase.com/dashboard

---

## Emergency Contacts

**Stuck?** Check:
1. SETUP-GUIDE-COMPLETE.md (full instructions)
2. Troubleshooting section at the end
3. .env files for typos
4. Supabase project isn't paused
5. Port conflicts (3000, 3001)

**Common Issues:**
- Database error → Check credentials in .env
- CORS error → Verify backend CORS config
- Port in use → Kill process and restart
- Prisma error → Run `npx prisma generate`
