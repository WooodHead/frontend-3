API_PATH=src/api

sta -p http://127.0.0.1:4000/api-json \
    -o $API_PATH \
    -n api-base.ts \
    --axios \
    --unwrap-response-data &

sta -p http://127.0.0.1:4001/api-json \
    -o $API_PATH \
    -n api-graph.ts \
    --module-name-first-tag \
    --axios \
    --unwrap-response-data &

sta -p http://127.0.0.1:4002/api-json \
    -o $API_PATH \
    -n api-qa.ts \
    --axios \
    --unwrap-response-data &

wait
