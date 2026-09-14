import { z } from 'zod';

export function requiredText(message: string) {
  return z.string({ error: message }).trim().min(1, { error: message });
}

export function optionalText(message: string) {
  return requiredText(message).optional();
}

export function positiveInteger(message: string) {
  return z.preprocess(
    (value) => (typeof value === 'string' && value.trim() ? Number(value) : value),
    z.number({ error: message }).int({ error: message }).positive({ error: message }),
  );
}

export function nonNegativeInteger(invalidMessage: string, negativeMessage: string) {
  return z.preprocess(
    (value) => (typeof value === 'string' && value.trim() ? Number(value) : value),
    z.number({ error: invalidMessage })
      .int({ error: invalidMessage })
      .nonnegative({ error: negativeMessage }),
  );
}

export function integerInRange(min: number, max: number, message: string) {
  return z.preprocess(
    (value) => (typeof value === 'string' && value.trim() ? Number(value) : value),
    z.number({ error: message })
      .int({ error: message })
      .min(min, { error: message })
      .max(max, { error: message }),
  );
}

export function validDate(message: string) {
  return z
    .string({ error: message })
    .refine((value) => !Number.isNaN(Date.parse(value)), { error: message });
}

export function emailText(message: string) {
  return z.string({ error: message }).trim().email({ error: message });
}
