import { BehaviorSubject } from 'rxjs';
import API from './api';

class AuthService {
  static user = null;
  static userSubject = new BehaviorSubject(null);
  static user$ = this.userSubject.asObservable();

  static signup({ username, password }) {
    return new Promise((resolve, reject) => {
      API.Register.create({
        username,
        password,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static login({ username, password }) {
    return new Promise((resolve, reject) => {
      API.TokenAuth.create({
        username,
        password,
      })
        .then((res) => {
          if (res && res.data && res.data.id && res.data.token) {
            localStorage.setItem('uid', res.data.id);
            localStorage.setItem('token', res.data.token);
            this.getUser(res.data.id);
          }
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static logout() {
    this.user = null;
    this.userSubject.next(this.user);
    localStorage.removeItem('uid');
    localStorage.removeItem('token');
  }

  static getUser(id) {
    API.Users.read(id).then((res) => {
      this.user = res.data;
      this.userSubject.next(this.user);
    });
  }

  static isLoggedIn() {
    return !!localStorage.getItem('uid') && !!localStorage.getItem('token');
  }
}

module.exports = AuthService;
