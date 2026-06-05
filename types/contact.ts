export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormState {
  data: ContactFormData;
  errors: ValidationErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}
