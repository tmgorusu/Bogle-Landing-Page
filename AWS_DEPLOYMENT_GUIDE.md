# Bogle Pay - AWS Deployment Guide

This guide will help you deploy your waitlist backend to AWS using Terraform, replacing the current CSV-based system with a scalable cloud solution.

## 🏗️ Architecture Overview

Your new AWS backend includes:

- **DynamoDB Tables**: Store waitlist entries and email tracking
- **Lambda Function**: Handles all API requests
- **API Gateway**: Provides HTTP endpoints
- **SES**: Sends confirmation emails
- **CloudWatch**: Logs and monitoring
- **IAM**: Security roles and policies

## 📋 Prerequisites

1. **AWS Account** with appropriate permissions
2. **AWS CLI** installed and configured
3. **Terraform** installed (>= 1.0)
4. **Node.js** for Lambda dependencies

### Install Prerequisites (macOS)

```bash
# Install AWS CLI
brew install awscli

# Install Terraform
brew install terraform

# Configure AWS CLI
aws configure
```

## 🚀 Deployment Steps

### Step 1: Prepare Configuration

1. **Copy the example configuration:**
   ```bash
   cp terraform/terraform.tfvars.example terraform/terraform.tfvars
   ```

2. **Edit `terraform/terraform.tfvars`** with your values:
   ```hcl
   aws_region = "us-east-1"
   project_name = "bogle-waitlist"
   environment = "dev"
   email_from_address = "general@boglepay.com"
   frontend_url = "https://your-domain.com"
   ```

### Step 2: Verify Email in SES

Your email address must be verified in AWS SES before it can send emails:

```bash
aws ses verify-email-identity --email-address general@boglepay.com --region us-east-1
```

Check your email and click the verification link.

### Step 3: Deploy Infrastructure

Run the deployment script:

```bash
./deploy-aws.sh
```

Or manually:

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

### Step 4: Test the Deployment

After deployment, test your API:

```bash
# Get the API URL from Terraform output
API_URL=$(cd terraform && terraform output -raw api_gateway_url)

# Run tests
node terraform/scripts/test-api.js $API_URL
```

### Step 5: Update Frontend Configuration

Update `src/config.js` to use your new API Gateway URL:

```javascript
production: {
  // Replace with your actual API Gateway URL
  apiUrl: 'https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/dev'
}
```

## 📊 Migrating Existing Data

If you have existing waitlist data in CSV format, migrate it to DynamoDB:

```bash
# Install migration dependencies
cd terraform/scripts
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb

# Run migration (replace with your actual table name)
node migrate-csv-to-dynamodb.js ../../server/data/waitlist.csv bogle-waitlist-dev-waitlist us-east-1
```

## 🔧 Configuration Options

### Environment Variables

The Lambda function uses these environment variables (automatically set by Terraform):

- `WAITLIST_TABLE`: DynamoDB table for waitlist entries
- `EMAIL_TRACKING_TABLE`: DynamoDB table for email tracking
- `FROM_EMAIL`: Email address for sending confirmations
- `FRONTEND_URL`: Frontend URL for CORS
- `AWS_REGION`: AWS region

### Terraform Variables

Customize your deployment by editing `terraform.tfvars`:

```hcl
# AWS Configuration
aws_region = "us-east-1"          # AWS region
project_name = "bogle-waitlist"   # Project name (used in resource names)
environment = "dev"               # Environment (dev/staging/prod)

# Email Configuration
email_from_address = "general@boglepay.com"  # Must be verified in SES

# CORS Configuration
frontend_url = "https://boglepay.com"        # Your frontend URL
```

## 📈 Monitoring and Logs

### CloudWatch Logs

View Lambda function logs:

```bash
aws logs describe-log-groups --log-group-name-prefix "/aws/lambda/bogle-waitlist"
```

### DynamoDB Metrics

Monitor table usage in the AWS Console:
- Go to DynamoDB → Tables → Your table → Metrics

### SES Statistics

View email sending statistics:
- Go to SES → Sending Statistics

## 💰 Cost Estimation

Expected monthly costs for moderate usage:

- **DynamoDB**: $1-5 (pay per request)
- **Lambda**: $0-2 (generous free tier)
- **API Gateway**: $1-3 (pay per request)
- **SES**: $0.10 per 1,000 emails
- **CloudWatch**: $1-2 (logs and metrics)

**Total: ~$5-15/month** for typical waitlist usage

## 🔒 Security Features

- **IAM Roles**: Least privilege access
- **CORS**: Configured for your domain
- **Rate Limiting**: Built into API Gateway
- **Input Validation**: Email validation and sanitization
- **Encryption**: DynamoDB encryption at rest

## 🛠️ Troubleshooting

### Common Issues

1. **Email not sending**
   - Verify your email address in SES
   - Check SES sending limits (sandbox mode)
   - Review CloudWatch logs for errors

2. **CORS errors**
   - Update `frontend_url` in terraform.tfvars
   - Redeploy with `terraform apply`

3. **Lambda timeout**
   - Check CloudWatch logs
   - Increase timeout in `terraform/lambda.tf` if needed

4. **DynamoDB access denied**
   - Verify IAM permissions
   - Check resource ARNs in IAM policies

### Useful Commands

```bash
# View Terraform outputs
cd terraform && terraform output

# Check Lambda logs
aws logs tail /aws/lambda/bogle-waitlist-dev-waitlist-handler --follow

# Test specific endpoint
curl -X POST https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/dev/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Get waitlist count
curl https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/dev/waitlist/stats
```

## 🧹 Cleanup

To remove all AWS resources:

```bash
cd terraform
terraform destroy
```

## 📚 Next Steps

1. **Set up monitoring alerts** in CloudWatch
2. **Configure SES production access** (remove sandbox limits)
3. **Set up CI/CD pipeline** for automated deployments
4. **Add backup strategy** for DynamoDB
5. **Implement admin dashboard** for waitlist management

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review CloudWatch logs for detailed error messages
3. Verify all prerequisites are installed and configured
4. Ensure your AWS credentials have sufficient permissions

The infrastructure is designed to be cost-effective, scalable, and maintainable. Your waitlist can now handle thousands of signups without any performance issues!