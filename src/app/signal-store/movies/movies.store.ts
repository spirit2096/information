import { inject } from "@angular/core"
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, exhaustMap, map, of, pipe, tap } from "rxjs";
// import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { MoviesService } from "../../services/movies/movies.service";
import { InterfaceMovie, Result } from "../../interfaces/InterfaceMovie";
export interface MoviesState {
    allNowPlaying: InterfaceMovie;
    isLoading: boolean;
    error: any;
    
}
const initialMoviesState: MoviesState = {
    allNowPlaying: {
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0
    },
    isLoading: false,
    error: null,     
}

export const MoviesStore = signalStore(
    { providedIn: 'root' },
    // withDevtools('AreaOfWorkState'),
    withState(initialMoviesState),
    withMethods((store, moviesService = inject(MoviesService)) => ({
        reset() {
            patchState(store, {
                allNowPlaying: {
                    page: 0,
                    results: [],
                    total_pages: 0,
                    total_results: 0
                },
                isLoading: false,
                error: null,
            })
        },
        // cleanIsCreate() {
        //     patchState(store, { isCreate: false })
        // },
       
        RequestMoviesNowPlaying: rxMethod<{ page: number }>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null, allNowPlaying: {
                    page: 0,
                    results: [],
                    total_pages: 0,
                    total_results: 0
                } })),
                exhaustMap((query) => moviesService.getMoviesNowPlaying(query.page)
                    .pipe(
                        map((resp: InterfaceMovie) => patchState(store, { allNowPlaying: resp , isLoading: false })),
                        catchError((error: any) => of(patchState(store, { error, isLoading: false })))
                    )
                )
            )
        ),
    
    }))

)