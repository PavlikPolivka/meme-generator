import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface MemeResponse {
  topText: string;
  bottomText: string;
  image: string;
  userInput: string;
  searchQuery: string;
}

interface MemeResponseWithImages {
  topText: string;
  bottomText: string;
  searchQuery: string;
  userInput: string;
  images: Array<{ id: string; title: string; imageUrl: string }>;
}

@Injectable({
  providedIn: 'root',
})
export class CaptionService {
  private apiUrl = 'https://meme-generator-backend.vercel.app/api/generateMeme';

  constructor(private http: HttpClient) {}

  generateMeme(userInput: string): Observable<MemeResponse> {
    return this.http.post<MemeResponseWithImages>(this.apiUrl, { userInput }).pipe(
      map((response) => {
          let image = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcm5iNXNrd3NjYWY3cjRjcjA0YXlteXhub3k4ZWsycmpxYzJ4NmhncCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UHAYP0FxJOmFBuOiC2/giphy.gif';
          if (response.images.length > 0) {
            const randomImage = response.images[Math.floor(Math.random() * response.images.length)];
            image = randomImage.imageUrl;
          }
          return {
              topText: response.topText,
              bottomText: response.bottomText,
              userInput: response.userInput,
              searchQuery: response.searchQuery,
              image: image
          } as MemeResponse;
      })
    );
  }
}
