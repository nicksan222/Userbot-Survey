# Analisi preliminare

## Ambiente di sviluppo

Data l'esplicita richiesta di utilizzare "Node.js", verrà utilizzato come Runtime del Docker container e npm come package manager.

La traccia non specifica esplicitamente quale tipo di interfaccia/applicazione implementare.
Le scelte sono diverse, ma si possono ridurre a:

- Un server REST-API, dove i file/link vengono caricati tramite richieste HTTP
- Un applicazione FULL-STACK, con interfaccia grafica e server REST-API (Implementabile con strumenti quali Next.js, o altri framework FULL-STACK)

Per soddisfare tutti questi requisiti, si è scelto di procedere a implementare un web server HTTP utilizzando Express.js.
La scelta di framework quali Nest.js o Fastify.js è stata scartata per la loro stretta imposizione di pattern, che non rispetta la richiesta di implementare almeno un Design Pattern **a piacimento**. Inoltre la loro complessità non è giustificata a mio avviso per un progetto di questa portata.

E' stata poi implementata un interfaccia grafica basilare tramite React.js (come bundler è stato scelto Vite.js)
I servizi comunicano tramite richieste HTTP con verso il server Express.js.

## Struttura del progetto

### Frontend (Interfaccia grafica come Web App)

##### Percorso: `./frontend`

Si è partiti da un template base di Vite.js.

```
npm create vite@latest frontend
```

Durante la fase di setup è stata scelta la configurazione "React + TypeScript + SWC".

---

### Backend (Server REST-API)

##### Percorso: `./backend`

Si è partiti da un progetto base con typescript e express.js installati

Il design pattern implementato è il **Facade**
Data la natura della richiesta, è evidente che il server deve essere in grado di gestire sia file locali, che link esterni.
E' presumibile anche che in futuro si voglia aggiungere la possibilità di gestire altri tipi di risorse, pertanto fornire un implementazione di alto livello per il caricamento di risorse è una scelta che permette di mantenere il codice più pulito e facilmente estendibile.

Visto che tutto si riduce alla lettura di caratteri, è stato scelto di implementare un metodo `read` che si occupa di leggere il contenuto di una risorsa, sia essa un file locale o un link esterno.

Un altro design pattern che si sarebbe potuto adottare è l'utilizzo di un middleware per smistare le richieste in base al tipo di risorsa da caricare.
Tuttavia è un design già implementato da Express.js stesso, pertanto non è propriamente "a piacimento".

In uno scenario reale, si sarebbe potuto implementare un middleware custom per gestire le richieste, ma in questo caso è stato scelto di non farlo.
