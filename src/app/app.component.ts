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

  // Matrix Counter
  count = 0;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    const saved = this.storageService.loadCounter();
    if (saved !== null) {
      this.count = saved;
    }
  }

  increment(): void {
    this.count++;
    this.storageService.saveCounter(this.count);
  }

  decrement(): void {
    this.count--;
    this.storageService.saveCounter(this.count);
  }

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

  currentYear = new Date().getFullYear();
}
