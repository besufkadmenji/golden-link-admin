curl -o swagger.json https://backend.goldenlink.moltaqadev.com/docs-json

npx swagger-typescript-api generate -p ./swagger.json -o ./src/types -n swagger.ts
