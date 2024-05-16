import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { StorageService } from 'src/app/auth/services/storage.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public totalItem : number = 0;
  public searchTerm !: string;
  
  isLoggedIn: boolean = false;
  username: string ='';
  userDetails:any;



  private roles: any[] = [''];
  showAdminBoard = false;
  showModeratorBoard = false;
  showNormalBoard = false;





  constructor(private cartService : CartService,
    private storageService: StorageService,
    private authService: AuthService,) { }




  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{      
      this.totalItem = res.length;
      console.log( 'Total--',this.totalItem );
    })


    this.storageService.getUserDetail().subscribe(res =>
      {
        this.userDetails = res;
        this.isLoggedIn = true;

        this.roles = this.userDetails.roles;
  console.log("------ this.roles----------",  this.roles);
  
        this.showAdminBoard = this.roles.some(item => item === 'ROLE_ADMIN')
        this.showModeratorBoard = this.roles.some(item => item === 'ROLE_MODERATOR')      
        this.showNormalBoard = this.roles.some(item => item === 'ROLE_USER');

        console.log('--------------""-----------------Admin ', this.showAdminBoard,'User', this.showNormalBoard);

        console.log('--------------""-----------------', this.userDetails);
        
      }
    )
    


    this.isLoggedIn = this.storageService.isLoggedIn();


    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      console.log("USer---",user)
      this.roles = user.roles;

      this.showAdminBoard = this.roles.some(item => item === 'ROLE_ADMIN')
      this.showModeratorBoard = this.roles.some(item => item === 'ROLE_MODERATOR')      
      this.showNormalBoard = this.roles.some(item => item === 'ROLE_USER');

      this.username = user.sub;
    }

  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

  logout(){
    this.storageService.clean();
  };
}