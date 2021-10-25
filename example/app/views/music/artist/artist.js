import { html, App, Component, Router } from '../../../../../lib';
import API from '../../../services/api';
import './artist.scss';

class Artist extends Component {
  init() {
    console.log('init artist');
    this.params = Router.getParams();
    this.artist = [];
    this.artistLoaded = false;
    API.Artists.read(this.params.slug).then((res) => {
      this.artistLoaded = true;
      this.artist = res.data;
      App.redraw();
    });
  }

  render() {
    console.log('render artist');
    return html`
      <!-- <app-page-header [breadcrumbs]="breadcrumbs"></app-page-header> -->
      <div class="container">
        ${this.artistLoaded ? null : html`<div class="main-spinner"></div>`}
        ${this.artistLoaded && this.artist
          ? html`
          <div class="artist"">
            <div class="panel">
              <div class="artist-header">
                <div class="artist-header__img-wrap">
                  <img src="${this.artist.image}" />
                </div>
                <div class="artist-header__content">
                  <h1 class="artist-header__artist-name">${this.artist.name}</h1>
                  <div class="artist-header__buttons">
                    <button class="artist-header__play-button button-primary" (click)="clickMainPlay()">Play</button>
                  </div>
                  <div class="artist-header__tabs">
                    <div
                      class="artist-header__tab"
                      [ngClass]="{'artist-header__tab--selected': selectedTab === 'music'}"
                      (click)="selectedTab = 'music'"
                    >
                      Music
                    </div>
                    <div
                      class="artist-header__tab"
                      [ngClass]="{'artist-header__tab--selected': selectedTab === 'about'}"
                      (click)="selectedTab = 'about'"
                    >
                      About
                    </div>
                    <div
                      class="artist-header__tab"
                      [ngClass]="{'artist-header__tab--selected': selectedTab === 'events'}"
                      (click)="selectedTab = 'events'"
                    >
                      Events
                    </div>
                    <div
                      class="artist-header__tab"
                      [ngClass]="{'artist-header__tab--selected': selectedTab === 'shop'}"
                      *ngIf="artist.spreadshirt_shop_slug"
                      (click)="routeToShop()"
                    >
                      Shop
                    </div>
                  </div>
                </div>
              </div>
              <div class="panel-body padding" *ngIf="selectedTab === 'music'">
                <h3>Popular</h3>
                <hr class="clear-margin" />
                <div class="spinner" *ngIf="!top10Loaded"></div>
                <ng-container *ngIf="top10Loaded">
                  <ng-container *ngIf="top10.length < 1">
                    <p>This artist doesn't have any plays yet.</p>
                  </ng-container>
                  <ng-container *ngIf="top10.length > 0">
                    <div class="top-10-list">
                      <div
                        class="transitions item"
                        *ngFor="let song of top10Shown; let i = index;"
                        [ngClass]="{'item--selected': isCurrentSong(song) }"
                        (click)="clickTop10Song(i)"
                      >
                        <div class="item__img">
                          <!-- <img [src]="song.album_thumbnail" alt="" /> -->
                        </div>
                        <div class="item__rank">{{i + 1}}</div>
                        <div class="item__title">{{song.title}}</div>
                        <div class="item__plays">{{displaySongPlays(song.total_plays)}}</div>
                      </div>
                    </div>
                    <button class="button-hollow-primary" *ngIf="showMoreButton()" (click)="clickShowMore()">
                      Show More
                    </button>
                    <button class="button-hollow-primary" *ngIf="showLessButton()" (click)="clickShowLess()">
                      Show Less
                    </button>
                  </ng-container>
                </ng-container>
                <h3>Albums</h3>
                <hr />
                <div class="spinner" *ngIf="!albumsLoaded"></div>
                <div class="album-list" *ngIf="albumsLoaded">
                  <div
                    class="album"
                    router-link="/music/album/system-lynx/"
                    *ngFor="let album of albums"
                    (click)="routeToAlbum(album)"
                  >
                    <div class="album__image">
                      <!-- <img [src]="album.thumbnail" alt="" /> -->
                    </div>
                    <h5 class="album__name"><a (click)="routeToAlbum(album)">{{album.title}}</a></h5>
                    <label>{{album.release_date.format('Y')}}</label>
                  </div>
                </div>
              </div>
              <div class="panel-body padding" *ngIf="selectedTab === 'about'">
                <h3>About</h3>
                <hr />
                <p [innerHTML]="artistBio()"></p>
                <h3>Plays This Week</h3>
                <hr />
                <div class="plays">
                  <h3>Total Plays This Week:</h3>
                  <h1>{{totalPlaysThisWeek}}</h1>
                </div>
                <div class="chart-container">
                  <app-chart [data]="playsCanvasRef"></app-chart>
                </div>
              </div>
              <div class="panel-body padding" *ngIf="selectedTab === 'events'">
                <h3>Upcoming Events</h3>
                <hr />
                <div class="spinner" *ngIf="!eventsLoaded"></div>
                <ng-container *ngIf="eventsLoaded && upcomingEvents.length < 1">
                  <p>This artist has no scheduled events.</p>
                </ng-container>
                <ng-container *ngIf="eventsLoaded && upcomingEvents.length > 0">
                  <div class="table-container">
                    <table class="events-table">
                      <thead>
                        <tr>
                          <th class="col-lrg">Event</th>
                          <th class="col-md">Location</th>
                          <th class="col-md">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr *ngFor="let event of upcomingEvents">
                          <td (click)="routeToEvent(event)">
                            <div class="event__title__container">
                              <div class="calendar-widget">
                                <div class="calendar-widget__month">{{event.event_date.format('MMM')}}</div>
                                <div class="calendar-widget__day">{{event.event_date.format('DD')}}</div>
                              </div>
                              <span>{{event.title}}</span>
                            </div>
                          </td>
                          <td><span>{{event.venue}}, {{event.city}}</span></td>
                          <td>{{event.event_date.format('MMM Do, YYYY')}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </ng-container>
                <h3>Past Events</h3>
                <hr />
                <div class="spinner" *ngIf="!eventsLoaded"></div>
                <ng-container *ngIf="eventsLoaded&& pastEvents.length < 1">
                  <p>This artist has no past events.</p>
                </ng-container>
                <ng-container *ngIf="eventsLoaded&& pastEvents.length > 0">
                  <div class="table-container">
                    <table class="events-table">
                      <thead>
                        <tr>
                          <th class="col-lrg">Event</th>
                          <th class="col-md">Location</th>
                          <th class="col-md">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr *ngFor="let event of pastEvents">
                          <td (click)="routeToEvent(event)">
                            <div class="event__title__container">
                              <div class="calendar-widget">
                                <div class="calendar-widget__month">{{event.event_date.format('MMM')}}</div>
                                <div class="calendar-widget__day">{{event.event_date.format('DD')}}</div>
                              </div>
                              <span>{{event.title}}</span>
                            </div>
                          </td>
                          <td><span>{{event.venue}}, {{event.city}}</span></td>
                          <td>{{event.event_date.format('MMM Do, YYYY')}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </ng-container>
              </div>
            </div>
          </div>
          `
          : null}
      </div>
    `;
  }
}

module.exports = Artist;
