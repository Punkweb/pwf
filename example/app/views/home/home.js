import { html, Component, Router } from '../../../../lib';
import micAndInterface from '../../../assets/img/mic-and-interface.jpg';
import API from '../../services/api';
import './home.scss';

class Home extends Component {
  init() {
    console.log('init home');
    this.email = '';
    this.subject = '';
    this.body = '';
    this.contactSuccess = '';
    this.contactError = '';
  }

  submitContactForm(e) {
    if (e) {
      e.preventDefault();
    }
    API.ContactForms.create({
      contact_info: this.email,
      subject: this.subject,
      body: this.body,
    })
      .then((res) => {
        this.email = '';
        this.subject = '';
        this.body = '';
        this.contactSuccess = `Thanks for reaching out.  If an email was provided we'll get back to you soon.`;
      })
      .catch((err) => {
        console.log('submitContactForm err', err);
        this.contactError = `There was an error submitting your contact form.`;
      });
  }

  render() {
    console.log('render home');
    return html`
      <div class="container">
        <div class="panel">
          <div class="home-header">
            <div class="home-header__img-wrap">
              <img src="${micAndInterface}" alt="" />
            </div>
            <h1 class="home-header__title">Punkweb</h1>
          </div>
          <div class="panel-body padding">
            <p>Punkweb is a music release platform for amatuer musicians and producers.</p>
            <h4>What can Punkweb offer me as an artist?</h4>
            <ul>
              <li>Unlimited song uploads and streaming.</li>
              <li>Schedule releases for a specific date.</li>
              <li>Add lyrics to your tracks. Let your words be heard.</li>
              <li>List upcoming concerts and events.</li>
              <li>Design and sell merch risk free, without inventory. Keep all your earnings.</li>
              <li><strong>... It's completely free!</strong></li>
            </ul>
            <p>
              Artists on Punkweb can stream their music, inform fans about upcoming events, and sell merch. All in one
              place!
            </p>
            <h4>Contact Us</h4>
            <form class="contact-form" @submit=${(e) => this.submitContactForm(e)}>
              <blockquote>
                The site is under construction, but we're looking for artists who're interested in joining today.<br />
                Shoot us your email and some brief information about your act and we'll send you an email reply.
              </blockquote>
              <small class="margin-bottom">Replies will be sent to the email entered below.</small>
              <input
                class="margin-bottom"
                type="email"
                placeholder="Email"
                @input=${(e) => {
                  this.email = e.target.value;
                }}
              />
              <input
                class="margin-bottom"
                type="text"
                placeholder="Subject"
                @input=${(e) => {
                  this.subject = e.target.value;
                }}
              />
              <textarea
                class="margin-bottom"
                placeholder="Body"
                @input=${(e) => {
                  this.body = e.target.value;
                }}
              ></textarea>
              <p class="error-text"></p>
              <button class="button-primary">Send</button>
              <!-- <button class="button-primary" [disabled]="sendDisabled()" (click)="sendContactForm()">Send</button> -->
            </form>
            <p class="success-text"></p>
          </div>
        </div>
      </div>
    `;
  }
}

module.exports = Home;
