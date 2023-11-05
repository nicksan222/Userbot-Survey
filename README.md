# Userbot-Survey

Per accedere alla documentazione, esegui i seguenti comandi

```bash
cd docs
npm install
npm run start
```

Per eseguire il server e il client in locale, esegui i seguenti comandi

```bash
make build-dev
make dev
```

Poi andare su localhost:8080 per l'interfaccia utente.

---

Per il deploy, sarà necessario prima conoscere il metodo di deploy che si vuole utilizzare. 

Sarà comunque sufficente un hosting che permetta l'orchestrazione di Docker Container (Railwap.app, Fly.io, AWS Fargate, un hosting che supporti Kubernetes, ecc...)
