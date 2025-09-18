#!/usr/bin/env node

/**
 * Migration script to move existing CSV waitlist data to DynamoDB
 * 
 * Usage:
 * node migrate-csv-to-dynamodb.js <csv-file-path> <dynamodb-table-name> [aws-region]
 */

const fs = require('fs');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, BatchWriteCommand } = require('@aws-sdk/lib-dynamodb');

// Parse command line arguments
const csvFilePath = process.argv[2];
const tableName = process.argv[3];
const region = process.argv[4] || 'us-east-1';

if (!csvFilePath || !tableName) {
  console.error('Usage: node migrate-csv-to-dynamodb.js <csv-file-path> <dynamodb-table-name> [aws-region]');
  process.exit(1);
}

// Initialize DynamoDB client
const dynamoClient = new DynamoDBClient({ region });
const docClient = DynamoDBDocumentClient.from(dynamoClient);

async function migrateCsvToDynamoDB() {
  try {
    console.log(`📖 Reading CSV file: ${csvFilePath}`);
    
    // Check if file exists
    if (!fs.existsSync(csvFilePath)) {
      console.error(`❌ File not found: ${csvFilePath}`);
      process.exit(1);
    }

    // Read and parse CSV
    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) {
      console.log('📄 CSV file is empty, nothing to migrate.');
      return;
    }

    // Parse header
    const header = lines[0].split(',').map(col => col.trim().replace(/"/g, ''));
    console.log(`📋 CSV columns: ${header.join(', ')}`);

    // Parse data rows
    const dataRows = lines.slice(1).map(line => {
      const values = line.split(',').map(val => val.trim().replace(/"/g, ''));
      const row = {};
      header.forEach((col, index) => {
        row[col.toLowerCase()] = values[index] || '';
      });
      return row;
    });

    console.log(`📊 Found ${dataRows.length} records to migrate`);

    // Batch write to DynamoDB (max 25 items per batch)
    const batchSize = 25;
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < dataRows.length; i += batchSize) {
      const batch = dataRows.slice(i, i + batchSize);
      
      const putRequests = batch.map(row => ({
        PutRequest: {
          Item: {
            email: row.email || row.Email || '',
            timestamp: row.timestamp || row.Timestamp || new Date().toISOString(),
            ip: row.ip || row['IP Address'] || 'migrated',
            userAgent: row.useragent || row['User Agent'] || 'migrated'
          }
        }
      }));

      try {
        await docClient.send(new BatchWriteCommand({
          RequestItems: {
            [tableName]: putRequests
          }
        }));
        
        successCount += batch.length;
        console.log(`✅ Migrated batch ${Math.floor(i / batchSize) + 1}: ${batch.length} records`);
      } catch (error) {
        console.error(`❌ Error migrating batch ${Math.floor(i / batchSize) + 1}:`, error.message);
        errorCount += batch.length;
      }
    }

    console.log('\n🎉 Migration complete!');
    console.log(`✅ Successfully migrated: ${successCount} records`);
    if (errorCount > 0) {
      console.log(`❌ Failed to migrate: ${errorCount} records`);
    }

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateCsvToDynamoDB();