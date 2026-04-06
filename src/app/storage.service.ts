import { Injectable } from '@angular/core';

const COUNTER_KEY = 'app_counter_value';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  /**
   * Persist the counter value to localStorage.
   */
  saveCounter(value: number): void {
    localStorage.setItem(COUNTER_KEY, String(value));
  }

  /**
   * Load the counter value from localStorage.
   * Returns `null` when no value has been persisted yet.
   */
  loadCounter(): number | null {
    const raw = localStorage.getItem(COUNTER_KEY);
    if (raw === null) return null;

    const parsed = Number(raw);
    return isNaN(parsed) ? null : parsed;
  }

  /**
   * Remove the persisted counter value from localStorage.
   */
  clearCounter(): void {
    localStorage.removeItem(COUNTER_KEY);
  }
}
