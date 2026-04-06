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

  it('should have 4 features', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.features.length).toBe(4);
  });

  it('should display version', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.version).toBe('1.0.0');
  });

  it('should initialise counter at zero when no persisted value exists', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // triggers ngOnInit
    const app = fixture.componentInstance;
    expect(app.count).toBe(0);
  });

  it('should restore the counter from the persisted value on init', () => {
    storageServiceSpy.loadCounter.and.returnValue(7);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // triggers ngOnInit
    expect(fixture.componentInstance.count).toBe(7);
  });

  it('should restore a negative counter from the persisted value on init', () => {
    storageServiceSpy.loadCounter.and.returnValue(-3);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.count).toBe(-3);
  });

  it('should increment the counter', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.increment();
    expect(app.count).toBe(1);
    app.increment();
    expect(app.count).toBe(2);
  });

  it('should decrement the counter', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.decrement();
    expect(app.count).toBe(-1);
  });

  it('should save the counter after increment', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.increment();
    expect(storageServiceSpy.saveCounter).toHaveBeenCalledWith(1);
  });

  it('should save the counter after decrement', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.decrement();
    expect(storageServiceSpy.saveCounter).toHaveBeenCalledWith(-1);
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

  it('should render increment and decrement buttons', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('.matrix-btn');
    expect(buttons.length).toBe(2);
  });

  it('should increment counter when increment button is clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const incrementBtn = compiled.querySelector('.matrix-btn--increment') as HTMLButtonElement;
    incrementBtn.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.count).toBe(1);
  });

  it('should decrement counter when decrement button is clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const decrementBtn = compiled.querySelector('.matrix-btn--decrement') as HTMLButtonElement;
    decrementBtn.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.count).toBe(-1);
  });

  it('should display the counter value in the matrix display', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const display = compiled.querySelector('.matrix-value') as HTMLElement;
    expect(display.textContent?.trim()).toBe('0');
  });

  it('should display the restored counter value in the matrix display', () => {
    storageServiceSpy.loadCounter.and.returnValue(42);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const display = compiled.querySelector('.matrix-value') as HTMLElement;
    expect(display.textContent?.trim()).toBe('42');
  });
});
