/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import path from 'path';
import {homedir} from 'os';
import fs from 'fs-extra';
import expandTilde from 'expand-tilde';

export const flipperDataDir = path.join(homedir(), '.flipper');

export const pluginInstallationDir = path.join(flipperDataDir, 'thirdparty');

export const pluginPendingInstallationDir = path.join(
  flipperDataDir,
  'pending',
);

export const pluginCacheDir = path.join(flipperDataDir, 'plugins');

export async function getPluginSourceFolders(): Promise<string[]> {
  const pluginFolders: string[] = [];
  if (process.env.FLIPPER_NO_EMBEDDED_PLUGINS === 'true') {
    console.log(
      '🥫  Skipping embedded plugins because "--no-embedded-plugins" flag provided',
    );
    return pluginFolders;
  }
  const flipperConfigPath = path.join(homedir(), '.flipper', 'config.json');
  if (await fs.pathExists(flipperConfigPath)) {
    const config = await fs.readJson(flipperConfigPath);
    if (config.pluginPaths) {
      pluginFolders.push(...config.pluginPaths);
    }
  }
  pluginFolders.push(path.resolve(__dirname, '..', '..', 'plugins'));
  pluginFolders.push(path.resolve(__dirname, '..', '..', 'plugins', 'fb'));
  return pluginFolders.map(expandTilde).filter(fs.existsSync);
}
