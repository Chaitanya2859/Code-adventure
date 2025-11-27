import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
schema: './config/userschema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
