# AromaSouq - MCP Configuration Analysis & Correct Setup

**Date:** October 24, 2025
**Status:** Analysis Complete - Ready for Configuration

---

## 📊 CURRENT CONFIGURATION ANALYSIS

### ✅ What's Correctly Configured

**1. Project Structure**
```
C:\Users\deept\AromaSouq\
├── aromasouq-api/          ✅ Backend folder created
├── aromasouq-web/          ✅ Frontend folder created
├── docs/                   ✅ Documentation exists
└── .claude/                ✅ Project config folder created
    ├── config.json         ✅ Project metadata (correct)
    └── mcp.json            ⚠️ Not used by Claude Code CLI
```

**2. Global Claude Code Config**
- Location: `C:\Users\deept\.claude.json`
- Project entry exists: `C:\\Users\\deept\\AromaSouq`
- Current MCP servers: **NONE** (line 703: `"mcpServers": {}`)

**3. Project-Level Config (`C:\Users\deept\AromaSouq\.claude\config.json`)**
```json
{
  "project": {
    "name": "AromaSouq MVP",
    "description": "Luxury fragrance marketplace for UAE/GCC - Responsive Web App",
    "structure": {
      "backend": "aromasouq-api",
      "frontend": "aromasouq-web",
      "docs": "docs"
    },
    "theme": {
      "primary": "#C9A86A",
      "name": "Oud Gold"
    }
  },
  "supabase": {
    "projectRef": "owflekosdjmwnkqpjjnn",
    "region": "ap-southeast-1"
  }
}
```
✅ **Status:** Perfect! This is project metadata, not MCP config.

---

## ⚠️ ISSUES IDENTIFIED

### Issue #1: `.claude/mcp.json` is NOT Used by Claude Code CLI

**Problem:**
- The file `C:\Users\deept\AromaSouq\.claude\mcp.json` exists but **Claude Code CLI does NOT read it**
- Claude Code CLI uses **ONLY** the global config at `C:\Users\deept\.claude.json`
- The `.claude/mcp.json` format is for **Claude Desktop app**, not CLI

**Evidence:**
- Running `claude mcp list` shows: "No MCP servers configured"
- The `.claude.json` shows: `"mcpServers": {}`

### Issue #2: MCP Configuration Scope Confusion

**Claude Code has 3 scopes:**
1. **Local scope** (default): Stored in `~/.claude.json` under specific project, private
2. **Project scope**: Stored in `.mcp.json` at project root, shared via git
3. **User scope**: Global in `~/.claude.json`, available everywhere

**Current situation:**
- We created `.claude/mcp.json` (wrong location, wrong format)
- Need to use **project scope** with `.mcp.json` at project root
- OR use **local scope** which is stored in global config but project-specific

---

## ✅ CORRECT MCP SETUP FOR CLAUDE CODE CLI

### Option A: Project-Scoped MCP (Recommended - Shareable via Git)

**What it does:**
- Creates `.mcp.json` at project ROOT (not `.claude/mcp.json`)
- Config is shared with team via Git
- Team members auto-get MCP servers when they clone

**How to configure:**

```bash
cd C:\Users\deept\AromaSouq

# Add Supabase Postgres with project scope
claude mcp add --scope project --transport stdio supabase -- npx -y @modelcontextprotocol/server-postgres postgresql://postgres:AromaSouq123@db.owflekosdjmwnkqpjjnn.supabase.co:6543/postgres?pgbouncer=true

# Add filesystem access with project scope
claude mcp add --scope project --transport stdio filesystem -- npx -y @modelcontextprotocol/server-filesystem C:\Users\deept\AromaSouq\aromasouq-api C:\Users\deept\AromaSouq\aromasouq-web C:\Users\deept\AromaSouq\docs
```

**Result:**
- Creates `C:\Users\deept\AromaSouq\.mcp.json`
- Committed to Git for team sharing

---

### Option B: Local-Scoped MCP (Current Default - Project-Specific but Private)

**What it does:**
- Stores MCP config in `~/.claude.json` under this project
- Private to you (not shared via Git)
- Only active when you're in this project

**How to configure:**

```bash
cd C:\Users\deept\AromaSouq

# Add Supabase (local scope is default)
claude mcp add --transport stdio supabase -- npx -y @modelcontextprotocol/server-postgres postgresql://postgres:AromaSouq123@db.owflekosdjmwnkqpjjnn.supabase.co:6543/postgres?pgbouncer=true

# Add filesystem
claude mcp add --transport stdio filesystem -- npx -y @modelcontextprotocol/server-filesystem C:\Users\deept\AromaSouq\aromasouq-api C:\Users\deept\AromaSouq\aromasouq-web C:\Users\deept\AromaSouq\docs
```

**Result:**
- Updates `C:\Users\deept\.claude.json`
- Entry under `"projects": {"C:\\Users\\deept\\AromaSouq": {"mcpServers": {...}}}`

---

### Option C: User-Scoped MCP (Global - Available in ALL Projects)

**What it does:**
- Supabase MCP available in every project you work on
- Good for databases you access frequently

**How to configure:**

```bash
claude mcp add --scope user --transport stdio supabase -- npx -y @modelcontextprotocol/server-postgres postgresql://postgres:AromaSouq123@db.owflekosdjmwnkqpjjnn.supabase.co:6543/postgres?pgbouncer=true
```

**Result:**
- Updates `C:\Users\deept\.claude.json` at user level (not project-specific)

---

## 🎯 RECOMMENDED APPROACH FOR AROMASOUQ

### Step 1: Clean Up Incorrect Config

```bash
# Remove the incorrectly placed .claude/mcp.json
rm C:\Users\deept\AromaSouq\.claude\mcp.json

# Keep .claude/config.json (it's correct)
```

### Step 2: Add MCP Servers with Project Scope

```bash
cd C:\Users\deept\AromaSouq

# Add Supabase database MCP
claude mcp add --scope project --transport stdio supabase -- npx -y @modelcontextprotocol/server-postgres postgresql://postgres:AromaSouq123@db.owflekosdjmwnkqpjjnn.supabase.co:6543/postgres?pgbouncer=true

# Add filesystem access MCP
claude mcp add --scope project --transport stdio filesystem -- npx -y @modelcontextprotocol/server-filesystem C:\Users\deept\AromaSouq\aromasouq-api C:\Users\deept\AromaSouq\aromasouq-web C:\Users\deept\AromaSouq\docs
```

### Step 3: Verify Configuration

```bash
# List all MCP servers
claude mcp list

# Or use slash command in Claude Code
/mcp
```

**Expected output:**
```
Checking MCP server health...

supabase: npx -y @modelcontextprotocol/server-postgres ... - ✓ Connected
filesystem: npx -y @modelcontextprotocol/server-filesystem ... - ✓ Connected
```

### Step 4: Test MCP Functionality

Once connected, you can:
- **Query database:** "Show me all tables in the Supabase database"
- **Check data:** "Count rows in User table"
- **Run SQL:** "Create the products table"
- **Read files:** "Show me the contents of aromasouq-api/package.json"

---

## 🔧 ALTERNATIVE: Use MCP JSON Config (Advanced)

If you prefer to use `.mcp.json` at project root:

**Create:** `C:\Users\deept\AromaSouq\.mcp.json`

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://postgres:AromaSouq123@db.owflekosdjmwnkqpjjnn.supabase.co:6543/postgres?pgbouncer=true"
      ],
      "transport": "stdio"
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Users\\deept\\AromaSouq\\aromasouq-api",
        "C:\\Users\\deept\\AromaSouq\\aromasouq-web",
        "C:\\Users\\deept\\AromaSouq\\docs"
      ],
      "transport": "stdio"
    }
  }
}
```

**Then import it:**
```bash
claude mcp add-json supabase < .mcp.json
```

---

## 📋 VERIFICATION CHECKLIST

After setup, verify:

- [ ] `claude mcp list` shows both servers
- [ ] Both servers show ✓ Connected status
- [ ] `/mcp` command in Claude Code shows servers
- [ ] Can query database: "List all Supabase tables"
- [ ] Can read files: "Show aromasouq-api structure"
- [ ] File `.mcp.json` exists at project root (if using project scope)
- [ ] File `.claude/mcp.json` is deleted (it's not used)

---

## 🚀 WHAT THIS ENABLES

Once MCP is properly configured, I can:

### Database Operations
✅ List all tables
✅ Show table schemas
✅ Query data (SELECT)
✅ Insert test data
✅ Run migrations
✅ Check table relationships
✅ Verify indexes

### Storage Operations
✅ List Supabase storage buckets
✅ Check bucket policies
✅ Verify bucket configuration

### File Operations
✅ Read project files directly
✅ Understand codebase structure
✅ Search across files faster

### Development Benefits
✅ Real-time database verification
✅ Faster debugging
✅ Live data inspection
✅ Automated migration testing

---

## 🎯 NEXT STEPS

**Choose your preference:**

**Option 1: Manual Buckets + Skip MCP (Fastest to start)**
- You create 4 buckets manually (2 minutes)
- Skip MCP setup for now
- I proceed with backend/frontend initialization
- Add MCP later when needed

**Option 2: Proper MCP Setup (Better long-term)**
- Run the commands above
- Verify connection
- Then I can create buckets via MCP
- Proceed with development

**Which would you prefer?** Let me know and I'll execute accordingly!

---

## 📞 COMMAND REFERENCE

```bash
# Add MCP (project scope)
claude mcp add --scope project --transport stdio <name> -- <command>

# List servers
claude mcp list

# Remove server
claude mcp remove <name>

# Get server details
claude mcp get <name>

# Check in chat
/mcp
```

**Status:** Ready to proceed with your chosen option! 🚀
