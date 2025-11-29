export const validateNumInput = (value: string, max?: number) => {
  if (value.trim() === "") {
    return undefined;
  }

  // Allow typing decimal point and partial numbers
  if (/^-?\d*\.?\d*$/.test(value)) {
    const num = parseFloat(value);
    if (!isNaN(num) && isFinite(num)) {
      if (max !== undefined && num > max) {
        return `${max}`;
      }
      return value;
    }
    // Return the string for partial input like "3." or "."
    return value;
  }

  return "0";
};
