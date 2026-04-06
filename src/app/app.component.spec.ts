import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
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

  it('should initialise counter at zero', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.count).toBe(0);
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
});
