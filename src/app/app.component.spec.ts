import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StorageService } from './storage.service';

describe('AppComponent', () => {
  let storageServiceSpy: jasmine.SpyObj<StorageService>;

  beforeEach(async () => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', [
      'loadCounter',
      'saveCounter',
      'clearCounter',
    ]);
    // Default: no previously saved value.
    storageServiceSpy.loadCounter.and.returnValue(null);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: StorageService, useValue: storageServiceSpy }],
    }).compileComponents();
  });

  // ── Creation & metadata ───────────────────────────────────────────────────

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Testing' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Testing');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Testing');
  });

  it('should display version', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.version).toBe('1.0.0');
  });

  it('should have 4 features', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.features.length).toBe(4);
  });

  // ── Counter initialisation ────────────────────────────────────────────────

  it('should initialise counter at zero when no persisted value exists', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // triggers ngOnInit
    expect(fixture.componentInstance.count).toBe(0);
  });

  it('should call loadCounter on init', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(storageServiceSpy.loadCounter).toHaveBeenCalledOnceWith();
  });

  it('should restore the counter from a saved positive value on init', () => {
    storageServiceSpy.loadCounter.and.returnValue(7);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.count).toBe(7);
  });

  it('should restore the counter from a saved negative value on init', () => {
    storageServiceSpy.loadCounter.and.returnValue(-3);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.count).toBe(-3);
  });

  it('should restore the counter when saved value is zero', () => {
    storageServiceSpy.loadCounter.and.returnValue(0);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.count).toBe(0);
  });

  it('should restore the counter from a large saved value on init', () => {
    storageServiceSpy.loadCounter.and.returnValue(1000);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.count).toBe(1000);
  });

  // ── increment ─────────────────────────────────────────────────────────────

  it('should increment the counter by one', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.increment();
    expect(app.count).toBe(1);
  });

  it('should increment the counter multiple times correctly', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.increment();
    app.increment();
    expect(app.count).toBe(2);
  });

  it('should increment from a negative value towards zero', () => {
    storageServiceSpy.loadCounter.and.returnValue(-1);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.componentInstance.increment();
    expect(fixture.componentInstance.count).toBe(0);
  });

  it('should save the counter after increment', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.increment();
    expect(storageServiceSpy.saveCounter).toHaveBeenCalledWith(1);
  });

  it('should save the updated counter on every increment', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.increment();
    app.increment();
    app.increment();
    expect(storageServiceSpy.saveCounter).toHaveBeenCalledTimes(3);
    expect(storageServiceSpy.saveCounter).toHaveBeenCalledWith(3);
  });

  it('should save each intermediate value during multiple increments', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.increment();
    app.increment();
    expect(storageServiceSpy.saveCounter.calls.allArgs()).toEqual([[1], [2]]);
  });

  // ── decrement ─────────────────────────────────────────────────────────────

  it('should decrement the counter by one', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.decrement();
    expect(app.count).toBe(-1);
  });

  it('should decrement the counter multiple times correctly', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.decrement();
    app.decrement();
    expect(app.count).toBe(-2);
  });

  it('should decrement from a positive value towards zero', () => {
    storageServiceSpy.loadCounter.and.returnValue(1);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.componentInstance.decrement();
    expect(fixture.componentInstance.count).toBe(0);
  });

  it('should save the counter after decrement', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.decrement();
    expect(storageServiceSpy.saveCounter).toHaveBeenCalledWith(-1);
  });

  it('should save the updated counter on every decrement', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.decrement();
    app.decrement();
    app.decrement();
    expect(storageServiceSpy.saveCounter).toHaveBeenCalledTimes(3);
    expect(storageServiceSpy.saveCounter).toHaveBeenCalledWith(-3);
  });

  it('should save each intermediate value during multiple decrements', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.decrement();
    app.decrement();
    expect(storageServiceSpy.saveCounter.calls.allArgs()).toEqual([[-1], [-2]]);
  });

  // ── Mixed increment / decrement ───────────────────────────────────────────

  it('should handle a mix of increments and decrements correctly', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.increment(); // 1
    app.increment(); // 2
    app.decrement(); // 1
    app.increment(); // 2
    app.decrement(); // 1
    app.decrement(); // 0
    expect(app.count).toBe(0);
  });

  it('should save the correct value after mixed operations', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.increment(); // 1
    app.decrement(); // 0
    app.decrement(); // -1
    expect(storageServiceSpy.saveCounter).toHaveBeenCalledWith(-1);
    expect(storageServiceSpy.saveCounter).toHaveBeenCalledTimes(3);
  });

  // ── Persistence across restart simulation ────────────────────────────────

  it('should not save to storage on init', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(storageServiceSpy.saveCounter).not.toHaveBeenCalled();
  });

  it('should reflect a persisted value and then increment from it', () => {
    storageServiceSpy.loadCounter.and.returnValue(10);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.componentInstance.increment();
    expect(fixture.componentInstance.count).toBe(11);
    expect(storageServiceSpy.saveCounter).toHaveBeenCalledWith(11);
  });

  it('should reflect a persisted value and then decrement from it', () => {
    storageServiceSpy.loadCounter.and.returnValue(5);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.componentInstance.decrement();
    expect(fixture.componentInstance.count).toBe(4);
    expect(storageServiceSpy.saveCounter).toHaveBeenCalledWith(4);
  });

  // ── DOM rendering ─────────────────────────────────────────────────────────

  it('should render increment and decrement buttons', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('.matrix-btn');
    expect(buttons.length).toBe(2);
  });

  it('should render the increment button with the correct aria-label', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.matrix-btn--increment') as HTMLButtonElement;
    expect(btn.getAttribute('aria-label')).toBe('Increment counter');
  });

  it('should render the decrement button with the correct aria-label', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.matrix-btn--decrement') as HTMLButtonElement;
    expect(btn.getAttribute('aria-label')).toBe('Decrement counter');
  });

  it('should display the counter value in the matrix display', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const display = fixture.nativeElement.querySelector('.matrix-value') as HTMLElement;
    expect(display.textContent?.trim()).toBe('0');
  });

  it('should display the restored counter value in the matrix display', () => {
    storageServiceSpy.loadCounter.and.returnValue(42);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const display = fixture.nativeElement.querySelector('.matrix-value') as HTMLElement;
    expect(display.textContent?.trim()).toBe('42');
  });

  it('should update the displayed counter value after increment', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const incrementBtn = fixture.nativeElement.querySelector(
      '.matrix-btn--increment'
    ) as HTMLButtonElement;
    incrementBtn.click();
    fixture.detectChanges();
    const display = fixture.nativeElement.querySelector('.matrix-value') as HTMLElement;
    expect(display.textContent?.trim()).toBe('1');
  });

  it('should update the displayed counter value after decrement', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const decrementBtn = fixture.nativeElement.querySelector(
      '.matrix-btn--decrement'
    ) as HTMLButtonElement;
    decrementBtn.click();
    fixture.detectChanges();
    const display = fixture.nativeElement.querySelector('.matrix-value') as HTMLElement;
    expect(display.textContent?.trim()).toBe('-1');
  });

  it('should increment counter when increment button is clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const incrementBtn = fixture.nativeElement.querySelector(
      '.matrix-btn--increment'
    ) as HTMLButtonElement;
    incrementBtn.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.count).toBe(1);
  });

  it('should decrement counter when decrement button is clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const decrementBtn = fixture.nativeElement.querySelector(
      '.matrix-btn--decrement'
    ) as HTMLButtonElement;
    decrementBtn.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.count).toBe(-1);
  });

  // ── CSS class bindings ────────────────────────────────────────────────────

  it('should apply matrix-value--positive class when count is positive', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.count = 1;
    fixture.detectChanges();
    const display = fixture.nativeElement.querySelector('.matrix-value') as HTMLElement;
    expect(display.classList).toContain('matrix-value--positive');
    expect(display.classList).not.toContain('matrix-value--negative');
  });

  it('should apply matrix-value--negative class when count is negative', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.count = -1;
    fixture.detectChanges();
    const display = fixture.nativeElement.querySelector('.matrix-value') as HTMLElement;
    expect(display.classList).toContain('matrix-value--negative');
    expect(display.classList).not.toContain('matrix-value--positive');
  });

  it('should not apply positive or negative class when count is zero', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const display = fixture.nativeElement.querySelector('.matrix-value') as HTMLElement;
    expect(display.classList).not.toContain('matrix-value--positive');
    expect(display.classList).not.toContain('matrix-value--negative');
  });

  // ── Status indicator ──────────────────────────────────────────────────────

  it('should show NOMINAL status when count is zero', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const status = fixture.nativeElement.querySelector('.matrix-ok') as HTMLElement;
    expect(status.textContent?.trim()).toBe('NOMINAL');
  });

  it('should show NOMINAL status when count is positive', () => {
    storageServiceSpy.loadCounter.and.returnValue(5);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const status = fixture.nativeElement.querySelector('.matrix-ok') as HTMLElement;
    expect(status.textContent?.trim()).toBe('NOMINAL');
  });

  it('should show WARNING status when count is negative', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.componentInstance.count = -1;
    fixture.detectChanges();
    const status = fixture.nativeElement.querySelector('.matrix-warn') as HTMLElement;
    expect(status.textContent?.trim()).toBe('WARNING');
  });

  it('should switch status from NOMINAL to WARNING after decrement below zero', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const decrementBtn = fixture.nativeElement.querySelector(
      '.matrix-btn--decrement'
    ) as HTMLButtonElement;
    decrementBtn.click();
    fixture.detectChanges();
    const status = fixture.nativeElement.querySelector('.matrix-warn') as HTMLElement;
    expect(status.textContent?.trim()).toBe('WARNING');
  });

  it('should switch status from WARNING back to NOMINAL after increment', () => {
    storageServiceSpy.loadCounter.and.returnValue(-1);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const incrementBtn = fixture.nativeElement.querySelector(
      '.matrix-btn--increment'
    ) as HTMLButtonElement;
    incrementBtn.click();
    fixture.detectChanges();
    const status = fixture.nativeElement.querySelector('.matrix-ok') as HTMLElement;
    expect(status.textContent?.trim()).toBe('NOMINAL');
  });
});
