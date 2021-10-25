import API from '../../services/api';
import template from './home.html';
import './home.scss';

class Home extends HTMLElement {
  connectedCallback() {
    console.log('connected home');
    this.innerHTML = template;
    this.contactForm = document.querySelector('#contactForm');
    this.contactForm.addEventListener('submit', (e) => {
      this.submitContactForm(e);
    });
  }

  submitContactForm(e) {
    if (e) {
      e.preventDefault();
    }
    let emailInput = document.querySelector('#email');
    let subjectInput = document.querySelector('#subject');
    let bodyTextArea = document.querySelector('#body');
    let successP = document.querySelector('#contactSuccess');
    let errorP = document.querySelector('#contactError');
    successP.style.display = 'none';
    errorP.style.display = 'none';
    API.ContactForms.create({
      contact_info: emailInput.value,
      subject: subjectInput.value,
      body: bodyTextArea.value,
    })
      .then((res) => {
        // Clear inputs
        emailInput.value = '';
        subjectInput.value = '';
        bodyTextArea.value = '';
        // Show success message
        successP.textContent = `Thanks for reaching out.  If an email was provided we'll get back to you soon.`;
        successP.style.display = 'block';
        // Hide contact form
        this.contactForm.style.display = 'none';
      })
      .catch((err) => {
        console.log(err);
        errorP.textContent = `There was an error submitting your contact form.`;
        errorP.style.display = 'block';
      });
  }
}

module.exports = Home;
