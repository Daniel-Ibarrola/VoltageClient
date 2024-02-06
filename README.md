# Voltage client

Website to monitor and get insights of SASMEX seismic stations.

## Developing

Before starting create a .env file with the following variables

- VITE_AWS_REGION
- VITE_API_GATEWAY_ID
- VITE_COGNITO_CLIENT_ID

Run the local development server.

```shell
docker compose up
```

Run test suite

```shell
docker compose exec voltage-client npm run test
```

Create production build

```shell
docker compose exec voltage-client npm run build
```
