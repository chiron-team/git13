import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Testing';
  version = '1.0.0';
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
