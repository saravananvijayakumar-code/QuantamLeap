import { ContactFormData, ValidationErrors } from "@/types/contact";

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: ValidationErrors = {};

  if (!data.name || data.name.trim() === "") {
    errors.name = "Name is required";
  }

  if (!data.email || data.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.message || data.message.trim() === "") {
    errors.message = "Message is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}
