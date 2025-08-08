#!/bin/bash

# Start both frontend and backend in development mode

echo "🚀 Starting Bogle development environment..."

# Check if node_modules exist in server directory
if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    cd server && npm install && cd ..
fi

# Check if .env exists in server directory
if [ ! -f "server/.env" ]; then
    echo "⚠️  No .env file found in server directory"
    echo "📝 Please copy server/.env.example to server/.env and configure it"
    echo "💡 You'll need to set up Gmail app password for email notifications"
    exit 1
fi

# Start backend in background
echo "🔧 Starting backend server..."
cd server && npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend
echo "🎨 Starting frontend..."
cd .. && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Development environment started!"
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend:  http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait $FRONTEND_PID $BACKEND_PID