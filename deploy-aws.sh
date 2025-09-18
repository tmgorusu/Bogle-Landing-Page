#!/bin/bash

# Bogle Pay AWS Deployment Script

set -e

echo "🚀 Deploying Bogle Pay Waitlist to AWS..."

# Check if terraform is installed
if ! command -v terraform &> /dev/null; then
    echo "❌ Terraform is not installed. Please install Terraform first."
    exit 1
fi

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install AWS CLI first."
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Please run 'aws configure' first."
    exit 1
fi

cd terraform

# Check if terraform.tfvars exists
if [ ! -f "terraform.tfvars" ]; then
    echo "📝 Creating terraform.tfvars from example..."
    cp terraform.tfvars.example terraform.tfvars
    echo "⚠️  Please edit terraform.tfvars with your values before continuing."
    echo "   Especially make sure to verify your email address in SES!"
    exit 1
fi

# Install Lambda dependencies
echo "📦 Installing Lambda dependencies..."
cd lambda
npm install --production
cd ..

# Initialize Terraform
echo "🔧 Initializing Terraform..."
terraform init

# Plan deployment
echo "📋 Planning deployment..."
terraform plan

# Ask for confirmation
read -p "🤔 Do you want to proceed with the deployment? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled."
    exit 1
fi

# Apply Terraform
echo "🚀 Deploying infrastructure..."
terraform apply -auto-approve

# Get outputs
echo ""
echo "✅ Deployment complete!"
echo ""
echo "📊 Infrastructure Details:"
terraform output

echo ""
echo "🎉 Your Bogle Pay waitlist backend is now running on AWS!"
echo ""
echo "📝 Next steps:"
echo "1. Update your frontend config to use the API Gateway URL"
echo "2. Verify your email address in AWS SES if you haven't already"
echo "3. Test the endpoints to make sure everything works"
echo ""
echo "💡 Tip: You can view logs in CloudWatch and monitor usage in the AWS console"