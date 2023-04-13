source .env.development

API_PATH=src/api

pnpm swagger-typescript-api \
    -p $VITE_BASE_URL/api-json \
    -o $API_PATH \
    -n api-base.ts \
    --axios \
    --unwrap-response-data
