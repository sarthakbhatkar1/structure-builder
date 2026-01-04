# 📁 Structure Builder

**Create project folder structures from ASCII tree files via CLI and VS Code extension.**

Structure Builder lets you define your project layout once using a simple tree-style text file and generate the exact folder and file structure automatically. It is available both as a CLI and a VS Code extension, sharing a single core implementation for consistent results.

---

## ✨ Features

- Generate folders and files from ASCII tree definitions
- Correct handling of deeply nested structures
- Ignores visual tree connectors (`│`, `├──`, `└──`)
- Prevents accidental directory flattening
- Idempotent and safe to re-run
- Cross-platform support (Windows, macOS, Linux)
- Available as:
  - CLI tool
  - VS Code extension
- Single shared core logic for CLI and VS Code

---

## 📄 Example Input

Create a file named `structure.txt`:

```
savaari/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── auth.py
│   ├── ride_service.py
│   ├── socket_manager.py
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── api.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   ├── pages/
    │   │   ├── Login.tsx
    │   │   ├── Home.tsx
    │   │   ├── Booking.tsx
    │   │   ├── Tracking.tsx
    │   │   └── Receipt.tsx
    │   └── components/
    │       ├── Map.tsx
    │       └── RideCard.tsx
    ├── index.html
    └── tailwind.config.js
```

---

## 📂 Generated Output

```
savaari/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── auth.py
│   ├── ride_service.py
│   ├── socket_manager.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── api.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   ├── pages/
    │   │   ├── Login.tsx
    │   │   ├── Home.tsx
    │   │   ├── Booking.tsx
    │   │   ├── Tracking.tsx
    │   │   └── Receipt.tsx
    │   └── components/
    │       ├── Map.tsx
    │       └── RideCard.tsx
    ├── index.html
    └── tailwind.config.js
```

---

## 🚀 CLI Usage

### Run with npx (recommended)

```bash
npx structure-builder structure.txt
```

### Install globally

```bash
npm install -g structure-builder
```

```bash
structure-builder structure.txt
```

The structure is generated in the current working directory.

---

## 🧩 VS Code Extension Usage

1. Install **Structure Builder** from the VS Code Marketplace
2. Open a workspace folder
3. Open the `structure.txt` file
4. Open the Command Palette (`Ctrl + Shift + P`)
5. Run **Build Folder Structure from File**

---

## ⚠️ Rules & Conventions

- The first line is treated as the root folder
- Folder names must end with `/`
- Files must not end with `/`
- Visual tree connector-only lines are ignored
- File and folder ordering does not affect correctness

---

## 🛠️ Use Cases

- Project bootstrapping
- Sharing standardized repository structures
- Team-wide scaffolding conventions
- Documentation-driven development
- Avoiding repetitive manual setup

---

## 📄 License

Apache 2.0 License

---

**Ready to scaffold your next project?** Install Structure Builder today and stop creating folders manually.
