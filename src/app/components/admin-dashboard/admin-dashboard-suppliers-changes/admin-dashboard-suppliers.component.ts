import {  AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { AdminDashboardProfilesChanged, DashboardProfiles, PartnerProfile, ProfilesAddedByMonth } from 'src/app/Models/Models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard-suppliers',
  templateUrl: './admin-dashboard-suppliers.component.html',
  styleUrls: ['./admin-dashboard-suppliers.component.css']
})
export class AdminDashboardSuppliersComponent implements OnInit, AfterViewInit {
    private _observer: BreakpointObserver;
    public isMobile!: Observable<boolean>;
    displayedColumnsProfilesChanged: string[] = ['firstname', 'lastname', 'category', 'actions'];
    searchControl = new FormControl('');
    changesProfileId?: number;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    profiles: AdminDashboardProfilesChanged[] = [{ id : 1, firstname: 'Misan', lastname: 'Andrei', category: 'M.C'  },
                                                  { id : 2, firstname: 'Sechei', lastname: 'Radu', category: 'M.C'  },
                                                  { id : 3, firstname: 'Varga', lastname: 'Alex', category: 'M.C'  },
                                                  { id : 1, firstname: 'Misan', lastname: 'Andrei', category: 'M.C'  },
                                                  { id : 2, firstname: 'Sechei', lastname: 'Radu', category: 'M.C'  },
                                                  { id : 3, firstname: 'Varga', lastname: 'Alex', category: 'M.C'  },
                                                  { id : 1, firstname: 'Misan', lastname: 'Andrei', category: 'M.C'  },
                                                  { id : 2, firstname: 'Sechei', lastname: 'Radu', category: 'M.C'  },
                                                  { id : 3, firstname: 'Varga', lastname: 'Alex', category: 'M.C'  }
                                                ];

    dataSource = new MatTableDataSource<AdminDashboardProfilesChanged>(this.profiles);
    
  constructor(private breakpointObserver: BreakpointObserver) {
    this._observer = breakpointObserver;
    
  }

  ngOnInit(): void {
   console.log(this.profiles);
    this.isMobile = this._observer.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.dataSource.filter = value!.trim().toLowerCase();
      });
  }

  acceptChanges(){

  }

  deleteChanges(){

  }

  showChanges(){
    this.changesProfileId = 9;
  }
}

  
