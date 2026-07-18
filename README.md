# slugsvc

Serviço mínimo de slugificação de títulos para URLs. Três camadas:

- **`src/core`** — algoritmo de slug (transliteração de acentos, colapso de separadores).
- **`src/api`** — servidor HTTP e tabela de rotas (`/health`, `/slug`).
- **`src/storage`** — cache LRU e repositório de slugs persistidos.
