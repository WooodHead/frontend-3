source .env.production

API_PATH=src/api

pnpm swagger-typescript-api \
    -p $VITE_BASE_URL/api-docs \
    -o $API_PATH \
    -n api-base.ts \
    --axios \
    --unwrap-response-data
