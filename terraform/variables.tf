variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "bogle-waitlist"
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "email_from_address" {
  description = "Email address to send from (must be verified in SES)"
  type        = string
  default     = "general@boglepay.com"
}

variable "frontend_url" {
  description = "Frontend URL for CORS"
  type        = string
  default     = "http://localhost:5173"
}