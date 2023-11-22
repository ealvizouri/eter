import * as dotenv from 'dotenv';
dotenv.config();

import app from './server';

app.listen(process.env.PORT, () => {
  console.log(`Eter server listening on http://localhost:${process.env.PORT}`);
});
