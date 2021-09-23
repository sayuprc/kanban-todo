var builder = require('electron-builder');

builder.build({
  config: {
    appId: 'Todo',
    directories: {
      output: 'release/win32-x64',
    },
    files: ['build/electron/*', 'package.json'],
    win: {
      target: {
        target: 'nsis',
        arch: ['x64'],
      },
    },
    extraMetadata: {
      main: 'build/electron/main.js',
    },
  },
});
