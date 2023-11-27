import { Component } from '@angular/core';
import { ServerService } from '../service/server.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
  constructor (public serverService: ServerService) {}
}
