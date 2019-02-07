import { Injectable } from '@angular/core';
import { Track } from '../mytrack/Track';
import { Image } from './image';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
        providedIn: 'root'
    })
export class TrackService {
    trackobj: Track;
    imageObj: Image;
    id: number;
    tracks1: Array<Track>;
    apiKey: String;
    springEndPoint: String;
    trackSubject: BehaviorSubject<any>;
    thirdPartyApi: String;
    thridPartyApi: string;
    errorMsg: string;
    errorStatus: string;
    errorBody: string;
    constructor(private http: HttpClient ) {
        this.thirdPartyApi = 'http://ws.audioscrobbler.com/2.0?method=geo.gettoptracks&country=';
        this.apiKey = '&api_key=d6c48013a37e917f118eab40bccbb37b&format=json';
        this.trackSubject = new BehaviorSubject([]);
        this.springEndPoint = 'http://localhost:8877/api/v1/';
    }
    getTrackService(country: String): BehaviorSubject<Array<Track>> {

        console.log('Country in service', country);
        const url = `${this.thirdPartyApi}` + `${country}${this.apiKey}`;
        console.log('url', url);
        this.tracks1 = [];
        this.http.get(url).subscribe(track => {
        const data = track['tracks']['track'];
        this.id = 5;
        data.forEach(targetData => {
        this.id++;
        this.trackobj = new Track();
        this.imageObj = new Image();
        this.imageObj.text = targetData['image'][2]['#text'];
        this.imageObj.size = targetData['image'][2]['size'];
        this.trackobj = targetData;
        // this.trackobj.songid = country.slice(0, 3) + this.id;
        this.trackobj.songid = this.id + 1;
        this.tracks1.push(this.trackobj);
      });
      this.trackSubject.next(this.tracks1);
    });
   return this.trackSubject;
   // return this.http.get(`${this.thirdPartyApi}${country}${this.apiKey}`);
    }
    addTracktoWishList(track: Track) {
        return this.http
        .post(this.springEndPoint + 'muzix', track, { observe: 'response' })
        .pipe(catchError(this.handleError));
      }
      private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.log('An error occured :', error.error.message);
        } else {
          this.errorStatus = `${error.status}`;
          console.log('Errormsg', this.errorStatus);
          this.errorBody = `${error.error}`;
          console.log(
            `Backened returned code ${error.status},` + `body was :${error.error}`
          );
        }
        return throwError(this.errorStatus);
      }
      getAllWishListTrack1(): BehaviorSubject<Array<Track>> {
        console.log('Inside getAllWishListTrack1');
        this.tracks1 = [];
        this.http.get<Track[]>(this.springEndPoint + 'muzix').subscribe(data => {
          console.log('data in service', data);
          this.tracks1 = data;
          this.trackSubject.next(this.tracks1);
        });
        return this.trackSubject;
      }
      deleteTrackFromWishList(track): BehaviorSubject<Array<Track>> {
        const id = track.trackId;
        console.log('id in service', id);
        const url = this.springEndPoint + 'muzix/' + `${id}`;
        this.http.delete(url, { responseType: 'text' }).subscribe(data => {});
        const index = this.tracks1.indexOf(track);
        this.tracks1.splice(index, 1);
        this.trackSubject.next(this.tracks1);
        return this.trackSubject;
      }
      updateComments(track) {
        const id = track.trackId;
        const com = track.comments;
        console.log('service comments', com);
        const url = this.springEndPoint + 'muzix/' + `${id}`;
        return this.http.put(url, track, { observe: 'response' });
      }
}
