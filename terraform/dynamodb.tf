# DynamoDB table for waitlist entries
resource "aws_dynamodb_table" "waitlist" {
  name           = "${var.project_name}-${var.environment}-waitlist"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "email"

  attribute {
    name = "email"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "S"
  }

  global_secondary_index {
    name            = "timestamp-index"
    hash_key        = "timestamp"
    projection_type = "ALL"
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-waitlist"
    Environment = var.environment
    Project     = var.project_name
  }
}

# DynamoDB table for email tracking (optional)
resource "aws_dynamodb_table" "email_tracking" {
  name           = "${var.project_name}-${var.environment}-email-tracking"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "email"
  range_key      = "timestamp"

  attribute {
    name = "email"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "S"
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-email-tracking"
    Environment = var.environment
    Project     = var.project_name
  }
}