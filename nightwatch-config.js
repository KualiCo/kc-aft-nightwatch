const config = require('config')

const SELENIUM_HOST = 'hub-cloud.browserstack.com'
const SELENIUM_PORT = 80

function buildTestEnv (capabilities = {}) {
  return {
    acceptSslCerts: true,
    desiredCapabilities: Object.assign(
      {
        build: config.get('browserstack.buildId'),
        'browserstack.user': config.get('browserstack.username'),
        'browserstack.key': config.get('browserstack.accessKey'),
        'browserstack.debug': config.get('nightwatch.debug'),
        'browserstack.local': config.get('nightwatch.local'),
        javascriptEnabled: true,
        project: config.get('browserstack.project')
      },
      capabilities
    ),
    end_session_on_fail: false,
    launch_url: 'http://hub.browserstack',
    selenium_host: SELENIUM_HOST,
    selenium_port: SELENIUM_PORT,
    skip_testcases_on_fail: true
  }
}

module.exports = {
  src_folders: ['tests'],
  output_folder: 'reports',

  globals_path: 'globals',
  page_objects_path: 'pages',
  custom_commands_path: 'commands',
  custom_assertions_path: 'assertions',

  selenium: {
    start_process: false,
    host: SELENIUM_HOST,
    port: SELENIUM_PORT
  },

  test_workers: config.get('nightwatch.runInParallel'),

  test_settings: {
    default: buildTestEnv({ browser: 'chrome', platform: 'MAC' }),

    chrome: buildTestEnv({ browser: 'chrome' }),
    edge: buildTestEnv({ browser: 'edge' }),
    firefox: buildTestEnv({ browser: 'firefox' }),
    ie: buildTestEnv({ browser: 'IE' }),
    ipad: buildTestEnv({
      device: 'iPad Air',
      os: 'ios',
      os_version: '8.3',
      browser: 'iPhone',
      deviceOrientation: 'landscape'
    }),
    safari: buildTestEnv({ browser: 'safari', browser_version: '10' })
  }
}
