import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-auth',
  templateUrl: './sidebar-auth.component.html',
  styleUrls: ['./sidebar-auth.component.less']
})
export class SidebarAuthComponent implements OnInit {

  public year: number;

  constructor() { }

  ngOnInit() {
    this.getYear();
  }
  
  getYear() {
      const date = new Date();
      this.year = date.getFullYear();
  }
}
