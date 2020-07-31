import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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

    console.log();
  }


  closeEvent(): void {
    this.close_status.emit(true);

    //thumb or video css style initial
    this.thumbClicked = true;
    this.videoClicked = false;
    this.handleUndefined.videoId = undefined;
    this.videoColor = "rgb(108 117 125 / 0.5)";
    this.thumbColor = "rgb(108 117 125 / 0.5)";
  }

  get handleUndefined(): any {
    return typeof this.detail_cont === "undefined" ? '' : this.detail_cont;
  }

  videoPlayerUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}`;
  }

  videoThumbnail(videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/default.jpg`;
  }

  onSelect(className: string): void {
    const iframe = this.hostElement.nativeElement.querySelector('iframe');

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
