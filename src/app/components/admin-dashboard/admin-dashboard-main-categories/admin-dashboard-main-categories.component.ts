import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Group, MappedGroup } from 'src/app/Models/Models';
import { ApiService } from 'src/app/Services/ApiService';

@Component({
  selector: 'app-admin-dashboard-main-categories',
  templateUrl: './admin-dashboard-main-categories.component.html',
  styleUrls: ['./admin-dashboard-main-categories.component.css']
})
export class AdminDashboardMainCategoriesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'categories', 'actions'];
  dataSource: MatTableDataSource<MappedGroup>;
  searchControl: FormControl = new FormControl('');
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<MappedGroup>(this.allowMultiSelect, this.initialSelection);
  showUpsertMainCategory: boolean = false;
  groupToBeEdited!: Group;
  groups!: Group[];
  

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _liveAnnouncer: LiveAnnouncer, private dialog: MatDialog, private router: Router, private apiService: ApiService) {
    this.dataSource = new MatTableDataSource<MappedGroup>();

  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    this.apiService.getMainCategories().subscribe(response => {
        this.groups = response;

        const groupData = response.map(group => ({
            id: group.id,
            name: group.name,
            showOnLandingPage: group.showOnLandingPage,
            categories: group.categories.map(category => category.name).join(', ') // Join category names into a single string
        }));
        
        this.dataSource.data = groupData

       })


    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.applyFilter();
    });
  }

  applyFilter() {
    const filterValue = this.searchControl.value?.trim().toLowerCase() || '';
    this.dataSource.filter = filterValue;
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
  isSingleSelection(): boolean {
    return this.selection.selected.length === 1;
  }

  // You can add more methods specific to Group functionality here
  
  // For example, adding a new group
  addGroup() {
    this.showUpsertMainCategory = true;
  }

  editGroup(group: MappedGroup){

    this.groupToBeEdited = this.groups.filter(x => x.id == group.id)[0];
    this.showUpsertMainCategory = true;
  }

  deleteGroup(group: MappedGroup){
    console.log("delete");
  }
}