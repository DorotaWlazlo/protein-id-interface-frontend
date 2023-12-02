import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ServerService } from '../service/server.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {

  constructor (public serverService: ServerService, private changeDetectorRef: ChangeDetectorRef) {}

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

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // dataSource: MatTableDataSource<Card> = new MatTableDataSource<Card>(DATA);

  // ngOnInit() {
  //   this.changeDetectorRef.detectChanges();
  //   this.dataSource.paginator = this.paginator;
  //   this.obs = this.dataSource.connect();
  // }

  // ngOnDestroy() {
  //   if (this.dataSource) { 
  //     this.dataSource.disconnect(); 
  //   }
  // }
}
