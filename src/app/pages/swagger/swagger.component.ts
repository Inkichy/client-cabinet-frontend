import { Component, OnInit } from '@angular/core';
import SwaggerUI from 'swagger-ui';

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.less']
})
export class SwaggerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    SwaggerUI({
      url: window.location.protocol + '//' + window.location.hostname + '/swagger.json',
      dom_id: '#swagger-ui'
    });
  }
}
