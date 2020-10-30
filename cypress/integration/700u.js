import { v4 as uuid } from 'uuid'

const SEVEN_HUNDRED_U_PDF = '/tmp/700u.pdf'
const SEVEN_HUNDRED_U_IMAGES_OUTPUT_PATH = '/tmp/'
const SEVEN_HUNDRED_U_PREFIX = '700u'
const SEVEN_HUNDRED_U_BASELINE = '/tmp/700u_baseline.pdf'
const SEVEN_HUNDRED_U_BASELINE_S3 = 'test/700u/baseline.pdf'
const SEVEN_HUNDRED_U_BASELINE_PREFIX = 'Baseline-700u'

const getImagePath = (prefix, index) =>
  `${SEVEN_HUNDRED_U_IMAGES_OUTPUT_PATH}${prefix}.${index}.png`

context('700U', () => {
  beforeEach(() => {
    cy.task('deleteFile', SEVEN_HUNDRED_U_PDF)
    cy.task('deleteFile', SEVEN_HUNDRED_U_BASELINE)
    cy.task('deleteFile', getImagePath(SEVEN_HUNDRED_U_PREFIX, 1))
    cy.task('deleteFile', getImagePath(SEVEN_HUNDRED_U_BASELINE_PREFIX, 1))

    cy.visit('/coi')
    cy.login('cate', 'password')
  })

  it('can update disclosure and get 700U', () => {
    cy.get('button:contains("Update Disclosure")').click()

    cy.get('#HJwkHoIuN').type('{selectall}{backspace}1500 Kuali Ave.')
    cy.get('#SJngBsLdE').type('{selectall}{backspace}Google, Inc.')
    cy.get('#SJufSjU_4').type('{selectall}{backspace}45,000.00')
    
    cy.get('[value="SkSSSoLON"]').parent().contains('Estimated').dblclick()
    cy.get('[value="By18x2_3E"]').parent().contains('Interim (for renewed funding)').click()

    cy.get('[value="rJhtvo8dN"]').parent().contains('Yes').click()
    cy.get('#Bkd2BZbFV').type('{selectall}{backspace}Provost')

    cy.get('[value="SkXRXKi8u4"]').parent().contains('No').click()
    cy.get('[value="SJDEK5sIu4"]').parent().contains('No').click()
    cy.get('[value="BkidHio8_E"]').parent().contains('No').click()
    cy.get('[value="Hkm4VaoUuV"]').parent().contains('No').click()
    cy.get('[value="r1jJkCjUuN"]').parent().contains('No').click()

    cy.get('button[data-test="next_disclosure_page"]').click()

    cy.get('button:contains("Download unsigned form"):first').click()

    const s3Id = uuid()
    cy.fileExists(SEVEN_HUNDRED_U_PDF)

    cy.getFromS3(SEVEN_HUNDRED_U_BASELINE_S3, SEVEN_HUNDRED_U_BASELINE).then(hasBaseline => {
      if (hasBaseline) {
        cy.convertPdfToImages(SEVEN_HUNDRED_U_PDF, SEVEN_HUNDRED_U_IMAGES_OUTPUT_PATH, SEVEN_HUNDRED_U_PREFIX)
        cy.convertPdfToImages(SEVEN_HUNDRED_U_BASELINE, SEVEN_HUNDRED_U_IMAGES_OUTPUT_PATH, SEVEN_HUNDRED_U_BASELINE_PREFIX)

        cy.imagesMatch(getImagePath(SEVEN_HUNDRED_U_BASELINE_PREFIX, 1), getImagePath(SEVEN_HUNDRED_U_PREFIX, 1)).then(percentDiff => {
          assert.equal(percentDiff, 0, `Page 1 difference ${percentDiff}, Screenshot: ${SEVEN_HUNDRED_U_PREFIX}.1.png`)
        })
      } else {
        cy.saveToS3(SEVEN_HUNDRED_U_PDF, SEVEN_HUNDRED_U_BASELINE_S3)
      }
    })
  })
})