import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  // ── Creation ──────────────────────────────────────────────────────────────

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ── loadCounter ───────────────────────────────────────────────────────────

  it('should return null when no counter value has been saved', () => {
    expect(service.loadCounter()).toBeNull();
  });

  it('should save and load a positive counter value', () => {
    service.saveCounter(42);
    expect(service.loadCounter()).toBe(42);
  });

  it('should save and load a negative counter value', () => {
    service.saveCounter(-7);
    expect(service.loadCounter()).toBe(-7);
  });

  it('should save and load zero', () => {
    service.saveCounter(0);
    expect(service.loadCounter()).toBe(0);
  });

  it('should return null when stored value is not a valid number', () => {
    localStorage.setItem('app_counter_value', 'not-a-number');
    expect(service.loadCounter()).toBeNull();
  });

  it('should return null when stored value is an empty string', () => {
    localStorage.setItem('app_counter_value', '');
    expect(service.loadCounter()).toBeNull();
  });

  it('should load a large positive integer correctly', () => {
    service.saveCounter(1_000_000);
    expect(service.loadCounter()).toBe(1_000_000);
  });

  it('should load a large negative integer correctly', () => {
    service.saveCounter(-9999);
    expect(service.loadCounter()).toBe(-9999);
  });

  // ── saveCounter ───────────────────────────────────────────────────────────

  it('should overwrite a previously saved value', () => {
    service.saveCounter(10);
    service.saveCounter(99);
    expect(service.loadCounter()).toBe(99);
  });

  it('should persist the value across multiple save calls', () => {
    for (let i = 1; i <= 5; i++) {
      service.saveCounter(i);
    }
    expect(service.loadCounter()).toBe(5);
  });

  it('should persist the counter value so it survives a new service instance', () => {
    service.saveCounter(77);

    // Simulate a restart by requesting a fresh service instance.
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const freshService = TestBed.inject(StorageService);

    expect(freshService.loadCounter()).toBe(77);
  });

  // ── clearCounter ──────────────────────────────────────────────────────────

  it('should return null after clearCounter is called', () => {
    service.saveCounter(5);
    service.clearCounter();
    expect(service.loadCounter()).toBeNull();
  });

  it('should be safe to call clearCounter when nothing has been saved', () => {
    expect(() => service.clearCounter()).not.toThrow();
    expect(service.loadCounter()).toBeNull();
  });

  it('should allow saving a new value after clearing', () => {
    service.saveCounter(10);
    service.clearCounter();
    service.saveCounter(20);
    expect(service.loadCounter()).toBe(20);
  });
});
