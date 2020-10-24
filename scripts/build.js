'use strict';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('../webpack-dist.config');
const path = require('path');

// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const paths = {
  appBuildFolder: resolveApp('dist'),
  appBuildFile: resolveApp('dist/mw-react-button.min.js'),
};

function build() {
  console.log('Creating an optimized production build...');

  const compiler = webpack(config);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages;
      if (err) {
        if (!err.message) {
          return reject(err);
        }
        messages = {
          errors: [err.message],
          warnings: [],
        };
      } else {
        messages = stats.toJson({ all: false, warnings: true, errors: true });
      }

      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }

      return resolve({
        warnings: messages.warnings,
      });
    });
  });
}


// Remove all content but keep the directory so that
// if you're in it, you don't end up in Trash
fs.emptyDirSync(paths.appBuildFolder);
// Start the webpack build
build()
  .then(
    ({ warnings }) => {
      if (warnings.length) {
        console.log('Compiled with warnings.\n');
        console.log(warnings.join('\n\n'));
      } else {
        console.log('Compiled successfully.\n');
      }
      console.log();

      // add
      fs.readFile(paths.appBuildFile, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }

        const result = data.replace(
          /define&&define\.amd/g,
          'define&&define.amd&&!window.dojo&&!window.requirejs',
        );

        fs.writeFile(paths.appBuildFile, result, 'utf8', function (err) {
          if (err) return console.log(err);
        });
      });
      // fs.copySync(paths.appBuildFile, paths.appBuild);
    }
  )
  .catch(err => {
    console.log('Failed to compile.\n');
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
