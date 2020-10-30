import { v4 as uuid } from 'uuid'

const FDP_BASELINE = '/tmp/baseline.pdf'
const FDP_BASELINE_S3 = 'test/fdp/baseline.pdf'
const FDP_PDF = '/tmp/FDP_CR_2019v2_-_FINAL.pdf'
const FDP_PDF_FLATTENED = '/tmp/FDP_CR_2019v2_-_FINAL_flattened.pdf'
const FDP_IMAGES_OUTPUT_PATH = '/tmp/'
const FDP_PREFIX = 'FDPv2'
const FDP_BASELINE_PREFIX = 'Baseline-FDPv2'

const getImagePath = (prefix, index) =>
  `${FDP_IMAGES_OUTPUT_PATH}${prefix}.${index}.png`

context('Subaward FDP', () => {
  beforeEach(() => {
    cy.task('deleteFile', FDP_PDF)
    cy.task('deleteFile', FDP_PDF_FLATTENED)
    cy.task('deleteFile', FDP_BASELINE)

    for (let i = 1; i <= 10; i++) {
      cy.task('deleteFile', getImagePath(FDP_PREFIX, i))
      cy.task('deleteFile', getImagePath(FDP_BASELINE_PREFIX, i))
    }

    cy.visit('/res')
    cy.login('quickstart', 'password')
  })

  it('can create a new subaward', () => {
    // Create a subaward
    cy.get('a.dropdown-toggle:contains("UNIT")').click()

    cy.get('.dropdown-menu p:contains("Subaward"):visible').parent().children('a.icon-plus').click()

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('input[name="document.documentHeader.documentDescription"]').type('Subaward FDP AFT')
      cy.get('input[name="document.subAwardList[0].startDate"]').type('10/01/2020')
      cy.get('input[name="document.subAwardList[0].endDate"]').type('09/30/2022')
      cy.get('select[name="document.subAwardList[0].subAwardTypeCode"]').select('1')
      cy.get('select[name="document.subAwardList[0].statusCode"]').select('1')
      cy.get('input[name="document.subAwardList[0].requisitionerUserName"]').type('cate')
      cy.get('input[name="document.subAwardList[0].siteInvestigatorId"]').type('186')
      cy.get('input[name="document.subAwardList[0].organizationId"]').type('000002')
      cy.get('input[name="document.subAwardList[0].fsrsSubawardNumber"]').type('11223344')
      cy.get('#tab-FundingSource-div .addline input[title^="Search"]').click()
      cy.awaitProcessing()
    })

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('#awardNumber').type('012517-00001')
      cy.get('#awardSequenceStatusBoth').check()
      cy.get('input[title^="search"]').click()
      cy.awaitProcessing()
    })

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('a[title^="return value"]').click()
    })

    cy.wait(1000)

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('#tab-FundingSource-div input.addButton').click()
      cy.awaitProcessing()
    })

    cy.addSubAwardContact('186', '22')
    cy.addSubAwardContact('235', '37')
    cy.addSubAwardContact('242', '38')
    cy.addSubAwardContact('254', '34')
    cy.addSubAwardContact('257', '35')
    cy.addSubAwardContact('258', '36')

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('#globalbuttons input[title="save"]').should('exist')
      cy.get('input[value="Financial"]').click()
      cy.awaitProcessing()
    })

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('input[name="methodToCall.addAmountReleased"]').should('exist')
      cy.get('select[name="newSubAwardAmountInfo.modificationTypeCode"]').select('RESBOOT1001')
      cy.get('input[name="newSubAwardAmountInfo.effectiveDate"]').type('10/01/2020')
      cy.get('input[name="newSubAwardAmountInfo.obligatedChange"]').type('50000')
      cy.get('input[name="newSubAwardAmountInfo.anticipatedChange"]').type('50000')
      cy.get('input[name="newSubAwardAmountInfo.periodofPerformanceStartDate"]').type('10/01/2020')
      cy.get('input[name="newSubAwardAmountInfo.periodofPerformanceEndDate"]').type('09/30/2021')
      cy.get('input[name="methodToCall.addAmountInfo.anchorHistoryofChanges"]').click()
      cy.awaitProcessing()
    })
    //financial -> add modification or increment

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('#globalbuttons input[title="save"]').should('exist')
      cy.get('input[value="Template Information"]').click()
      cy.awaitProcessing()
    })

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('input[name="document.subAwardList[0].subAwardTemplateInfo[0].rAndD"]').check('true')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].finalStatementDueCd"]').select('PPED')
      cy.get('input[name="document.subAwardList[0].subAwardTemplateInfo[0].includesCostSharing"]').check('false')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].invoiceOrPaymentContact"]').select('34')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].finalStmtOfCostscontact"]').select('36')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].changeRequestsContact"]').select('35')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].terminationContact"]').select('-99')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].subChangeRequestsContact"]').select('31')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].subTerminationContact"]').select('33')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].noCostExtensionContact"]').select('34')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].carryForwardRequestsSentTo"]').select('36')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].irbIacucContact"]').select('35')
      cy.get('input[name="document.subAwardList[0].subAwardTemplateInfo[0].invoicesEmailed"]').check('true')
      cy.get('input[name="document.subAwardList[0].subAwardTemplateInfo[0].invoiceEmailDifferent"]').check('false')
      cy.get('input[name="document.subAwardList[0].subAwardTemplateInfo[0].applicableProgramRegulations"]').type('Program regulations text')
      cy.get('input[name="document.subAwardList[0].subAwardTemplateInfo[0].applicableProgramRegsDate"]').type('10/26/2020')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].copyRightType"]').select('1')
      cy.get('input[name="document.subAwardList[0].subAwardTemplateInfo[0].mpiAward"]').check('true')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].mpiLeadershipPlan"]').select('0')
      cy.get('textarea[name="document.subAwardList[0].subAwardTemplateInfo[0].additionalTerms"]').type('Additional terms text')

      cy.get('input[value="Subaward Actions"]').click()
      cy.awaitProcessing()
    })

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('#tab-Print-imageToggle').click()
      cy.contains('Cost Reimbursement')
      cy.get('select[name="subAwardPrintAgreement.selectedForms"]').select('RESBOOT19')
      cy.get('input[name="methodToCall.printTemplates"]').click()
    })

    const s3Id = uuid()
    cy.fileExists(FDP_PDF)
    cy.saveToS3(FDP_PDF, `test/fdp/${s3Id}`)
    cy.flattenPdf(`https://res-pdf-dev.s3-us-west-2.amazonaws.com/test/fdp/${s3Id}`, FDP_PDF_FLATTENED)
    cy.fileExists(FDP_PDF_FLATTENED)
    cy.deleteFromS3(`test/fdp/${s3Id}`)

    cy.getFromS3(FDP_BASELINE_S3, FDP_BASELINE).then(hasBaseline => {
      if (hasBaseline) {
        cy.convertPdfToImages(FDP_PDF_FLATTENED, FDP_IMAGES_OUTPUT_PATH, FDP_PREFIX)
        cy.convertPdfToImages(FDP_BASELINE, FDP_IMAGES_OUTPUT_PATH, FDP_BASELINE_PREFIX)

        for (let i = 1; i <= 10; i++) {
          cy.imagesMatch(getImagePath(FDP_BASELINE_PREFIX, i), getImagePath(FDP_PREFIX, i)).then(percentDiff => {
            assert.equal(percentDiff, 0, `Page ${i} difference ${percentDiff}, Screenshot: ${FDP_PREFIX}.${i}.png`)
          })
        }
      } else {
        cy.saveToS3(FDP_PDF_FLATTENED, FDP_BASELINE_S3)
      }
    })
  })
})