import { expect, describe, it, jest, beforeEach, afterEach } from '@jest/globals';
import { buildDateFilter, PeriodEnum } from '@/core/utils/date-filter.util';

describe('buildDateFilter', () => {
  const FIXED_DATE = new Date('2026-09-13T14:20:00.000Z'); // Sunday in Sept 2026

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(FIXED_DATE);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('calculates CURRENT_WEEK correctly for a Sunday', () => {
    const filter = buildDateFilter(PeriodEnum.CURRENT_WEEK);
    expect(filter).toBeDefined();
    expect(filter?.gte).toBeInstanceOf(Date);
    expect(filter?.lte).toBeInstanceOf(Date);
    // Sunday Sept 13, 2026 -> distance to Monday is -6 -> Monday Sept 7
    expect(filter?.gte?.getDate()).toBe(7);
    expect(filter?.gte?.getHours()).toBe(0);
    expect(filter?.lte?.getDate()).toBe(13);
    expect(filter?.lte?.getHours()).toBe(23);
  });

  it('calculates LAST_WEEK correctly', () => {
    const filter = buildDateFilter(PeriodEnum.LAST_WEEK);
    expect(filter).toBeDefined();
    // Previous week Monday Aug 31 to Sunday Sept 6
    expect(filter?.gte?.getDate()).toBe(31);
    expect(filter?.lte?.getDate()).toBe(6);
  });

  it('calculates CURRENT_MONTH correctly', () => {
    const filter = buildDateFilter(PeriodEnum.CURRENT_MONTH);
    expect(filter).toBeDefined();
    expect(filter?.gte?.getMonth()).toBe(8); // Sept is 8 (0-indexed)
    expect(filter?.gte?.getDate()).toBe(1);
    expect(filter?.lte?.getMonth()).toBe(8);
    expect(filter?.lte?.getDate()).toBe(30);
  });

  it('calculates LAST_MONTH correctly', () => {
    const filter = buildDateFilter(PeriodEnum.LAST_MONTH);
    expect(filter).toBeDefined();
    expect(filter?.gte?.getMonth()).toBe(7); // August
    expect(filter?.gte?.getDate()).toBe(1);
    expect(filter?.lte?.getMonth()).toBe(7);
    expect(filter?.lte?.getDate()).toBe(31);
  });

  it('calculates CURRENT_SEMESTER correctly', () => {
    const filter = buildDateFilter(PeriodEnum.CURRENT_SEMESTER);
    expect(filter).toBeDefined();
    // September is month 8 -> second semester (July to Dec)
    expect(filter?.gte?.getMonth()).toBe(6); // July
    expect(filter?.gte?.getDate()).toBe(1);
    expect(filter?.lte?.getMonth()).toBe(11); // Dec
    expect(filter?.lte?.getDate()).toBe(31);
  });

  it('calculates LAST_SEMESTER correctly for second semester', () => {
    const filter = buildDateFilter(PeriodEnum.LAST_SEMESTER);
    expect(filter).toBeDefined();
    // Last semester is first semester of 2026 (Jan to June)
    expect(filter?.gte?.getFullYear()).toBe(2026);
    expect(filter?.gte?.getMonth()).toBe(0); // Jan
    expect(filter?.lte?.getMonth()).toBe(5); // June
    expect(filter?.lte?.getDate()).toBe(30);
  });

  it('calculates LAST_SEMESTER correctly when in first semester', () => {
    jest.setSystemTime(new Date('2026-03-15T12:00:00.000Z'));
    const filter = buildDateFilter(PeriodEnum.LAST_SEMESTER);
    expect(filter).toBeDefined();
    // In March 2026, last semester is July-Dec 2025
    expect(filter?.gte?.getFullYear()).toBe(2025);
    expect(filter?.gte?.getMonth()).toBe(6); // July
    expect(filter?.lte?.getFullYear()).toBe(2025);
    expect(filter?.lte?.getMonth()).toBe(11); // Dec
  });

  it('calculates CURRENT_YEAR correctly', () => {
    const filter = buildDateFilter(PeriodEnum.CURRENT_YEAR);
    expect(filter).toBeDefined();
    expect(filter?.gte?.getFullYear()).toBe(2026);
    expect(filter?.gte?.getMonth()).toBe(0);
    expect(filter?.gte?.getDate()).toBe(1);
    expect(filter?.lte?.getFullYear()).toBe(2026);
    expect(filter?.lte?.getMonth()).toBe(11);
    expect(filter?.lte?.getDate()).toBe(31);
  });

  it('calculates LAST_YEAR correctly', () => {
    const filter = buildDateFilter(PeriodEnum.LAST_YEAR);
    expect(filter).toBeDefined();
    expect(filter?.gte?.getFullYear()).toBe(2025);
    expect(filter?.gte?.getMonth()).toBe(0);
    expect(filter?.gte?.getDate()).toBe(1);
    expect(filter?.lte?.getFullYear()).toBe(2025);
    expect(filter?.lte?.getMonth()).toBe(11);
    expect(filter?.lte?.getDate()).toBe(31);
  });

  it('handles custom date range with both startDate and endDate', () => {
    const filter = buildDateFilter(PeriodEnum.CUSTOM, '2026-01-01', '2026-02-01');
    expect(filter).toBeDefined();
    expect(filter?.gte?.toISOString()).toContain('2026-01-01');
    expect(filter?.lte?.toISOString()).toContain('2026-02-01');
  });

  it('handles custom date range with only startDate', () => {
    const filter = buildDateFilter(undefined, '2026-01-01', undefined);
    expect(filter).toBeDefined();
    expect(filter?.gte?.toISOString()).toContain('2026-01-01');
    expect(filter?.lte).toBeUndefined();
  });

  it('handles custom date range with only endDate', () => {
    const filter = buildDateFilter(undefined, undefined, '2026-02-01');
    expect(filter).toBeDefined();
    expect(filter?.gte).toBeUndefined();
    expect(filter?.lte?.toISOString()).toContain('2026-02-01');
  });

  it('returns undefined when no period and invalid dates', () => {
    expect(buildDateFilter(undefined, 'invalid-date', 'another-invalid')).toBeUndefined();
    expect(buildDateFilter()).toBeUndefined();
  });
});
