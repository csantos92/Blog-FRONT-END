import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  
  //Imports variables into the component
  @Input() posts;
  @Input() identity;
  @Input() url;

  constructor() { }

  ngOnInit(): void {
  }

}
