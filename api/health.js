export default function handler(req, res) {
  res.status(200).json({
    success: true,
    message: 'Bogle API is running',
    timestamp: new Date().toISOString()
  });
}