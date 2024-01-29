import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultComponent } from './search-result.component';
import { ServerService } from '../service/server.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  let mockServerService: jasmine.SpyObj<ServerService>

  beforeEach(() => {
    mockServerService = jasmine.createSpyObj('ServerService', ['download']);
    TestBed.configureTestingModule({
      declarations: [SearchResultComponent],
      imports: [MatProgressSpinnerModule, MatToolbarModule, MatCardModule ],
      providers: [
        { provide: ServerService, useValue: mockServerService }
      ]
    });
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort items by score', () => {
    const mockProteins = [{ score: 3 }, { score: 1 }, { score: 2 }];
    component.serverService.searchResult = { proteins: mockProteins } as any;

    component.sortItemsByScore();

    expect(component.serverService.searchResult.proteins).toEqual([{ score: 3 }, { score: 2 }, { score: 1 }]);
  });

  it('should sort items by peptide count', () => {
    const mockProteins = [{ peptideCount: 3 }, { peptideCount: 1 }, { peptideCount: 2 }];
    component.serverService.searchResult = { proteins: mockProteins } as any;

    component.sortItemsByPeptideCount();

    expect(component.serverService.searchResult.proteins).toEqual([{ peptideCount: 3 }, { peptideCount: 2 }, { peptideCount: 1 }]);
  });

  it('should sort items by score descending', () => {
    const mockProteins = [{ score: 3 }, { score: 1 }, { score: 2 }];
    component.serverService.searchResult = { proteins: mockProteins } as any;

    component.sortItemsByScoreDescending();

    expect(component.serverService.searchResult.proteins).toEqual([{ score: 1 }, { score: 2 }, { score: 3 }]);
  });

  it('should sort items by peptide count descending', () => {
    const mockProteins = [{ peptideCount: 3 }, { peptideCount: 1 }, { peptideCount: 2 }];
    component.serverService.searchResult = { proteins: mockProteins } as any;

    component.sortItemsByPeptideCountDescending();

    expect(component.serverService.searchResult.proteins).toEqual([{ peptideCount: 1 }, { peptideCount: 2 }, { peptideCount: 3 }]);
  });

  it('should apply filter', () => {
    const mockEvent: any = { target: { value: 'MockName' } };
    const mockProteins = [{ name: 'MockName' }, { name: 'OtherName' }];
    component.serverService.proteins = mockProteins;
    component.serverService.searchResult = { proteins: mockProteins } as any;

    component.applyFilter(mockEvent);

    expect(component.serverService.searchResult.proteins).toEqual([{ name: 'MockName' }]);
  });
});
