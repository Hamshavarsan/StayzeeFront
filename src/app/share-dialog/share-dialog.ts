// share-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-share-dialog',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>Share Property</h2>
    <mat-dialog-content>
      <mat-form-field class="w-full">
        <input matInput placeholder="Enter username" [(ngModel)]="username" (keyup.enter)="search()">
      </mat-form-field>
      <button mat-raised-button color="primary" (click)="search()">Search</button>

      <div *ngFor="let user of results" class="my-2 p-2 border rounded flex justify-between">
        <span>{{user.userName}}</span>
        <button mat-mini-fab color="accent" (click)="send(user.id)">Send</button>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]>Close</button>
    </mat-dialog-actions>
  `
})
export class ShareDialogComponent {
  username = '';
  results: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { rentalId: number },
    private api: ApiService,
    private dialogRef: MatDialogRef<ShareDialogComponent>
  ) {}

  search() {
    this.api.searchUser(this.username).subscribe(res => this.results = res);
  }

  send(userId: string) {
    this.api.shareRental({ rentalId: this.data.rentalId, toUserId: userId }).subscribe({
      next: () => {
        alert('Invitation sent!');
        this.dialogRef.close();
      }
    });
  }
}
