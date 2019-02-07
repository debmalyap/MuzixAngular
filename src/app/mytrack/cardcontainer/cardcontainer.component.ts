
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrackService } from '../track.service';
import { Track } from '../Track';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cardcontainer',
  templateUrl: './cardcontainer.component.html',
  styleUrls: ['./cardcontainer.component.scss']
})
export class CardcontainerComponent implements OnInit {
  tracks: Array<Track>;

  searchValue: string;
  statusCode: number;
  errorStatus: string;
  country: string;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private TrackService: TrackService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.tracks = [];
    // this.searchValue = this.muzixService.getSearchString();
    console.log('from service to component', this.searchValue);
  }

  ngOnInit() {
    const data = this.route.data.subscribe(country => {
      this.country = country.country;
      console.log('country', country.country);
    });
    this.TrackService.getTrackService(this.country).subscribe(tracksList => {
      this.tracks = tracksList;
      console.log('data value', tracksList);

    });
    console.log('Tracks', this.tracks);
  }

  addToWishList(track) {
    this.TrackService.addTracktoWishList(track).subscribe(
      data => {
        // console.log('data in thumbnail', data);
        this.statusCode = data.status;
        // console.log('success msg', data.body);
        if (this.statusCode === 201) {
          console.log('Success', this.statusCode);
          this.snackBar.open('Track Successfully added !!!', '', {
            duration: 1500
          });
        }
      },
      err => {
        const errorStatus = err;
        this.statusCode = parseInt(errorStatus, 10);
        if (this.statusCode === 409) {
          this.snackBar.open('Track already added', '', {
            duration: 1000
          });
          this.statusCode = 0;
        }
      }
    );
  }
}
