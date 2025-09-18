# Create Lambda deployment package
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/lambda"
  output_path = "${path.module}/lambda-deployment.zip"
}

# Lambda function
resource "aws_lambda_function" "waitlist_handler" {
  filename         = data.archive_file.lambda_zip.output_path
  function_name    = "${var.project_name}-${var.environment}-waitlist-handler"
  role            = aws_iam_role.lambda_role.arn
  handler         = "waitlist-handler.handler"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  runtime         = "nodejs18.x"
  timeout         = 30

  environment {
    variables = {
      WAITLIST_TABLE       = aws_dynamodb_table.waitlist.name
      EMAIL_TRACKING_TABLE = aws_dynamodb_table.email_tracking.name
      FROM_EMAIL          = var.email_from_address
      FRONTEND_URL        = var.frontend_url
    }
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-waitlist-handler"
    Environment = var.environment
    Project     = var.project_name
  }
}

# CloudWatch Log Group for Lambda
resource "aws_cloudwatch_log_group" "lambda_logs" {
  name              = "/aws/lambda/${aws_lambda_function.waitlist_handler.function_name}"
  retention_in_days = 14

  tags = {
    Name        = "${var.project_name}-${var.environment}-lambda-logs"
    Environment = var.environment
    Project     = var.project_name
  }
}