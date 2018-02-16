# Isomorphic Logger

Isomorphic logger with modular structure

Example of server-side logger instantiation:

```javascript
import {
  Logger,
  extractStackTrace,
  createInspectProcessor,
  createHighlightProcessor,
  writeToConsole
} from '@grabrinc/isomorphic-logger/server';

const logger = new Logger;

logger.channel(
  extractStackTrace,
  createInspectProcessor(),
  createHighlightProcessor(),
  writeToConsole
);
```
