import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../index';

const router = Router();

// Validierungs-Schema für Registrierung
const signupSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z.string().min(8, 'Passwort muss mindestens 8 Zeichen lang sein'),
  firstName: z.string().optional(),
  lastName: z.string().optional()
});

// Validierungs-Schema für Login
const loginSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z.string().min(1, 'Passwort erforderlich')
});

// POST /api/v1/auth/signup - Registrierung
router.post('/signup', async (req, res) => {
  try {
    // 1. Eingabe validieren
    const data = signupSchema.parse(req.body);
    
    // 2. Prüfen, ob Email bereits existiert
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        error: 'E-Mail-Adresse bereits registriert' 
      });
    }
    
    // 3. Passwort verschlüsseln
    const passwordHash = await bcrypt.hash(data.password, 10);
    
    // 4. User in Datenbank erstellen
    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        displayName: data.firstName || data.email.split('@')[0]
      }
    });
    
    // 5. JWT-Token generieren
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );
    
    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    
    // 6. Session speichern
    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 Tage
      }
    });
    
    // 7. Antwort senden (OHNE Passwort!)
    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        tier: user.tier
      },
      accessToken,
      refreshToken
    });
    
  } catch (error) {
    // Validierungsfehler
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
errors: error.issues.map((e: any) => ({ field: e.path[0], message: e.message }))
      });
    }
    
    // Sonstige Fehler
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
});

// POST /api/v1/auth/login - Login
router.post('/login', async (req, res) => {
  try {
    // 1. Eingabe validieren
    const data = loginSchema.parse(req.body);
    
    // 2. User suchen
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });
    
    if (!user || !user.passwordHash) {
      return res.status(401).json({ 
        error: 'Ungültige E-Mail oder Passwort' 
      });
    }
    
    // 3. Passwort prüfen
    const isValidPassword = await bcrypt.compare(data.password, user.passwordHash);
    
    if (!isValidPassword) {
      return res.status(401).json({ 
        error: 'Ungültige E-Mail oder Passwort' 
      });
    }
    
    // 4. JWT-Token generieren
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );
    
    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    
    // 5. Session speichern
    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });
    
    // 6. Antwort senden
    res.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        tier: user.tier
      },
      accessToken,
      refreshToken
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
errors: error.issues.map((e: any) => ({ field: e.path[0], message: e.message }))      });
    }
    
    console.error('Login error:', error);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
});

export default router;
