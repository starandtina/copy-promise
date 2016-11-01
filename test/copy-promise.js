import test from 'ava'
import path from 'path'
import copy from '../src/copy-promise.js'
import fse from 'fs-extra'

test('could copy one file to existed destination dir', t => {
  const fileName = 'copy-promise.js'

  return copy(`../src/${fileName}`, '../')
    .then(() => {
      t.true(fse.existsSync(`../${fileName}`))

      fse.unlinkSync(`../${fileName}`)
    })
})

test('could copy one file to non-existed destination dir', t => {
  return copy('../src/copy-promise.js', './non-existed/dir')
    .then(() => {
      t.true(fse.existsSync('./non-existed/dir'))

      fse.removeSync('./non-existed/')
    })
})
