# EasyFlatBot — сайт (Vite + React + Tailwind)

Локальный запуск:
```bash
npm install
npm run dev
```

Сборка:
```bash
npm run build
npm run preview
```

## Деплой на GitHub Pages
Репозиторий должен иметь ветку `main`. Workflow сам определит BASE_PATH:
- Если репозиторий формата `username.github.io` — BASE_PATH = `/`
- Иначе — BASE_PATH = `/<repo>/`

После пуша в `main` страница развернётся автоматически.
