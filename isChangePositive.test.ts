import { describe, it, expect } from 'vitest';
import { isChangePositive } from './crypto_ticker';

describe('isChangePositive', () => {
  it('returns false for -0', () => {
    expect(isChangePositive(-0)).toBe(false);
  });

  it('returns true for +0', () => {
    expect(isChangePositive(0)).toBe(true);
  });

  it('returns true for positive values', () => {
    expect(isChangePositive(1.23)).toBe(true);
  });

  it('returns false for negative values', () => {
    expect(isChangePositive(-1.23)).toBe(false);
  });
});
