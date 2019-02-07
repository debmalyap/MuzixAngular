import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  branding = 'Sangeet';
  firstNav = 'Home';
  firstNavUrl = '';
  secondNav = 'WishList';
  secondNavUrl = 'wishlist';
  constructor() { }

  ngOnInit() {
  }

}
