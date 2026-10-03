export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Yalnızca GET desteklenir.' });
  return res.status(200).json({
    ok: true,
    aiConfigured: Boolean(process.env.MANUS_API_URL && process.env.MANUS_API_KEY),
    fallbackAvailable: true,
  });
}
