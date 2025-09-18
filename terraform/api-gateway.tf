# API Gateway REST API
resource "aws_api_gateway_rest_api" "waitlist_api" {
  name        = "${var.project_name}-${var.environment}-api"
  description = "API for Bogle Pay waitlist"

  endpoint_configuration {
    types = ["REGIONAL"]
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-api"
    Environment = var.environment
    Project     = var.project_name
  }
}

# API Gateway Resource - /waitlist
resource "aws_api_gateway_resource" "waitlist_resource" {
  rest_api_id = aws_api_gateway_rest_api.waitlist_api.id
  parent_id   = aws_api_gateway_rest_api.waitlist_api.root_resource_id
  path_part   = "waitlist"
}

# API Gateway Resource - /waitlist/stats
resource "aws_api_gateway_resource" "waitlist_stats_resource" {
  rest_api_id = aws_api_gateway_rest_api.waitlist_api.id
  parent_id   = aws_api_gateway_resource.waitlist_resource.id
  path_part   = "stats"
}

# API Gateway Resource - /health
resource "aws_api_gateway_resource" "health_resource" {
  rest_api_id = aws_api_gateway_rest_api.waitlist_api.id
  parent_id   = aws_api_gateway_rest_api.waitlist_api.root_resource_id
  path_part   = "health"
}

# API Gateway Method - POST /waitlist
resource "aws_api_gateway_method" "waitlist_post" {
  rest_api_id   = aws_api_gateway_rest_api.waitlist_api.id
  resource_id   = aws_api_gateway_resource.waitlist_resource.id
  http_method   = "POST"
  authorization = "NONE"
}

# API Gateway Method - OPTIONS /waitlist (CORS)
resource "aws_api_gateway_method" "waitlist_options" {
  rest_api_id   = aws_api_gateway_rest_api.waitlist_api.id
  resource_id   = aws_api_gateway_resource.waitlist_resource.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

# API Gateway Method - GET /waitlist/stats
resource "aws_api_gateway_method" "waitlist_stats_get" {
  rest_api_id   = aws_api_gateway_rest_api.waitlist_api.id
  resource_id   = aws_api_gateway_resource.waitlist_stats_resource.id
  http_method   = "GET"
  authorization = "NONE"
}

# API Gateway Method - GET /health
resource "aws_api_gateway_method" "health_get" {
  rest_api_id   = aws_api_gateway_rest_api.waitlist_api.id
  resource_id   = aws_api_gateway_resource.health_resource.id
  http_method   = "GET"
  authorization = "NONE"
}

# API Gateway Integration - POST /waitlist
resource "aws_api_gateway_integration" "waitlist_post_integration" {
  rest_api_id = aws_api_gateway_rest_api.waitlist_api.id
  resource_id = aws_api_gateway_resource.waitlist_resource.id
  http_method = aws_api_gateway_method.waitlist_post.http_method

  integration_http_method = "POST"
  type                   = "AWS_PROXY"
  uri                    = aws_lambda_function.waitlist_handler.invoke_arn
}

# API Gateway Integration - OPTIONS /waitlist (CORS)
resource "aws_api_gateway_integration" "waitlist_options_integration" {
  rest_api_id = aws_api_gateway_rest_api.waitlist_api.id
  resource_id = aws_api_gateway_resource.waitlist_resource.id
  http_method = aws_api_gateway_method.waitlist_options.http_method

  integration_http_method = "POST"
  type                   = "AWS_PROXY"
  uri                    = aws_lambda_function.waitlist_handler.invoke_arn
}

# API Gateway Integration - GET /waitlist/stats
resource "aws_api_gateway_integration" "waitlist_stats_get_integration" {
  rest_api_id = aws_api_gateway_rest_api.waitlist_api.id
  resource_id = aws_api_gateway_resource.waitlist_stats_resource.id
  http_method = aws_api_gateway_method.waitlist_stats_get.http_method

  integration_http_method = "POST"
  type                   = "AWS_PROXY"
  uri                    = aws_lambda_function.waitlist_handler.invoke_arn
}

# API Gateway Integration - GET /health
resource "aws_api_gateway_integration" "health_get_integration" {
  rest_api_id = aws_api_gateway_rest_api.waitlist_api.id
  resource_id = aws_api_gateway_resource.health_resource.id
  http_method = aws_api_gateway_method.health_get.http_method

  integration_http_method = "POST"
  type                   = "AWS_PROXY"
  uri                    = aws_lambda_function.waitlist_handler.invoke_arn
}

# Lambda permission for API Gateway
resource "aws_lambda_permission" "api_gateway_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.waitlist_handler.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.waitlist_api.execution_arn}/*/*"
}

# API Gateway Deployment
resource "aws_api_gateway_deployment" "waitlist_api_deployment" {
  depends_on = [
    aws_api_gateway_integration.waitlist_post_integration,
    aws_api_gateway_integration.waitlist_options_integration,
    aws_api_gateway_integration.waitlist_stats_get_integration,
    aws_api_gateway_integration.health_get_integration,
  ]

  rest_api_id = aws_api_gateway_rest_api.waitlist_api.id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.waitlist_resource.id,
      aws_api_gateway_resource.waitlist_stats_resource.id,
      aws_api_gateway_resource.health_resource.id,
      aws_api_gateway_method.waitlist_post.id,
      aws_api_gateway_method.waitlist_options.id,
      aws_api_gateway_method.waitlist_stats_get.id,
      aws_api_gateway_method.health_get.id,
      aws_api_gateway_integration.waitlist_post_integration.id,
      aws_api_gateway_integration.waitlist_options_integration.id,
      aws_api_gateway_integration.waitlist_stats_get_integration.id,
      aws_api_gateway_integration.health_get_integration.id,
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }
}

# API Gateway Stage
resource "aws_api_gateway_stage" "waitlist_api_stage" {
  deployment_id = aws_api_gateway_deployment.waitlist_api_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.waitlist_api.id
  stage_name    = var.environment

  tags = {
    Name        = "${var.project_name}-${var.environment}-api-stage"
    Environment = var.environment
    Project     = var.project_name
  }
}