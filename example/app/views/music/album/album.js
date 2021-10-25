import { html, Component, Router } from '../../../../../lib';
import './album.scss';

class Album extends Component {
  init() {
    console.log('init album');
  }

  render() {
    console.log('render album');
    return html`
      <!-- <app-page-header [breadcrumbs]="breadcrumbs"></app-page-header> -->
      <div class="container">
        <div class="main-spinner" *ngIf="!album || !artist || tracks.length < 1"></div>
        <div class="album" *ngIf="album && artist && tracks.length > 0">
          <div class="panel">
            <div class="panel-body padding">
              <div class="album__info">
                <div class="album__info__flex">
                  <div>
                    <!-- <img class="album__image" [src]="album.thumbnail" alt="" /> -->
                  </div>
                  <div class="center-flex-on-mobile">
                    <h4 class="hide-on-mobile clear-margin">Album</h4>
                    <h1 class="album__title clear-margin">{{album.title}}</h1>
                    <div>By <a (click)="routeToArtist(artist)">{{artist.name}}</a></div>
                    <div>{{releaseDate.format('Y')}} • {{tracks.length}} songs, {{totalDuration()}} min</div>
                  </div>
                </div>
              </div>
              <div class="table-container">
                <table class="border-table">
                  <thead>
                    <tr>
                      <th class="col-x-sm">#</th>
                      <th class="col-full">Title</th>
                      <th class="col-x-sm align-center"><i class="fa fa-clock fa-fw"></i></th>
                      <th class="col-x-sm align-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      *ngFor="let song of tracks; index as i"
                      class="transitions"
                      [ngClass]="{'current-song': isCurrentSong(song)}"
                    >
                      <td>{{song.track_num}}</td>
                      <td class="clickable" (click)="clickSong(i)">
                        <span class="transitions song-title" [ngClass]="{'current-song-link': isCurrentSong(song)}"
                          >{{song.title}}</span
                        >
                      </td>
                      <td class="align-center">{{display(song.duration)}}</td>
                      <td class="align-right">
                        <ng-container *ngIf="song.bbcode_lyrics && song.bbcode_lyrics.length > 0">
                          <a (click)="clickSongLyrics(song)">Lyrics</a>
                        </ng-container>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p *ngIf="album.record_label_tag">© ℗ {{releaseDate.format('YYYY')}} {{album.record_label_tag}}</p>
              <p *ngIf="!album.record_label_tag">© {{releaseDate.format('YYYY')}} {{album.artist_name}}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

module.exports = Album;
