output "api_gateway_url" {
  description = "URL of the API Gateway"
  value       = "https://${aws_api_gateway_rest_api.waitlist_api.id}.execute-api.${var.aws_region}.amazonaws.com/${var.environment}"
}

output "waitlist_table_name" {
  description = "Name of the DynamoDB waitlist table"
  value       = aws_dynamodb_table.waitlist.name
}

output "email_tracking_table_name" {
  description = "Name of the DynamoDB email tracking table"
  value       = aws_dynamodb_table.email_tracking.name
}

output "lambda_function_name" {
  description = "Name of the Lambda function"
  value       = aws_lambda_function.waitlist_handler.function_name
}

output "lambda_function_arn" {
  description = "ARN of the Lambda function"
  value       = aws_lambda_function.waitlist_handler.arn
}