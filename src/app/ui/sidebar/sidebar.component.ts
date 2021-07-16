import { Component, OnInit } from '@angular/core';
import { CabinetService } from '../../core/services/api/cabinet.service';
import { AuthService } from '../../core/services/api/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private cabinetService: CabinetService,
    private authService: AuthService)
    {}
  ngOnInit() {
  }
  onSignOut() {
    this.cabinetService.dataSubject.next(null);
    this.authService.signOut().subscribe();
  }
}