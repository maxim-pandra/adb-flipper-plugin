/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

export enum IDE {
  'AS',
  'VSCode',
  'XCode',
}

export async function resolveFullPathsFromMyles(
  _fileName: string,
  _dirRoot?: string,
) {
  throw new Error('Method not implemented.');
}

export function openInIDE(
  _filepath: string,
  _ide: IDE,
  _lineNumber = 0,
  _repo?: string,
) {
  throw new Error('Method not implemented.');
}
