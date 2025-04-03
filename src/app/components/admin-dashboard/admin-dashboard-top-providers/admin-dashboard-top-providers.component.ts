import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/Services/ApiService';
import { AdminProfileTopProvider } from 'src/app/Models/Models';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialogs/dialog-component/dialog.component';

@Component({
  selector: 'app-admin-dashboard-top-providers',
  templateUrl: './admin-dashboard-top-providers.component.html',
})
export class AdminDashboardTopProvidersComponent implements OnInit {
  dataSource = new MatTableDataSource<AdminProfileTopProvider>([]);
  displayedColumns: string[] = ['businessName', 'isTopProvider', 'actions'];
  topCount = 0;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadProviders();
  }

  loadProviders(): void {
    this.apiService.getAdminTopProviders().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.topCount = data.filter(p => p.isTopProvider).length;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleTopProvider(provider: AdminProfileTopProvider): void {
    const updatedProvider = { ...provider, isTopProvider: !provider.isTopProvider };
  
    this.apiService.setAdminTopProvider(updatedProvider).subscribe({
      next: () => {
        this.openSuccessDialog(updatedProvider.isTopProvider);
        this.loadProviders();
      },
      error: () => {
        this.openFailureDialog();
      }
    });
  }

  openSuccessDialog(added: boolean): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        message: added
          ? 'Profilul a fost adăugat cu succes în top!'
          : 'Profilul a fost eliminat din top cu succes!',
        isSuccess: true
      }
    });
  }
  
  openFailureDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        message: 'A apărut o eroare. Vă rugăm să încercați din nou.',
        isSuccess: false
      }
    });
  }
  
  
}
