import { Component, OnInit } from '@angular/core';
import { Track } from '../Track';
import { TrackService } from '../track.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  tracks: Array<Track>;
  message: String;
  watchListApi = true;
  constructor(private trackService: TrackService) { this.tracks = [];
  }

  ngOnInit() {
  }

  deleteFromWishlist(track: Track) {
    this.trackService.deleteTrackFromWishList(track).subscribe((data) => {
      console.log('Deleted Track is: ', data);
    });
  }

  updateComments(track: Track) {
    console.log('Inside wishlist');
    this.trackService.updateComments(track).subscribe((data) => {
      console.log('Updated Data ', data);
    });
  }
  // tslint:disable-next-line:member-ordering
}
