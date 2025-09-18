#!/usr/bin/env node

/**
 * Test script for the AWS API Gateway endpoints
 * 
 * Usage:
 * node test-api.js <api-gateway-url>
 */

import https from 'https';
import http from 'http';

const apiUrl = process.argv[2];

if (!apiUrl) {
  console.error('Usage: node test-api.js <api-gateway-url>');
  console.error('Example: node test-api.js https://abc123.execute-api.us-east-1.amazonaws.com/dev');
  process.exit(1);
}

// Helper function to make HTTP requests
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ statusCode: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ statusCode: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

async function testAPI() {
  console.log(`🧪 Testing API at: ${apiUrl}`);
  console.log('');

  try {
    // Test 1: Health check
    console.log('1️⃣ Testing health endpoint...');
    const healthResponse = await makeRequest(`${apiUrl}/health`);
    console.log(`   Status: ${healthResponse.statusCode}`);
    console.log(`   Response:`, healthResponse.data);
    console.log('');

    // Test 2: Get stats
    console.log('2️⃣ Testing stats endpoint...');
    const statsResponse = await makeRequest(`${apiUrl}/waitlist/stats`);
    console.log(`   Status: ${statsResponse.statusCode}`);
    console.log(`   Response:`, statsResponse.data);
    console.log('');

    // Test 3: Add to waitlist
    console.log('3️⃣ Testing waitlist signup...');
    const testEmail = `test-${Date.now()}@example.com`;
    const signupResponse = await makeRequest(`${apiUrl}/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: testEmail })
    });
    console.log(`   Status: ${signupResponse.statusCode}`);
    console.log(`   Response:`, signupResponse.data);
    console.log('');

    // Test 4: Try duplicate signup
    console.log('4️⃣ Testing duplicate signup...');
    const duplicateResponse = await makeRequest(`${apiUrl}/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: testEmail })
    });
    console.log(`   Status: ${duplicateResponse.statusCode}`);
    console.log(`   Response:`, duplicateResponse.data);
    console.log('');

    // Test 5: Invalid email
    console.log('5️⃣ Testing invalid email...');
    const invalidResponse = await makeRequest(`${apiUrl}/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: 'invalid-email' })
    });
    console.log(`   Status: ${invalidResponse.statusCode}`);
    console.log(`   Response:`, invalidResponse.data);
    console.log('');

    // Test 6: Get updated stats
    console.log('6️⃣ Testing updated stats...');
    const updatedStatsResponse = await makeRequest(`${apiUrl}/waitlist/stats`);
    console.log(`   Status: ${updatedStatsResponse.statusCode}`);
    console.log(`   Response:`, updatedStatsResponse.data);
    console.log('');

    console.log('✅ All tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run tests
testAPI();