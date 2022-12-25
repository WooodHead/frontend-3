source .env

API_PATH=src/api

pnpm swagger-typescript-api \
    -p $VITE_BASE_URL/api/api-docs \
    -o $API_PATH \
    -n api-base.ts \
    --axios \
    --unwrap-response-data

echo 'done'
