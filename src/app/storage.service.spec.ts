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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

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

  it('should overwrite a previously saved value', () => {
    service.saveCounter(10);
    service.saveCounter(99);
    expect(service.loadCounter()).toBe(99);
  });

  it('should return null after clearCounter is called', () => {
    service.saveCounter(5);
    service.clearCounter();
    expect(service.loadCounter()).toBeNull();
  });

  it('should return null when stored value is not a valid number', () => {
    localStorage.setItem('app_counter_value', 'not-a-number');
    expect(service.loadCounter()).toBeNull();
  });
});
