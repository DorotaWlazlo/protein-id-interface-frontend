import { Component, OnInit } from '@angular/core';
import { ServerService } from '../service/server.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{
  constructor (public serverService: ServerService) {}

  searches: any[]
  displayedColumns: string[] = ['title'];
  dataSource: any[]
  clicked = false

  ngOnInit() {
   this.getHistory();
  }

  getHistory() {
    this.serverService.searchResult = null
    this.clicked = false;
    this.serverService.getSearches().subscribe(res => {
      this.searches = res
      console.log(res)
      this.dataSource = this.searches;
      console.log(this.dataSource)
    })
  }

  getSearch(search: any) {
    this.clicked = true;
    this.serverService.searchResult = search
  }
}
