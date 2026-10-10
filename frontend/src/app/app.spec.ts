import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Hello from Django' }),
      }),
    );

    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('displays the title and backend message', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    await vi.waitFor(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain('Hello from Django');
    });

    expect(
      fixture.nativeElement.querySelector('h1').textContent,
    ).toContain('CI/CD Demo');

    expect(fetch).toHaveBeenCalledWith('/api/hello/');
  });

  it('displays an error when the backend is unreachable', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Connection failed'));

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    await vi.waitFor(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain(
        'Cannot connect to Django',
      );
    });
  });
});