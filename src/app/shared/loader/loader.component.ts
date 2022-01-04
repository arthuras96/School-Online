import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  public showOverlay = true;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.loading
    .pipe(
      tap(load => {
          this.showOverlay = load;
      })
    ).subscribe();
  }
}
