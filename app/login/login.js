import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const { email, password } = req.body;

  // Hier die Benutzerdaten überprüfen (Mock-Daten oder Datenbank-Abfrage)
  if (email === 'test@example.com' && password === 'password') {
    // JWT Token erstellen
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Cookie setzen
    res.setHeader('Set-Cookie', serialize('auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    }));

    res.status(200).json({ message: 'Erfolgreich angemeldet' });
  } else {
    res.status(401).json({ message: 'Ungültige Anmeldedaten' });
  }
}
