import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { User } from '../shared/class/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {

      const provider = new firebase.auth.FacebookAuthProvider();

      firebase.auth().signInWithPopup(provider).then(res => {
        resolve(res);
      }, err => {
        if (err.code === 'auth/account-exists-with-different-credential') {
          const pendingCred = err.credential;
          const email = err.email;
          firebase.auth().fetchSignInMethodsForEmail(email).then(methods => {
            if (methods[0] === 'password') {
              const password = prompt('Digite sua senha padrão para associar ao Facebook:');
              firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
                res.user.linkWithCredential(pendingCred);
                resolve(res);
              });
            }
          });
        } else {
          reject(err);
        }
      });
    });

  }

  doRegister(user: User){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(res => {
        firebase.auth().currentUser.updateProfile({
          displayName: user.name
        }).then(() => {
          resolve(res);
        });
      }, err => {
        reject(err);
      });
    });
  }

  doLogin(user: User){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut();
        resolve();
      } else {
        reject();
      }
    });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {

      const user = firebase.auth().currentUser;

      if (user) {
        resolve(user);
      } else {
        reject();
      }

    });
  }

}
