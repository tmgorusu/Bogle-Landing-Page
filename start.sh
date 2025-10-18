#!/bin/bash

echo "🚀 Starting Bogle Landing Page..."

# Build frontend
echo "📦 Building frontend..."
npm run build

# Start backend in background
echo "🔧 Starting backend on port 3001..."
cd server
node server.js > ../server.log 2>&1 &
echo $! > ../server.pid
cd ..

# Wait a moment for backend to start
sleep 2

# Start frontend server
echo "🌐 Starting frontend on port 8080..."
npx serve dist -p 8080 > frontend.log 2>&1 &
echo $! > frontend.pid

echo ""
echo "✅ Bogle is running!"
echo "🌐 Frontend: http://localhost:8080"
echo "🔌 Backend: http://localhost:3001/api/health"
echo ""
echo "📊 View backend logs: tail -f server.log"
echo "📊 View frontend logs: tail -f frontend.log"
echo "🛑 Stop: ./stop.sh"

