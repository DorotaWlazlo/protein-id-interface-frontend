import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ServerService } from '../service/server.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {

  constructor (public serverService: ServerService, private changeDetectorRef: ChangeDetectorRef) {}

  proteins: any[] = this.serverService.searchResult.proteins;

  download(fileType: string) {
    let bytes;

    if(fileType === 'mgf'){
      bytes =  window.atob(this.serverService.searchResult.uploadedFile)
    } else {
      bytes = window.atob(this.serverService.searchResult.resultFile)
    }

    const buffer = new ArrayBuffer(bytes.length);
    const view = new Uint8Array(buffer);

    for (let n = 0; n < bytes.length; n++) {
      view[n] = bytes.charCodeAt(n);
    }

    var blob = new Blob([buffer], {type: 'application/octet-stream'});
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = this.serverService.searchResult.title + "." + fileType;
    link.click();
  }

  sortItemsByScore() {
    this.serverService.searchResult.proteins.sort((a: { score: number; }, b: { score: number; }) => b.score - a.score)
  }
  sortItemsByPeptideCount() {
    this.serverService.searchResult.proteins.sort((a: { peptideCount: number; }, b: { peptideCount: number; }) => b.peptideCount - a.peptideCount) 
  }
  sortItemsByScoreDescending() {
    this.serverService.searchResult.proteins.sort((a: { score: number; }, b: { score: number; }) => a.score - b.score) 
  }
  sortItemsByPeptideCountDescending() {
    this.serverService.searchResult.proteins.sort((a: { peptideCount: number; }, b: { peptideCount: number; }) => a.peptideCount - b.peptideCount)   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.serverService.searchResult.proteins = this.proteins.filter((el: { name: string }) => el.name.toLowerCase().includes(filterValue.trim().toLowerCase()))
}

}
