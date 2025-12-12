// viewer.component.ts
import { Component, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-viewer',
  standalone: true,
  imports: [],
  template: `
    <div class="viewer-backdrop" (click)="close()">
      <div class="viewer-container" (click)="$event.stopPropagation()">
        
        <!-- Close Button -->
        <button class="close-btn" (click)="close()">×</button>

        <!-- Prev Button -->
        <button class="nav-btn prev-btn" (click)="prev()" *ngIf="photos.length > 1">
          ❮
        </button>

        <!-- Next Button -->
        <button class="nav-btn next-btn" (click)="next()" *ngIf="photos.length > 1">
          ❯
        </button>

        <!-- Current Image -->
        <img [src]="photos[currentIndex]" 
             alt="Property photo" 
             class="gallery-img"
             (click)="$event.stopPropagation()">

        <!-- Thumbnails (optional) -->
        <div class="thumbnails" *ngIf="photos.length > 1">
          <img *ngFor="let url of photos; let i = index" 
               [src]="url" 
               [class.active]="i === currentIndex"
               (click)="currentIndex = i"
               alt="thumb">
        </div>

        <!-- Image Counter -->
        <div class="counter" *ngIf="photos.length > 1">
          {{ currentIndex + 1 }} / {{ photos.length }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .viewer-backdrop {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.98); display: flex; justify-content: center; align-items: center;
      z-index: 1000;
    }
    .viewer-container {
      position: relative; max-width: 95vw; max-height: 95vh; text-align: center;
    }
    .close-btn {
      position: absolute; top: -50px; right: 0; font-size: 46px; background: none;
      border: none; color: white; cursor: pointer; z-index: 10;
    }
    .nav-btn {
      position: absolute; top: 50%; transform: translateY(-50%);
      background: rgba(0,0,0,0.5); color: white; border: none;
      width: 60px; height: 60px; font-size: 40px; cursor: pointer;
      border-radius: 50%; z-index: 10;
    }
    .prev-btn { left: 20px; }
    .next-btn { right: 20px; }
    .gallery-img {
      max-width: 90vw; max-height: 85vh; object-fit: contain; border-radius: 12px;
    }
    .thumbnails {
      margin-top: 15px; display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;
    }
    .thumbnails img {
      width: 80px; height: 60px; object-fit: cover; border-radius: 8px; cursor: pointer;
      opacity: 0.6; border: 3px solid transparent;
    }
    .thumbnails img.active {
      opacity: 1; border-color: #00bfa5;
    }
    .counter {
      position: absolute; bottom: -40px; left: 50%; transform: translateX(-50%);
      color: white; font-size: 18px; background: rgba(0,0,0,0.6); padding: 6px 16px; border-radius: 20px;
    }
  `]
})
export class ViewerComponent {
  photos: string[] = [];
  currentIndex = 0;

  constructor(
    public dialogRef: MatDialogRef<ViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { photos: string[], startIndex?: number }
  ) {
    this.photos = data.photos || [];
    this.currentIndex = data.startIndex || 0;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
  }

  close() {
    this.dialogRef.close();
  }

  // Keyboard navigation
  @HostListener('document:keydown.arrowright')
  onRight() { this.next(); }

  @HostListener('document:keydown.arrowleft')
  onLeft() { this.prev(); }

  @HostListener('document:keydown.escape')
  onEsc() { this.close(); }

  // Swipe support for mobile
  private touchStartX = 0;
  @HostListener('touchstart', ['$event'])
  onTouchStart(e: TouchEvent) {
    this.touchStartX = e.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(e: TouchEvent) {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = this.touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) this.next();
      else this.prev();
    }
  }
}