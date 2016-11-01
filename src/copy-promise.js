/*
 * copy-promise
 * https://github.com/starandtina/copy-promise
 *
 * Copyright (c) 2016 Khalil Zhang
 * Licensed under the MIT license.
 */
import path from 'path'
import fsp from 'fs-promise'
import fse from 'fs-extra'

export default function copy(src, dest, options) {
  options = options || {}

  return Promise.all([
    fsp.stat(src),
    fsp.exists(dest)
      .then(exists => {
        if (!exists) {
          return false
        }

        return fsp.stat(dest)
      })
    ])
    .then(([srcStat, destStat]) => {
      if (srcStat.isFile() && destStat && destStat.isDirectory()) {
        let filename = path.basename(src)
        dest = path.join(dest, filename)
      }

      return new Promise((resolve, reject) => {
        fse.copy(src, dest, options, err => {
          if (err) {
            reject(err)
          }

          resolve()
        })
      })
    })
}
