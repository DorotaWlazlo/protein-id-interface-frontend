import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { HistoryComponent } from './history.component';
import { ServerService } from '../service/server.service';
import { MatTableModule } from '@angular/material/table';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let mockServerService: jasmine.SpyObj<ServerService>;

  beforeEach(() => {
    mockServerService = jasmine.createSpyObj('ServerService', ['getSearches', 'getSearchById']);

    TestBed.configureTestingModule({
      declarations: [HistoryComponent],
      imports: [MatTableModule],
      providers: [
        { provide: ServerService, useValue: mockServerService }
      ]
    });
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    const mockSearches = [{ title: 'Search 1' }, { title: 'Search 2' }];
    mockServerService.getSearches.and.returnValue(of(mockSearches));
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should call getHistory on ngOnInit', () => {
    spyOn(component, 'getHistory');
    component.ngOnInit();
    expect(component.getHistory).toHaveBeenCalled();
  });

  it('should set searches and dataSource on getHistory', () => {
    const mockSearches = [{ title: 'Search 1' }, { title: 'Search 2' }];
    mockServerService.getSearches.and.returnValue(of(mockSearches));

    component.getHistory();

    expect(component.searches).toEqual(mockSearches);
    expect(component.dataSource).toEqual(mockSearches);
    expect(component.searchesList).toEqual(mockSearches);
  });

  it('should set searchResult and proteins on getSearch', () => {
    const mockSearchId = 1;
    const mockSearchResult = { proteins: ['Protein 1', 'Protein 2'] };
    mockServerService.getSearchById.and.returnValue(of(mockSearchResult));

    component.getSearch(mockSearchId);

    expect(component.serverService.searchResult).toEqual(mockSearchResult);
    expect(component.serverService.proteins).toEqual(mockSearchResult.proteins);
    expect(component.clicked).toBeTrue();
  });

  it('should filter searches on applyFilter', () => {
    const mockSearches = [
      { title: 'Search 1' },
      { title: 'Search 2' },
      { title: 'Another one' }
    ];
    component.searches = mockSearches;

    const filterValue = 'Search';
    const mockEvent: any = { target: { value: filterValue } };

    component.applyFilter(mockEvent);

    expect(component.dataSource.length).toBe(2);
    expect(component.dataSource).toEqual([
      { title: 'Search 1' },
      { title: 'Search 2' }
    ]);
  });
  
});
