import DOMPurify from "dompurify";

export const isValidNumber = (value: string): boolean => {
  const num = Number(value);
  return !isNaN(num) && isFinite(num) && num >= 0;
};

export const sanitizeAddress = (address: string): string => {
  return address.replace(/[^a-zA-Z0-9]/g, '');
};

export const validateAmount = (amount: string): boolean => {
  const sqlInjectionPattern = /(\b(select|insert|update|delete|drop|union|exec|declare)\b)|(['"\\;])/i;
  return !sqlInjectionPattern.test(amount);
};

export const sanitizeInput = (value: string): string => {
  return DOMPurify.sanitize(value, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
};

export const validateInput = (value: string): boolean => {
  return /^[0-9]*\.?[0-9]*$/.test(value) && isValidNumber(value);
}; 