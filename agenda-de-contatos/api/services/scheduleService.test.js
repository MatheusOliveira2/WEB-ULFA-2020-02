import scheduleService from './scheduleService';

describe('scheduleService', () => {
  it('get', () => {
    const callback = (data) => {
      expect(data.length >= 0).toBe(true);
      expect(data.length < 0).toBe(false);
      expect(data).toBeDefined();
    };
    scheduleService.get(callback);
  });

  it('delete', () => {
    const callback = (data) => {
      expect(data).toBeDefined();
    };
    scheduleService.delete(8, callback);
  });
});
