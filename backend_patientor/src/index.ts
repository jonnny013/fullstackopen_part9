// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const app = require('./app');
import {PORT} from './utils/config';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
