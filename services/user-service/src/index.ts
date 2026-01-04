import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import authRoutes from './routes/auth';
// Umgebungsvariablen laden
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// CORS aktivieren
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

// Middleware: JSON-Body parsen
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);

// Health-Check Endpunkt
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'user-service'
  });
});

// Test-Endpunkt: Datenbankverbindung prüfen
app.get('/db-test', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ database: 'connected' });
  } catch (error) {
    res.status(500).json({ database: 'error', error: String(error) });
  }
});

// Server starten
app.listen(PORT, () => {
  console.log(`🚀 User Service running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

// Graceful Shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export { prisma };
