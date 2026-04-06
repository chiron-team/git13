import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Testing';
  version = '1.0.0';
  currentYear = new Date().getFullYear();

  // ── Counter ────────────────────────────────────────────────────────────────

  /** Current counter value. Starts at zero and can be positive or negative. */
  count = 0;

<<<<<<< engineer-g/jhsvubdhdhysdbdoolb4-implement-localhost-persistence
  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    const saved = this.storageService.loadCounter();
    if (saved !== null) {
      this.count = saved;
    }
  }

=======
  /** Increases the counter value by one. */
>>>>>>> main
  increment(): void {
    this.count++;
    this.storageService.saveCounter(this.count);
  }

  /** Decreases the counter value by one. */
  decrement(): void {
    this.count--;
    this.storageService.saveCounter(this.count);
  }

<<<<<<< engineer-g/jhsvubdhdhysdbdoolb4-implement-localhost-persistence
=======
  // ── Features ───────────────────────────────────────────────────────────────

>>>>>>> main
  features = [
    {
      title: 'Angular',
      description: 'Modern web framework for building scalable applications',
      icon: '🅰️',
    },
    {
      title: 'TypeScript',
      description: 'Strongly typed programming language for enhanced development',
      icon: '📘',
    },
    {
      title: 'Node.js',
      description: 'JavaScript runtime for the development environment',
      icon: '🟢',
    },
    {
      title: 'CSS',
      description: 'Modern styling with best practices and utility classes',
      icon: '🎨',
    },
  ];
}
