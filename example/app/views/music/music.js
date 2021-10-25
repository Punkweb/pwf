import API from '../../services/api';
import template from './music.html';
import './music.scss';

class Music extends HTMLElement {
  connectedCallback() {
    console.log('connected music');
    this.innerHTML = template;
    this.getArtists();
  }

  getArtists() {
    API.Artists.list()
      .then((res) => {
        let artists = res.data.results;
        let artistsHTML = artists
          .map((artist) => {
            return `
            <div class="artist" router-link="/music/artist/${artist.slug}/">
              <div class="artist__image">
                <img src="${artist.thumbnail}" alt="${artist.name}" />
              </div>
              <h5 class="artist__name"><a>${artist.name}</a></h5>
              <label>${artist.genre}</label>
            </div>
          `;
          })
          .join('');
        let artistList = document.querySelector('#artistList');
        let artistsSpinner = document.querySelector('#artistsSpinner');
        artistsSpinner.style.display = 'none';
        artistList.innerHTML = artistsHTML;
      })
      .catch((err) => {
        console.log('getArtists err', err);
      });
  }
}

module.exports = Music;
