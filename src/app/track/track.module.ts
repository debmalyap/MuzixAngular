import { SearchComponent } from './search/search.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CardcontainerComponent } from './cardcontainer/cardcontainer.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { MatCardModule, MatIcon, MatIconModule, MatSnackBar, MatSnackBarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TrackMaterialModule } from './track.material.module';
import { WishlistComponent } from './wishlist/wishlist.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, CardcontainerComponent, CardComponent, SearchComponent, WishlistComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    TrackMaterialModule,
  ],
  exports: [HeaderComponent, FooterComponent, CardcontainerComponent, CardComponent, SearchComponent, WishlistComponent]
})
export class TrackModule { }
