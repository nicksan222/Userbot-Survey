#### Questo è l'unico endpoint esposto dal server.

### POST `/upload`

#### Descrizione

Una volta caricato a questo endpoint una combinazione dei seguenti parametri, il server si occuperà di caricare la risorsa e restituire l'analisi del contenuto.

#### Parametri

```json
{
  path?: string;
  type: string;
  text?: string;
}
```

- `path` è il percorso del file da caricare. Se non viene specificato, il server si aspetta di ricevere il contenuto del file nel parametro `text`.

- `type` è il tipo di file che si sta caricando. Può essere `local_file` o `url`.

La business logic del server si occuperà di caricare il file e restituire l'analisi del contenuto.
E' stato completamente testato con `Jest`.

### Possibili miglioramenti

- [ ] Implementare la generazione di OpenAPI Specification (Swagger) per documentare l'API
- [ ] Implementare un sistema di autenticazione per l'API
- [ ] Implementare un sistema di autorizzazione per l'API
- [ ] Implementare un sistema di rate-limiting per l'API
- [ ] Implementare un sistema di caching per l'API
- [ ] Implementare un sistema di logging per l'API
- [ ] Implementare un testing E2E per l'API
