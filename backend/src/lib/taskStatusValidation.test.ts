import { isValidStatusTransition } from './taskStatusValidation';

describe('isValidStatusTransition', () => {
  it('allows PENDING -> IN_PROGRESS', () => {
    expect(isValidStatusTransition('PENDING', 'IN_PROGRESS')).toBe(true);
  });

  it('allows IN_PROGRESS -> DONE', () => {
    expect(isValidStatusTransition('IN_PROGRESS', 'DONE')).toBe(true);
  });

  it('allows DONE -> ARCHIVED', () => {
    expect(isValidStatusTransition('DONE', 'ARCHIVED')).toBe(true);
  });

  it('rejects PENDING -> DONE (skip step)', () => {
    expect(isValidStatusTransition('PENDING', 'DONE')).toBe(false);
  });

  it('rejects PENDING -> ARCHIVED', () => {
    expect(isValidStatusTransition('PENDING', 'ARCHIVED')).toBe(false);
  });

  it('rejects IN_PROGRESS -> PENDING (backward)', () => {
    expect(isValidStatusTransition('IN_PROGRESS', 'PENDING')).toBe(false);
  });

  it('rejects DONE -> IN_PROGRESS', () => {
    expect(isValidStatusTransition('DONE', 'IN_PROGRESS')).toBe(false);
  });

  it('rejects ARCHIVED -> DONE', () => {
    expect(isValidStatusTransition('ARCHIVED', 'DONE')).toBe(false);
  });
});
