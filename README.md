# Isomorphic Logger

Isomorphic logger with modular structure

Example of server-side logger instantiation:

```javascript
import {
  Logger,
  extractStackTrace,
  createInspector,
  createHighlighter,
  writeToConsole
} from '@grabrinc/isomorphic-logger/server';

const logger = new Logger;

logger.channel(
  extractStackTrace,
  createInspector(),
  createHighlighter(),
  writeToConsole
);
```
