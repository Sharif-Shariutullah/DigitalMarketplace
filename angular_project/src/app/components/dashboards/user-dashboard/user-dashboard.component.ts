import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/services/storage.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent  implements OnInit {


  historyList!: any[];

   constructor(private orderService: OrderService, 
    private storageService: StorageService,
    private router: Router){}



  ngOnInit(): void {
    const user = this.storageService.getUser();

    this.orderService.getOrderList(user.user_name).subscribe({
      next:res=>{
        this.historyList = res;
        console.log('Categories---', this.historyList);
      },
      error:console.log
      
    });
  }



   


}
