/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

const {fbContent, fbInternalOnly} = require('internaldocs-fb-helpers');

module.exports = {
  features: {
    Features: [
      'features/index',
      'features/logs-plugin',
      'features/layout-plugin',
      'features/navigation-plugin',
      'features/network-plugin',
      'features/databases-plugin',
      'features/images-plugin',
      'features/sandbox-plugin',
      'features/shared-preferences-plugin',
      'features/leak-canary-plugin',
      'features/crash-reporter-plugin',
      'features/share-flipper-data',
      'features/react-native',
    ],
  },
  setup: {
    'Getting Started': [
      ...fbInternalOnly(['getting-started/fb/using-flipper-at-facebook']),
      'getting-started/index',
      'getting-started/android-native',
      'getting-started/ios-native',
      'getting-started/react-native',
      'getting-started/react-native-android',
      'getting-started/react-native-ios',
      'troubleshooting',
    ],
    'Plugin Setup': [
      'setup/layout-plugin',
      'setup/navigation-plugin',
      'setup/network-plugin',
      'setup/databases-plugin',
      'setup/images-plugin',
      'setup/sandbox-plugin',
      'setup/shared-preferences-plugin',
      'setup/leak-canary-plugin',
      'setup/crash-reporter-plugin',
    ],
    Advanced: ['custom-ports', 'stetho'],
  },
  extending: {
    'Extending Flipper': ['extending/index'],
    Tutorial: [
      'tutorial/intro',
      'tutorial/ios',
      'tutorial/android',
      'tutorial/react-native',
      'tutorial/js-setup',
      'tutorial/js-table',
      'tutorial/js-custom',
      'tutorial/js-publishing',
    ],
    // start-internal-sidebars-example
    'Plugin Development': [
      'extending/js-setup',
      'extending/js-plugin-api',
      'extending/create-table-plugin',
      'extending/ui-components',
      'extending/styling-components',
      'extending/search-and-filter',
      'extending/create-plugin',
      'extending/client-plugin-lifecycle',
      'extending/send-data',
      'extending/error-handling',
      'extending/testing',
      'extending/debugging',
      ...fbInternalOnly([
        'extending/fb/desktop-plugin-releases',
        // TODO: Remove once sandy is public T69061061
        'extending/fb/sandy/sandy-plugins',
        'extending/fb/sandy/flipper-plugin',
      ]),
    ],
    // end-internal-sidebars-example
    'Other Platforms': [
      'extending/new-clients',
      'extending/establishing-a-connection',
      'extending/supporting-layout',
    ],
    Internals: [
      'extending/arch',
      'extending/layout-inspector',
      'extending/testing-rn',
      ...fbInternalOnly(['extending/fb/launcher']),
    ],
  },
  'fb-internal': {
    'FB Internal': fbInternalOnly([
      'fb/troubleshooting',
      'fb/Add-flipper-to-android-app',
      'fb/Adding-flipper-to-ios-app',
      'fb/LauncherConfig',
      'fb/Flipper-fbsource-Pinning',
      'fb/Flipper-Release-Cycle',
      'fb/Flipper-Strict-TypeScript',
      'fb/Help-Updating-Flipper',
      {
        'Internal Plugins': [
          'fb/plugins',
          {
            Layout: [
              'fb/layout-extending-android-layout-inspector',
              'fb/layout-extending-ios-layout-inspector',
            ],
          },
          'fb/Memory-Tools',
          'fb/Navigation-Plugin',
          'fb/supporting-feed-inspector',
          'fb/sections',
          'fb/Trace',
          'fb/mobile-config',
        ],
      },
      {
        'Plugin Development': [
          'fb/create-new-plugin',
          'fb/developmentworkflow',
          'fb/TypeScript',
          'fb/using-gatekeepers',
          'fb/adding-npm-dependencies-0',
          'fb/adding-analytics-0',
          {
            Android: [
              'fb/android-plugin-development-Android-interacting-0',
              'fb/android-plugin-development-testing-android-plugins-0',
            ],
          },
          {
            iOS: [
              'fb/ios-plugin-development-sending-data-to-an-ios-plugin-0',
              'fb/ios-plugin-development-testing-ios-plugins-0',
            ],
          },
          'fb/Add-Support-Group-to-Flipper-Support-Form',
        ],
      },
      {
        Lints: ['fb/building-a-linter', 'fb/active-linters'],
      },
      'fb/index',
    ]),
  },
};
