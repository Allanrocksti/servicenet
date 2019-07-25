// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCytLwz4JJovxQ-0wCFeD77SlVTjPEGQsQ',
    authDomain: 'servicenet-5a60b.firebaseapp.com',
    databaseURL: 'https://servicenet-5a60b.firebaseio.com',
    projectId: 'servicenet-5a60b',
    storageBucket: '',
    messagingSenderId: '74672213461',
    appId: '1:74672213461:web:868c64fdcde438a1'
  },
  backendSocket: 'https://servicenet-challenge.herokuapp.com',
  googleMapsApiKey: 'AIzaSyDujFPLBVGBHBRMPyv3qiSb_HRR-9Lg_iw'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
