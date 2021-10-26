import { Router, jsx } from '../../../../lib';
import micAndInterface from '../../../assets/img/mic-and-interface.jpg';
import API from '../../services/api';
import './home.scss';

function Home() {
  let email = '';
  let subject = '';
  let body = '';
  let contactSuccess = '';
  let contactError = '';

  function submitContactForm(e) {
    if (e) {
      e.preventDefault();
    }
    API.ContactForms.create({
      contact_info: email,
      subject,
      body,
    })
      .then((res) => {
        email = '';
        subject = '';
        body = '';
        contactSuccess = `Thanks for reaching out.  If an email was provided we'll get back to you soon.`;
      })
      .catch((err) => {
        console.log('submitContactForm err', err);
        contactError = `There was an error submitting your contact form.`;
      });
  }

  return (
    <div class={{ container: true }}>
      <div class={{ panel: true }}>
        <div class={{ 'home-header': true }}>
          <div class={{ 'home-header__img-wrap': true }}>
            <img props={{ src: micAndInterface, alt: '' }} />
          </div>
          <h1 class={{ 'home-header__title': true }}>Punkweb</h1>
        </div>
        <div class={{ 'panel-body': true, 'padding': true }}>
          <p>Punkweb is a music release platform for amatuer musicians and producers.</p>
          <h4>What can Punkweb offer me as an artist?</h4>
          <ul>
            <li>Unlimited song uploads and streaming.</li>
            <li>Schedule releases for a specific date.</li>
            <li>Add lyrics to your tracks. Let your words be heard.</li>
            <li>List upcoming concerts and events.</li>
            <li>Design and sell merch risk free, without inventory. Keep all your earnings.</li>
            <li>
              <strong>... It's completely free!</strong>
            </li>
          </ul>
          <p>
            Artists on Punkweb can stream their music, inform fans about upcoming events, and sell merch. All in one
            place!
          </p>
          <h4>Contact Us</h4>
          <form class={{ 'contact-form': true }} on={{ submit: (e) => submitContactForm(e) }}>
            <blockquote>
              The site is under construction, but we're looking for artists who're interested in joining today.
              <br />
              Shoot us your email and some brief information about your act and we'll send you an email reply.
            </blockquote>
            <small class={{ 'margin-bottom': true }}>Replies will be sent to the email entered below.</small>
            <input
              class={{ 'margin-bottom': true }}
              props={{
                type: 'email',
                placeholder: 'Email',
                value: email,
              }}
              on={{
                input: (e) => {
                  email = e.target.value;
                },
              }}
            />
            <input
              class={{ 'margin-bottom': true }}
              props={{
                type: 'text',
                placeholder: 'Subject',
                value: subject,
              }}
              on={{
                input: (e) => {
                  subject = e.target.value;
                },
              }}
            />
            <textarea
              class={{ 'margin-bottom': true }}
              props={{
                placeholder: 'Body',
                value: body,
              }}
              on={{
                input: (e) => {
                  body = e.target.value;
                },
              }}
            ></textarea>
            {contactError ? <p class={{ 'error-text': true }}>{contactError}</p> : null}
            <button class={{ 'button-primary': true }} props={{ type: 'submit' }}>
              Send
            </button>
          </form>
          {contactSuccess ? <p class={{ 'success-text': true }}>{contactSuccess}</p> : null}
        </div>
      </div>
    </div>
  );
}

module.exports = Home;
