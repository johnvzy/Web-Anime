import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-gridcard',
  templateUrl: './gridcard.component.html',
  styleUrls: ['./gridcard.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0,
        visibility: 'hidden'
      })),
      transition('open <=> closed', animate('0.5s ease-out'))
    ])
  ]

})
export class GridcardComponent implements OnInit {

  notEmptyPost = true;
  notscrolly = true;
  scrollInit: any;
  detail_temp: any;
  close_status: boolean = true;
  private cardArray: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadInitPost();
    this.scrollInit = this.loadNextPost();
  }

  get cardItems(): any[] {
    return this.cardArray;
  }

  handleUndefined(item: any): any {
    return item.attributes.posterImage !== null ? item.attributes.posterImage?.large : '';
  }


  loadInitPost(): void {
    const url = "https://kitsu.io/api/edge/anime?sort=-startDate&page[limit]=10&page[offset]=0";
    this.http.get(url).subscribe((data: any) => {
      this.cardArray = data.data.reverse();
    });
  }

  //content part2
  loadNextPost() {
    let i = 11;
    return () => {
      const url = `https://kitsu.io/api/edge/anime?sort=-startDate&page[limit]=4&page[offset]=${i}`;
      this.http.get(url).subscribe((data: any) => {
        for (let i = data.data.length; i > 0; i--) {
          this.cardArray.push(data.data[i - 1]);
        }
      });
      i += 4;
    }
  }

  //detect the current distance and bottom of window
  onScroll(): void {
    if (this.notscrolly && this.notEmptyPost) {
      // this.notscrolly = false;
      this.scrollInit();
    }
  }

  enlargeContent(value: any): void {
    document.body.style.overflow = "hidden";
    this.close_status = false;
    this.detail_temp = {
      title: value.canonicalTitle,
      synopsis: value.synopsis,
      imgUrl: value.posterImage.large,
      thumbnail: value.posterImage.tiny,
      videoId: value.youtubeVideoId
    }
  }

  closeStatus(event: boolean): void {
    document.body.style.overflow = "auto";
    this.close_status = event;
    this.detail_temp.imgUrl = undefined; //remove last temp image on image attribute
    this.detail_temp.videoId = undefined;
  }
}
