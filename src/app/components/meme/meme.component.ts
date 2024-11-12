import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import html2canvas from 'html2canvas-pro';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CaptionService } from '../../services/caption.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';



@Component({
  selector: 'app-meme',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.scss'],
})
export class MemeComponent implements OnInit {
  topText: string = '';
  bottomText: string = '';
  image: string = '';
  userInput: string = '';
  searchQuery: string = '';
  isLoading: boolean = false;

  constructor(
    public captionService: CaptionService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    const state: any = history.state;
    if (state && state.data) {
      this.image = state.data.image;
      this.topText = state.data.topText;
      this.bottomText = state.data.bottomText;
      this.userInput = state.data.userInput;
      this.searchQuery = state.data.searchQuery;
    } else {
      // Redirect to home if no data
      window.location.href = '/';
    }
  }

  downloadMeme() {
    const memeElement = document.getElementById('meme');
    if (memeElement) {
      html2canvas(memeElement, { useCORS: true }).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'meme.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  }

  regenerateMeme(): void {
    if (!this.userInput) {
      alert('No user input available to regenerate the meme.');
      return;
    }
    this.isLoading = true;
    this.captionService.generateMeme(this.userInput).subscribe(
      (response) => {
        this.bottomText = response.bottomText;
        this.topText = response.topText;
        this.image = response.image;
        this.searchQuery = response.searchQuery;
        this.isLoading = false;
        this.router.navigate(['/meme'], { state: { data: response } });
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
        alert('An error occurred while regenerating the meme.');
      }
    );
  }

  goBack() {
    window.location.href = '/';
  }
}
