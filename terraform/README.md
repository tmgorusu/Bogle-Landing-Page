# Bogle Pay Waitlist - AWS Infrastructure

This Terraform configuration sets up the AWS infrastructure for the Bogle Pay waitlist system.

## Architecture

- **DynamoDB**: Stores waitlist entries and email tracking
- **Lambda**: Handles API requests (add to waitlist, get stats, health check)
- **API Gateway**: HTTP API endpoints
- **SES**: Sends confirmation emails
- **IAM**: Roles and policies for security

## Prerequisites

1. **AWS CLI configured** with appropriate credentials
2. **Terraform installed** (>= 1.0)
3. **SES email verification**: Your `email_from_address` must be verified in AWS SES

## Setup

1. **Copy the example variables file:**
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

2. **Update terraform.tfvars** with your values:
   - Set your AWS region
   - Update the email address (must be verified in SES)
   - Set your frontend URL for CORS

3. **Verify your email in SES:**
   ```bash
   aws ses verify-email-identity --email-address general@boglepay.com --region us-east-1
   ```

4. **Initialize Terraform:**
   ```bash
   terraform init
   ```

5. **Plan the deployment:**
   ```bash
   terraform plan
   ```

6. **Deploy the infrastructure:**
   ```bash
   terraform apply
   ```

## API Endpoints

After deployment, you'll get an API Gateway URL. The available endpoints are:

- `POST /waitlist` - Add email to waitlist
- `GET /waitlist/stats` - Get waitlist statistics
- `GET /health` - Health check

## Frontend Integration

Update your frontend configuration to use the new API Gateway URL instead of the local server.

## Monitoring

- Lambda logs are available in CloudWatch
- DynamoDB metrics are available in the AWS console
- SES sending statistics are available in the SES console

## Cleanup

To destroy all resources:
```bash
terraform destroy
```

## Cost Optimization

This setup uses:
- DynamoDB on-demand pricing (pay per request)
- Lambda with generous free tier
- API Gateway with pay-per-request pricing
- SES with very low email costs

Expected monthly cost for moderate usage: $5-20/month