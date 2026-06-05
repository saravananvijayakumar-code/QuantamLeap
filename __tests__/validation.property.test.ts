import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { validateContactForm } from "@/lib/validation";
import { ContactFormData } from "@/types/contact";

/**
 * **Validates: Requirements 7.6**
 * Property 2: Valid contact form submission succeeds
 */
describe("Property 2: Valid contact form submission succeeds", () => {
  it("should return isValid: true with empty errors for any valid ContactFormData", () => {
    const validEmail = fc
      .tuple(
        fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9._]{0,19}$/),
        fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9]{0,9}$/),
        fc.constantFrom(".com", ".org", ".net", ".io", ".au")
      )
      .map(([local, domain, tld]) => `${local}@${domain}${tld}`);

    const validName = fc
      .string({ minLength: 1 })
      .filter((s) => s.trim().length > 0);

    const validMessage = fc
      .string({ minLength: 1 })
      .filter((s) => s.trim().length > 0);

    fc.assert(
      fc.property(validName, validEmail, validMessage, (name, email, message) => {
        const data: ContactFormData = { name, email, message };
        const result = validateContactForm(data);
        expect(result.isValid).toBe(true);
        expect(result.errors).toEqual({});
      })
    );
  });
});

/**
 * **Validates: Requirements 7.7, 7.8**
 * Property 3: Invalid contact form input produces field-specific errors
 */
describe("Property 3: Invalid contact form input produces field-specific errors", () => {
  // Generator for empty/whitespace-only strings
  const emptyOrWhitespace = fc.constantFrom("", " ", "  ", "\t", "\n", "   \t\n  ");

  // Generator for invalid email formats
  const invalidEmail = fc.oneof(
    // Empty/whitespace
    emptyOrWhitespace,
    // No @ symbol
    fc.string({ minLength: 1 }).filter((s) => !s.includes("@") && s.trim().length > 0),
    // Multiple @ symbols
    fc
      .tuple(
        fc.stringMatching(/^[a-zA-Z]{1,5}$/),
        fc.stringMatching(/^[a-zA-Z]{1,5}$/),
        fc.stringMatching(/^[a-zA-Z]{1,5}$/)
      )
      .map(([a, b, c]) => `${a}@${b}@${c}`),
    // @ at start
    fc.stringMatching(/^[a-zA-Z]{1,10}$/).map((s) => `@${s}.com`),
    // @ at end
    fc.stringMatching(/^[a-zA-Z]{1,10}$/).map((s) => `${s}@`),
    // No domain part after @
    fc.stringMatching(/^[a-zA-Z]{1,10}$/).map((s) => `${s}@.`),
    // Spaces in email
    fc
      .tuple(
        fc.stringMatching(/^[a-zA-Z]{1,5}$/),
        fc.stringMatching(/^[a-zA-Z]{1,5}$/)
      )
      .map(([a, b]) => `${a} ${b}@example.com`)
  );

  // Generator for valid non-empty name
  const validName = fc
    .string({ minLength: 1 })
    .filter((s) => s.trim().length > 0);

  // Generator for valid email
  const validEmail = fc
    .tuple(
      fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9]{1,9}$/),
      fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9]{1,9}$/),
      fc.constantFrom(".com", ".org", ".net")
    )
    .map(([local, domain, tld]) => `${local}@${domain}${tld}`);

  // Generator for valid non-empty message
  const validMessage = fc
    .string({ minLength: 1 })
    .filter((s) => s.trim().length > 0);

  it("empty/whitespace-only name produces errors.name", () => {
    fc.assert(
      fc.property(emptyOrWhitespace, validEmail, validMessage, (name, email, message) => {
        const data: ContactFormData = { name, email, message };
        const result = validateContactForm(data);
        expect(result.isValid).toBe(false);
        expect(result.errors.name).toBeDefined();
      })
    );
  });

  it("empty/whitespace-only email produces errors.email", () => {
    fc.assert(
      fc.property(validName, emptyOrWhitespace, validMessage, (name, email, message) => {
        const data: ContactFormData = { name, email, message };
        const result = validateContactForm(data);
        expect(result.isValid).toBe(false);
        expect(result.errors.email).toBeDefined();
      })
    );
  });

  it("invalid email format produces errors.email", () => {
    fc.assert(
      fc.property(validName, invalidEmail, validMessage, (name, email, message) => {
        const data: ContactFormData = { name, email, message };
        const result = validateContactForm(data);
        expect(result.isValid).toBe(false);
        expect(result.errors.email).toBeDefined();
      })
    );
  });

  it("empty/whitespace-only message produces errors.message", () => {
    fc.assert(
      fc.property(validName, validEmail, emptyOrWhitespace, (name, email, message) => {
        const data: ContactFormData = { name, email, message };
        const result = validateContactForm(data);
        expect(result.isValid).toBe(false);
        expect(result.errors.message).toBeDefined();
      })
    );
  });

  it("multiple invalid fields produce error keys for ALL invalid fields", () => {
    fc.assert(
      fc.property(
        emptyOrWhitespace,
        invalidEmail,
        emptyOrWhitespace,
        (name, email, message) => {
          const data: ContactFormData = { name, email, message };
          const result = validateContactForm(data);
          expect(result.isValid).toBe(false);
          expect(result.errors.name).toBeDefined();
          expect(result.errors.email).toBeDefined();
          expect(result.errors.message).toBeDefined();
        }
      )
    );
  });
});
