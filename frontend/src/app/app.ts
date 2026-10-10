import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>CI/CD Demo</h1><p>{{ message() }}</p>',
})
export class App {
  message = signal('Loading...');

  constructor() {
    fetch('/api/hello/')
      .then(response => {
        if (!response.ok) {
          throw new Error('API request failed');
        }
        return response.json();
      })
      .then(data => this.message.set(data.message))
      .catch(() => this.message.set('Cannot connect to Django'));
  }
}