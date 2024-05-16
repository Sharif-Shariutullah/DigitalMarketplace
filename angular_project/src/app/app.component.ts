import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './auth/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  isLoggedIn = false;

  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn()
  }
  title = 'my-ecommerce';
}
