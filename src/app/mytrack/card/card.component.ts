import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Track } from '../Track';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  comments: string;
  @Input()
  track: Track;
  @Input()
  url: string;
  @Input()
  statusCode: number;
  @Input()
  watchListApi: boolean;
  @Output()
  addToWishList  = new EventEmitter();
  status: boolean;
  deleteFromWishlist: any;
  dialog: any;
  updateComments: any;
  constructor() { }

  ngOnInit() {
    console.log('data value', this.track);
  }
  onClickMe(track: Track) {
    this.addToWishList.emit(track);
  }
  deleteTrack(track: Track) {
    console.log('track is 1234', track);
    this.deleteFromWishlist.emit(track);


  }
  addComments(actionType): void {
    console.log('in add comments');
  //   const dialogRef = this.dialog.open(DialogComponent, {
  //    width: '55vh',
  //    height: '30vh',
  //    data: { trackId : this.track.trackId , comments : this.track.comments }
  //  });
  //  dialogRef.afterClosed().subscribe(result => {
  //    console.log('The dialog was closed' , result);
  //    // this.comments = result;
  //    this.track.comments = result;
  //     this.updateComments.emit(this.track);
  // // console.log('In Card comments' , result);
  //  });
  }
}
