source .env.development

API_PATH=src/api

pnpm swagger-typescript-api \
    -p $VITE_BASE_URL/api-json \
    -o $API_PATH \
    -n api-base.ts \
    --axios \
    --unwrap-response-data

# openapi-generator generate \
#     -g typescript-axios \
#     -i http://localhost:4000/api-json \
#     -o src/api/base-api \
#     --skip-validate-spec \
#     --additional-properties=supportsES6=true,useSingleRequestParameter=true,stringEnums=true
