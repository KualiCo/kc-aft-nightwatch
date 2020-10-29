/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const fs = require('fs');
const { saveToS3, getFromS3 } = require('../support/s3')
const { flattenPdf } = require('../support/pdfService')
const { checkFileExists, deleteFile } = require('../support/file')
const { fromPath } = require('pdf2pic')
const { imagesMatch } = require('../support/image.js')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  const dotenvConfig = require('dotenv').config()

  if (dotenvConfig.error && dotenvConfig.error.code != 'ENOENT') {
    throw dotenvConfig.error;
  }

  const env = { ...config.env, ...dotenvConfig.parsed };
  const newConfig = { ...config, env };

  on('before:browser:launch', (browser, options) => {
    if (browser.family === 'chromium') {
      options.preferences.default.profile = {
        content_settings: {
          exceptions: {
            automatic_downloads: {
              '*': { setting: 1 }
            }
          }
        },
        default_content_settings: { popups: 0 }
      }

      options.preferences.default['download'] =
      {
        default_directory: '/tmp/',
        prompt_for_download: false
      }

      return options;
    }
  });

  on('task', {
    saveToS3({ sourcePath, destinationPath }) {
      return saveToS3(sourcePath, destinationPath)
    },
    getFromS3({ sourcePath, destinationPath }) {
      return getFromS3(sourcePath, destinationPath)
    },
    fileExists(path) {
      return checkFileExists(path)
    },
    deleteFile(path, failOnNotExists = false) {
      return deleteFile(path, failOnNotExists)
    },
    flattenPdf({ sourcePath, destinationPath }) {
      return flattenPdf(sourcePath, destinationPath)
    },
    convertPdfToImages({ sourcePdf, destinationPath, destinationFilenamePrefix }) {
      const baseOptions = {
        width: 2550,
        height: 3300,
        density: 330,
        savePath: destinationPath,
        saveFilename: destinationFilenamePrefix
      };

      return fromPath(sourcePdf, baseOptions).bulk(-1);
    },
    imagesMatch({ image1, image2 }) {
      return imagesMatch(image1, image2)
    }
  })

  return newConfig
}
