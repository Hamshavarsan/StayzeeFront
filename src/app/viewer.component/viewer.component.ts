// src/app/viewer/viewer.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-viewer',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <div class="viewer-backdrop" (click)="close()">
      <div class="viewer-content" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="close()">×</button>
        <div class="gallery">
          <img *ngFor="let url of data.photos" [src]="url" alt="Property photo">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .viewer-backdrop { 
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; 
      background: rgba(0,0,0,0.95); display: flex; justify-content: center; align-items: center; z-index: 1000;
    }
    .viewer-content { position: relative; max-width: 95%; max-height: 95%; }
    .close-btn { position: absolute; top: -40px; right: 0; font-size: 40px; background: none; border: none; color: white; cursor: pointer; }
    .gallery img { max-width: 90vw; max-height: 85vh; border-radius: 12px; margin: 10px; }
  `]
})
export class ViewerComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { photos: string[] }
  ) {}

  close() {
    this.dialogRef.close();
  }
}