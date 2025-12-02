# Sintergic Field Monitor Backend

This folder contains the FastAPI service used by the MPFST website to stream
live `meltdownFrac` values. The service fetches NOAA space-weather data every
minute and exposes a WebSocket at `/ws`.

To run locally, use Docker:

```bash
docker-compose up --build
```
