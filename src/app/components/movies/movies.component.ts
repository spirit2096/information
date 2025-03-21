import { Component, effect, inject } from '@angular/core';
import { MoviesStore } from '../../signal-store/movies/movies.store';
import { PrimeNgModule } from '../../modules/prime-ng/prime-ng.module';
@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [ PrimeNgModule ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {

  moviesStore = inject(MoviesStore);
  baseUrlImage = "https://image.tmdb.org/t/p/w500";
  responsiveOptions = [
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]
  constructor() {
    effect(() => {
      console.log(this.moviesStore.allNowPlaying());
    });
    
  }

  ngOnInit(): void {
    this.moviesStore.RequestMoviesNowPlaying({ page: 1 });
  }

}
