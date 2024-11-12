import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CaptionService } from '../../services/caption.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatProgressSpinnerModule, MatButtonModule, MatCardModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  userInput = '';
  isLoading = false;

  constructor(
    private captionService: CaptionService,
    private router: Router
  ) {}

  generateMeme() {
    if (!this.userInput.trim()) {
      alert('Please enter a topic or phrase.');
      return;
    }
    this.isLoading = true;

    // Call the backend to generate the meme
    this.captionService.generateMeme(this.userInput).subscribe(
      (response) => {
        this.router.navigate(['/meme'], { state: { data: response } });
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
        alert('An error occurred while generating the meme.');
      }
    );
  }

}
