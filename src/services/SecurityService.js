/* eslint-disable */
import Oidc from 'oidc-client';
import 'babel-polyfill';

var mgr = new Oidc.UserManager({
  userStore: new Oidc.WebStorageStateStore({
    store: window.sessionStorage,
  }),
  // authority:
  //   'https://distributor-test.shdchina.siemens-healthineers.cn/Identity',
  // redirect_uri:
  //   'https://distributor-test.shdchina.siemens-healthineers.cn/web/callback.html',
  // authority: process.env.IDENTITY,
  authority: process.env.IDENTITY,
  client_id: 'mvc',
  client_secret:"secret",
  redirect_uri: process.env.REDIRECT_URL,
  // redirect_uri:  'http://localhost:8005/callback.html',
  // redirect_uri: process.env.REDIRECT_URL,
  response_type: 'code',
  scope: 'openid',
  post_logout_redirect_uri: window.location.origin + '/index.html',
  silent_redirect_uri: window.location.origin + '/silent-renew.html',
  accessTokenExpiringNotificationTime: 10,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
});
Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

mgr.events.addUserLoaded(function (user) {
  console.log('New User Loaded：', arguments);
  console.log('Acess_token: ', user.access_token);
});

mgr.events.addAccessTokenExpiring(function () {
  console.log('AccessToken Expiring：', arguments);
});

mgr.events.addAccessTokenExpired(function () {
  console.log('AccessToken Expired：', arguments);
  alert('Session expired. Going out!');
  mgr
    .signoutRedirect()
    .then(function (resp) {
      console.log('signed out', resp);
    })
    .catch(function (err) {
      console.log(err);
    });
});

mgr.events.addSilentRenewError(function () {
  console.error('Silent Renew Error：', arguments);
});

export default class SecurityService {
  // Renew the token manually
  renewToken() {
    let self = this;
    return new Promise((resolve, reject) => {
      mgr
        .signinSilent()
        .then(function (user) {
          if (user == null) {
            self.signIn(null);
          } else {
            return resolve(user);
          }
        })
        .catch(function (err) {
          console.log(err);
          return reject(err);
        });
    });
  }

  // Get the user who is logged in
  getUser() {
    let self = this;
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function (user) {
          if (user == null) {
            self.signIn();
            return resolve(null);
          } else {
            return resolve(user);
          }
        })
        .catch(function (err) {
          console.log(err);
          return reject(err);
        });
    });
  }

  // Check if there is any user logged in
  getSignedIn() {
    let self = this;
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function (user) {
          if (user == null) {
            self.signIn();
            return resolve(false);
          } else {
            return resolve(true);
          }
        })
        .catch(function (err) {
          console.log(err);
          return reject(err);
        });
    });
  }

  // Redirect of the current window to the authorization endpoint.
  signIn() {
    mgr.signinRedirect().catch(function (err) {
      console.log(err);
    });
  }

  // Redirect of the current window to the end session endpoint
  signOut() {
    mgr
      .signoutRedirect()
      .then(function (resp) {
        console.log('signed out', resp);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  // Get the profile of the user logged in
  getProfile() {
    let self = this;
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function (user) {
          if (user == null) {
            self.signIn();
            return resolve(null);
          } else {
            return resolve(user.profile);
          }
        })
        .catch(function (err) {
          console.log(err);
          return reject(err);
        });
    });
  }

  // Get the token id
  getIdToken() {
    let self = this;
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function (user) {
          if (user == null) {
            self.signIn();
            return resolve(null);
          } else {
            return resolve(user.id_token);
          }
        })
        .catch(function (err) {
          console.log(err);
          return reject(err);
        });
    });
  }

  // Get the session state
  getSessionState() {
    let self = this;
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function (user) {
          if (user == null) {
            self.signIn();
            return resolve(null);
          } else {
            return resolve(user.session_state);
          }
        })
        .catch(function (err) {
          console.log(err);
          return reject(err);
        });
    });
  }

  // Get the access token of the logged in user
  getAcessToken() {
    let self = this;
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function (user) {
          if (user == null) {
            self.signIn();
            return resolve(null);
          } else {
            return resolve(user.access_token);
          }
        })
        .catch(function (err) {
          console.log(err);
          return reject(err);
        });
    });
  }

  // Takes the scopes of the logged in user
  getScopes() {
    let self = this;
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function (user) {
          if (user == null) {
            self.signIn();
            return resolve(null);
          } else {
            return resolve(user.scopes);
          }
        })
        .catch(function (err) {
          console.log(err);
          return reject(err);
        });
    });
  }

  // Get the user roles logged in
  getRole() {
    let self = this;
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function (user) {
          if (user == null) {
            self.signIn();
            return resolve(null);
          } else {
            return resolve(user.profile.role);
          }
        })
        .catch(function (err) {
          console.log(err);
          return reject(err);
        });
    });
  }
}
