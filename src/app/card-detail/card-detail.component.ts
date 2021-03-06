import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { functions } from 'firebase';
import { of, Observable, interval, from, pipe } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  @Input() detail_cont: any;
  @Output() close_status = new EventEmitter<boolean>();

  currentWidth: number;
  thumbClicked: boolean = true;
  videoClicked: boolean = false;
  videoColor: string;
  thumbColor: string;


  constructor(private hostElement: ElementRef) { }

  ngOnInit(): void {
    this.currentWidth = window.innerWidth;

    //practice area
    const source = from([
      { 'name': 'john', 'age': '27' },
      { 'name': 'yanyie', 'age': '31' },
      { 'name': 'yanlin', 'age': '23' }]);

    const mapValues = pipe(
      filter((value:any) => {
        return value.age > 25
      }),
      map((name) => {
        return name.name
      }));
    const mapNumber = mapValues(source);
    mapNumber.subscribe(x => console.log(x))

    console.log();
  }


  closeEvent(): void {
    this.close_status.emit(true);

    //thumb or video css style initial
    this.thumbClicked = false;
    this.videoClicked = false;
    this.videoColor = "rgb(108 117 125 / 0.5)";
    this.thumbColor = "rgb(108 117 125 / 0.5)";
  }

  get handleUndefined(): any {
    this.thumbClicked = true;
    return typeof this.detail_cont === "undefined" ? '' : this.detail_cont;
  }

  videoPlayerUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}`;
  }

  videoThumbnail(videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/default.jpg`;
  }

  onSelect(className: string): void {
    switch (className) {
      case 'thumbBox':
        this.thumbClicked = true;
        this.videoClicked = false;
        this.thumbColor = "rgb(0 123 255 / 0.8)";
        this.videoColor = "rgb(108 117 125 / 0.5)";
        break;

      case 'videoBox':
        this.videoClicked = true;
        this.thumbClicked = false;
        this.videoColor = "rgb(0 123 255 / 0.8)";
        this.thumbColor = "rgb(108 117 125 / 0.5)";
        break;

      default:
        break;
    }
  }

  thumbStyle(): Object {
    if (this.handleUndefined.thumbnail) {
      return {
        'background': `url(${this.handleUndefined.thumbnail})`,
        'border-color': `${this.thumbColor}`
      }
    } else {
      return { 'background': 'none' }
    }
  }

  videoStyle(): Object {
    if (this.handleUndefined.thumbnail) {
      return {
        'background': `url(${this.videoThumbnail(this.handleUndefined.videoId)})`,
        'border-color': `${this.videoColor}`
      }
    } else {
      return { 'background': 'none' }
    }
  }
}
