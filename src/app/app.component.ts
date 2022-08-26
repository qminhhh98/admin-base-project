import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('navbar') navbar!: ElementRef;
  title = 'admin-base-project';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
