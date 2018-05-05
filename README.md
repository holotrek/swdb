# Star Wars PE

A directory of Star Wars information in your pocket. Data provided by Star Wars API (https://swapi.co).

Just a practice of Ionic and not intended to be released as a real app.

## Prerequisities

* Node.js with NPM
* Yarn `npm i -g yarn`
* Ionic `npm i -g typescript cordova ionic`

## Install

```
git clone https://github.com/holotrek/StarWarsPE.git
yarn
```

## Run

```
ionic serve
```

## Build and run for device

### Android

#### Prerequisites

* JAVA 1.8+
* Android Studio

#### Build

```
ionic cordova build android
```

#### Run

On attached device:
```
ionic cordova run android --device
```

On emulator:
```
ionic cordova emulate android
```

### iOS

#### Prerequisites

* Apple iOS 9+
* Xcode 7+

#### Build

```
ionic cordova build ios
```

#### Run

* Follow build instructions under iOS Devices [here](https://ionicframework.com/docs/intro/deploying/)
