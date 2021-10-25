import { html, App, Component, Router } from '../../../../lib';
import API from '../../services/api';
import './music.scss';

class Music extends Component {
  init() {
    console.log('init music');
    this.artists = [];
    this.artistsLoaded = false;
    this.getArtists();
  }

  getArtists() {
    this.artistsLoaded = false;
    API.Artists.list()
      .then((res) => {
        this.artistsLoaded = true;
        this.artists = res.data.results;
        App.redraw();
      })
      .catch((err) => {
        console.log('getArtists err', err);
      });
  }

  render() {
    console.log('render music');
    return html`
      <!-- <app-page-header [breadcrumbs]="breadcrumbs"></app-page-header> -->
      <div class="container">
        <div class="music">
          <div class="panel">
            <div class="panel-body padding">
              <h3 style="margin-top: 0">Artists</h3>
              <hr />
              ${this.artistsLoaded ? null : html`<div class="spinner"></div>`}
              <div id="artistList" class="artist-list">
                ${this.artists.map(
                  (artist) => html` <div class="artist" router-link="/music/artist/${artist.slug}/">
                    <div class="artist__image">
                      <img src="${artist.thumbnail}" alt="${artist.name}" />
                    </div>
                    <h5 class="artist__name"><a>${artist.name}</a></h5>
                    <label>${artist.genre}</label>
                  </div>`
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

module.exports = Music;
