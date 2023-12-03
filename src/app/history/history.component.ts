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

  ngOnInit() {
   this.getHistory();
  }

  getHistory() {
    this.serverService.getSearches().subscribe(res => {
      this.searches = res
      console.log(res)
    })
  }

  getSearch(id: number) {

  }
}
