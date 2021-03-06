/* Copyright © 2005-2017 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

exports.command = function (done) {
  const browser = this

  browser.deleteCookies()

  if (typeof done === 'function') done.call(this)

  return this
}
