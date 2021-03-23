import { Component, OnInit, Inject, HostListener, Output, EventEmitter, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss']
})
export class ScrollTopComponent implements OnInit {

  windowScrolled: boolean;

  @Output() scrollToTop: EventEmitter<any> = new EventEmitter();
  content: ElementRef;
  constructor(@Inject(DOCUMENT) private document: Document) { }

  // @HostListener('window:scroll', [])
  @HostListener('window:scroll', [])

  public onWindowScroll(content: any): void {
    this.content = content;
    if (window.pageYOffset || content.scrollTop || this.document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } else if (this.windowScrolled && window.pageYOffset || content.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }
  callScroll(): void {
    this.scrollToTop.emit(this.content);
  }
  ngOnInit(): void {
  }
}
