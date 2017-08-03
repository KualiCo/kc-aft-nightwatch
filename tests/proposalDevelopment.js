const assert = require('assert');

module.exports = {
    '@tags': ['proposalDevelopment', 'smokeTests'],
    '@disabled': false,

    'PD test' : function (client) {
      let detailsPage = client.page.ProposalDevelopmentDetailsPage
      let documentNumber
      let documentStatus
        client
            .url(`${client.globals.baseUrl}/kc-dev/`)
            .waitForElementVisible('body', 1000)
            .assert.title('Kuali ::')
            .assert.visible('input[type=text]')
            .setValue('input[type=text]', 'fchair')
            .waitForElementVisible('button[id=Rice-LoginButton]', 1000)
            .click('button[id=Rice-LoginButton]')
            .pause(1000)
            .useXpath()     // every selector now must be XPath
            .click("//*[contains(text(), 'RESEARCHER')]")
            .click("//*[contains(text(), 'Create Proposal')]")
            .useCss()
            
            //detailsPage
            .click('select[name="document.developmentProposal.proposalTypeCode"] option[value="1"]')
            .pause(1000)
            .execute(`document.querySelector('select[name="document.developmentProposal.ownedByUnitNumber"] option[value="BL-BL"]').selected = true`)
            .execute(`document.querySelector('#uk9itv5_control').value='000340'`)

            .click('select[name="document.developmentProposal.activityTypeCode"] option[value="4"]')

            .setValue('input[name="document.developmentProposal.requestedStartDateInitial"]', '04/01/2017')
            .setValue('input[name="document.developmentProposal.requestedEndDateInitial"]', '04/30/2017')
            .setValue('textArea[name="document.developmentProposal.title"]', 'Test Nightwatch AFT')
            // continue button
            .click('button[id=ufuknm4]')
            .pause(1000)
            .click('#PropDev-Menu > ul > li.active > a')
            // data validation
            .execute(`document.querySelector('#u19btjw4').click()`)
            .pause(5000)
            // turn on validation
            .execute(`document.querySelector('button[id=u3m9tmm]').click()`)
            .pause(3000)
            // supplemental section error link and fill out
            .execute(`document.querySelector('#ubneuwx_line3').click()`)
            .pause(5000)
            .setValue('input[id="AdditionalData_BillingElement_control"]', '23')
            .pause(5000)
            .execute(`document.querySelector('#u1iquhuk_Personnel_Items_for_Review_tab').click()`)
            .pause(5000)
            .setValue('input[id="PersonnelItemsforReview_GraduateStudentCount_control"]', '5')
            // click save
            .click('#uzko2r3')
            .pause(5000)
            // click on data validation
            .execute(`document.querySelector('#u19btjw4').click()`)
            .pause(5000)
            // follow key personnel link
            .execute(`document.querySelector('#ubneuwx_line1').click()`)
            .pause(5000)
            // add person button
            .click('button[id=u18fzd9v]')
            .pause(3000)
            .setValue('input[type="text"][id="uxa59ej_control"]', 'aemcafee')
            //search
            .click('button[id=u9iouos]')
            .pause(5000)
            .click('#uouorvl_line0_control_0')
            // clicking continue after selection
            .click('button[id=u1s266pn]')
            .pause(3000)
            // add person
            .click('button[id=u1bkjgre]')
            .pause(10000)
            // add second person
            .click('button[id=u18fzd9v]')
            .pause(3000)
            .setValue('input[type="text"][id="uxa59ej_control"]', 'cbernal')
            //search
            .click('button[id=u9iouos]')
            .pause(5000)
            //select
            .click('#uouorvl_line0_control_0')
            // clicking continue after selection
            .click('button[id=u1s266pn]')
            .pause(3000)
            // select coi
            .click('#PropDev-PersonnelPage-WizardPage3-personRoleRadio_control_1')
            // add person
            .click('button[id=u1bkjgre]')
            .pause(3000)
            // eraCommons
            .execute(`document.querySelector('#u13t9vqj_line0_toggle_col').click()`)
            .pause(8000)
            .setValue('input[type="text"][name="document.developmentProposal.proposalPersons[0].eraCommonsUserName"]', 'aemcafee')
            //fill certification
            // go to cert tab
            .execute(`document.querySelector('#personnelQuestionnaire_line0_tab').click()`)
            
            .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line0_line0_control_0', 10000)
            .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line0_line0_control_0').click()`)

            .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line1_line0_control_0', 10000)
            .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line1_line0_control_0').click()`)

            .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line2_line0_control_0', 10000)
            .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line2_line0_control_0').click()`)

            .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line3_line0_control_0', 10000)
            .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line3_line0_control_0').click()`)

            .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line4_line0_control_0', 10000)
            .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line4_line0_control_0').click()`)

            .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line5_line0_control_0', 10000)
            .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line5_line0_control_0').click()`)

            .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line6_line0_control_0', 10000)
            .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line6_line0_control_0').click()`)
            
            //save answers
            //.click('button[id="udi4ayd_quickfinder_act"]')
            .pause(3000)
            // close pi details
            .execute(`document.querySelector('#u13t9vqj_line0_toggle_col').click()`)

            // credit allocation            
            .execute(`document.querySelector('#u3s0ek4').click()`)
            .pause(3000)
            //aemcafee credits
            .clearValue('input[name="creditSplitListItems[0].creditSplits[0].credit"]')
            .setValue('input[name="creditSplitListItems[0].creditSplits[0].credit"]', '50.00')

            .clearValue('input[name="creditSplitListItems[0].creditSplits[1].credit"]')
            .setValue('input[name="creditSplitListItems[0].creditSplits[1].credit"]', '50.00')

            .clearValue('input[name="creditSplitListItems[0].creditSplits[2].credit"]')
            .setValue('input[name="creditSplitListItems[0].creditSplits[2].credit"]', '50.00')

            .clearValue('input[name="creditSplitListItems[0].creditSplits[3].credit"]')
            .setValue('input[name="creditSplitListItems[0].creditSplits[3].credit"]', '50.00')

            //000001 - University credits
            .clearValue('input[name="creditSplitListItems[1].creditSplits[0].credit"]')
            .setValue('input[name="creditSplitListItems[1].creditSplits[0].credit"]', '0.00')

            .clearValue('input[name="creditSplitListItems[1].creditSplits[1].credit"]')
            .setValue('input[name="creditSplitListItems[1].creditSplits[1].credit"]', '0.00')

            .clearValue('input[name="creditSplitListItems[1].creditSplits[2].credit"]')
            .setValue('input[name="creditSplitListItems[1].creditSplits[2].credit"]', '0.00')

            .clearValue('input[name="creditSplitListItems[1].creditSplits[3].credit"]')
            .setValue('input[name="creditSplitListItems[1].creditSplits[3].credit"]', '0.00')

            //BL-BL - Princeton CAMPUS credits
            .clearValue('input[name="creditSplitListItems[2].creditSplits[0].credit"]')
            .setValue('input[name="creditSplitListItems[2].creditSplits[0].credit"]', '100.00')

            .clearValue('input[name="creditSplitListItems[2].creditSplits[1].credit"]')
            .setValue('input[name="creditSplitListItems[2].creditSplits[1].credit"]', '100.00')

            .clearValue('input[name="creditSplitListItems[2].creditSplits[2].credit"]')
            .setValue('input[name="creditSplitListItems[2].creditSplits[2].credit"]', '100.00')

            .clearValue('input[name="creditSplitListItems[2].creditSplits[3].credit"]')
            .setValue('input[name="creditSplitListItems[2].creditSplits[3].credit"]', '100.00')


            // CONCETTA BERNAL credit split
            .clearValue('input[name="creditSplitListItems[4].creditSplits[0].credit"]')
            .setValue('input[name="creditSplitListItems[4].creditSplits[0].credit"]', '50.00')

            .clearValue('input[name="creditSplitListItems[4].creditSplits[1].credit"]')
            .setValue('input[name="creditSplitListItems[4].creditSplits[1].credit"]', '50.00')

            .clearValue('input[name="creditSplitListItems[4].creditSplits[2].credit"]')
            .setValue('input[name="creditSplitListItems[4].creditSplits[2].credit"]', '50.00')

            .clearValue('input[name="creditSplitListItems[4].creditSplits[3].credit"]')
            .setValue('input[name="creditSplitListItems[4].creditSplits[3].credit"]', '50.00')
            
            // CONCETTA BERNAL 000001 - University credit split
            .clearValue('input[name="creditSplitListItems[5].creditSplits[0].credit"]')
            .setValue('input[name="creditSplitListItems[5].creditSplits[0].credit"]', '100.00')

            .clearValue('input[name="creditSplitListItems[5].creditSplits[1].credit"]')
            .setValue('input[name="creditSplitListItems[5].creditSplits[1].credit"]', '100.00')

            .clearValue('input[name="creditSplitListItems[5].creditSplits[2].credit"]')
            .setValue('input[name="creditSplitListItems[5].creditSplits[2].credit"]', '100.00')

            .clearValue('input[name="creditSplitListItems[5].creditSplits[3].credit"]')
            .setValue('input[name="creditSplitListItems[5].creditSplits[3].credit"]', '100.00')

            //save
            .click('#uz1wa5n')
            .pause(5000)
            .execute(`document.querySelector('#PropDev-Menu > ul > li:nth-child(1) > a').click()`)
            .pause(1000)
            // s2s page
            .execute(`document.querySelector('#ua6f5f').click()`)
            .pause(5000)
            // add opportunity
            .click('button[id="udi4ayd_quickfinder_act"]')
            .pause(8000)
            .frame('uzdraaz')
            .execute(`document.querySelector('select[id="u19le2rl_control"]').value='1'`)
            .execute(`document.querySelector('#u19le2sg_control').value='PA-C-R01'`)
            //.setValue('input[type="text"][id="#u19le2sg_control"]', 'PA-C-R01')
            .execute(`document.querySelector('#ufuknop').click()`)
            .execute(`document.querySelector('#u1ywkycz_line2').click()`)
            
            // questionnaire
            // click on data validation
            .execute(`document.querySelector('#u19btjw4').click()`)
            .pause(5000)
            // PHS questionnaire
            .execute(`document.querySelector('#ubneuwx_line5').click()`)
            .pause(10000)
            // answer questions
            .execute(`document.querySelector('#u1xg9194_line0_line0_control_1').click()`)
            .pause(5000)

            .execute(`document.querySelector('#u1xg9194_line0_line2_control_1').click()`)
            .pause(5000)

            .execute(`document.querySelector('#u1xg9194_line0_line6_control_1').click()`)
            .pause(5000)
            
            .execute(`document.querySelector('#u1xg9194_line0_line9_control_1').click()`)
            .pause(5000)

            .execute(`document.querySelector('#u1xg9194_line0_line12_control_1').click()`)
            .pause(5000)

            .execute(`document.querySelector('#u1xg9194_line0_line14_control_1').click()`)
            .pause(5000)
            // s2s questionnaire
            .execute(`document.querySelector('#PropDev-QuestionnairePage-GrantsgovS2SQuestionnaire_tab').click()`)

            //fill answers
            .execute(`document.querySelector('#uqjpr13_line0_line41_control_1').click()`)
            .pause(5000)

            .execute(`document.querySelector('#uqjpr13_line0_line42_control_1').click()`)
            .pause(5000)

            .execute(`document.querySelector('#uqjpr13_line0_line46_control_1').click()`)
            .pause(5000)

            .execute(`document.querySelector('#uqjpr13_line0_line48_control_1').click()`)
            .pause(5000)

            .execute(`document.querySelector('#uqjpr13_line0_line51_control_1').click()`)
            .pause(5000)

            .execute(`document.querySelector('#uqjpr13_line0_line54_control_1').click()`)
            .pause(5000)

            .execute(`document.querySelector('select[name="questionnaireHelper.answerHeaders[0].questions[58].answers[0].answer"]').value='Not Covered'
"Not Covered"`)
            .pause(10000)

            //save
            .click('button[id=udhoe1a]')
            .pause(10000)

            // navigate to attachments page
            .execute(`document.querySelector('#u79gej4').click()`)
            //click add
            .waitForElementVisible('#ua9nlo4', 8000)
            .execute(`document.querySelector('#ua9nlo4').click()`)
            .pause(5000)
            .waitForElementVisible('#uk8qcpq_control', 5000)
            .setValue('input[type="file"]', require('path').resolve('/Users/test1/Documents/documents/pdf-sample1.pdf'))
            .pause(3000)
            // close out
            .click('button[id=u1rb81qh]')
            .pause(3000)
            .execute(`document.querySelector('select[id="u8pwnkp_line0_control"]').value='111'`)
            .execute(`document.querySelector('select[id="u8pwnlk_line0_control"]').value='C'`)
            .pause(5000)

            .execute(`document.querySelector('#ua9nlo4').click()`)
            .pause(5000)
            .waitForElementVisible('#uk8qcpq_control', 5000)
            .setValue('input[type="file"]', require('path').resolve('/Users/test1/Documents/documents/pdf-sample1.pdf'))
            .pause(3000)
            //close out
            .click('button[id=u1rb81qh]')
            .pause(3000)
            .execute(`document.querySelector('select[id="u8pwnkp_line0_control"]').value='1'`)
            .execute(`document.querySelector('select[id="u8pwnlk_line0_control"]').value='C'`)
            .pause(5000)

            .execute(`document.querySelector('#ua9nlo4').click()`)
            .pause(5000)
            .waitForElementVisible('#uk8qcpq_control', 5000)
            .setValue('input[type="file"]', require('path').resolve('/Users/test1/Documents/documents/pdf-sample1.pdf'))
            .pause(3000)
            //close out
            .click('button[id=u1rb81qh]')
            .pause(3000)
            .execute(`document.querySelector('select[id="u8pwnkp_line0_control"]').value='5'`)
            .execute(`document.querySelector('select[id="u8pwnlk_line0_control"]').value='C'`)
            .pause(1000)
            .click('button[id=utzb3zj]')
            //summary submit page
            .waitForElementVisible('#u79genf', 10000)
            .execute(`document.querySelector('#u79genf').click()`)
            .waitForElementVisible('#uj31ctp', 10000)
            .execute(`document.querySelector('#uj31ctp').click()`)
            
            //.end();
            // doc number div
            .getText('#u7lh763', function(result) {
                  documentNumber = result.value
            })
            .perform(function(client, done) {
                  client
                  //submit with warnings
                  .waitForElementVisible('#u1gno7ha', 8000)
                  .execute(`document.querySelector('#u1gno7ha').click()`)
                  .pause(3000)
                  // wait for workflow
                  // logout, login as shields and approves
                  .url(`${client.globals.baseUrl}/kc-dev/kc-krad/landingPage?viewId=Kc-LandingPage-DefaultView&methodToCall=logout`)
                  // wait for workflow
                  .pause(15000)
                  .url(`${client.globals.baseUrl}/kc-dev/kew/DocHandler.do?command=displayDocSearchView&docId=${documentNumber}`)
                  .waitForElementVisible('body', 1000)
                  .assert.title('Kuali ::')
                  .assert.visible('input[type=text]')
                  .setValue('input[type=text]', 'shields')
                  .waitForElementVisible('button[id=Rice-LoginButton]', 1000)
                  .click('button[id=Rice-LoginButton]')
                  .waitForElementVisible('button[id=uj31cvf]', 10000)
                  .click('button[id=uj31cvf]')
                  .pause(1000)

                  // logout, login as aemcafee and approves
                  .url(`${client.globals.baseUrl}/kc-dev/kc-krad/landingPage?viewId=Kc-LandingPage-DefaultView&methodToCall=logout`)
                  .pause(15000)
                  .url(`${client.globals.baseUrl}/kc-dev/kew/DocHandler.do?command=displayDocSearchView&docId=${documentNumber}`)
                  .waitForElementVisible('body', 1000)
                  .assert.title('Kuali ::')
                  .assert.visible('input[type=text]')
                  .setValue('input[type=text]', 'aemcafee')
                  .waitForElementVisible('button[id=Rice-LoginButton]', 1000)
                  .click('button[id=Rice-LoginButton]')
                  .waitForElementVisible('button[id=uj31cvf]', 10000)
                  //approve
                  .click('button[id=uj31cvf]')
                  .pause(1000)

                  //approve as cbernal
                  .url(`${client.globals.baseUrl}/kc-dev/kc-krad/landingPage?viewId=Kc-LandingPage-DefaultView&methodToCall=logout`)
                  .pause(15000)
                  .url(`${client.globals.baseUrl}/kc-dev/kew/DocHandler.do?command=displayDocSearchView&docId=${documentNumber}`)
                  .waitForElementVisible('body', 1000)
                  .assert.title('Kuali ::')
                  .assert.visible('input[type=text]')
                  .setValue('input[type=text]', 'cbernal')
                  .waitForElementVisible('button[id=Rice-LoginButton]', 1000)
                  .click('button[id=Rice-LoginButton]')
                  .waitForElementVisible('button[id=uj31cvf]', 10000)

                  //navigate to cert pages
                  .execute(`document.querySelector('#PropDev-Menu > ul > li:nth-child(2) > a').click()`)
                  .pause(1000)
                  .execute(`document.querySelector('#u3s0ej9').click()`)
                  .pause(5000)

                  // cbernal certification
                  .waitForElementVisible('#u13t9vqj_line1_toggle_col', 1000)
                  .execute(`document.querySelector('#u13t9vqj_line1_toggle_col').click()`)

                  //.waitForElementVisible('#personnelQuestionnaire_line1_tab', 8000)
                  .pause(10000)
                  .execute(`document.querySelector('#personnelQuestionnaire_line1_tab').click()`)
            
                  .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line0_line1_control_0', 10000)
                  .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line0_line1_control_0').click()`)

                  .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line1_line1_control_0', 10000)
                  .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line1_line1_control_0').click()`)

                  .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line2_line1_control_0', 10000)
                  .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line2_line1_control_0').click()`)

                  .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line3_line1_control_0', 10000)
                  .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line3_line1_control_0').click()`)

                  .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line4_line1_control_0', 10000)
                  .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line4_line1_control_0').click()`)

                  .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line5_line1_control_0', 10000)
                  .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line5_line1_control_0').click()`)

                  .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line6_line1_control_0', 10000)
                  .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line6_line1_control_0').click()`)
                  .pause(1000)
                  // save
                  .execute(`document.querySelector('#u8f37v6').click()`)
                  .pause(8000)
                  //back to submit page
                  .execute(`document.querySelector('#u79genf').click()`)
                  .pause(10000)
                  //approve
                  .click('button[id=uj31cvf]')
                  .pause(1000)

                  // quickstart approves
                  .url(`${client.globals.baseUrl}/kc-dev/kc-krad/landingPage?viewId=Kc-LandingPage-DefaultView&methodToCall=logout`)
                  .pause(15000)
                  .url(`${client.globals.baseUrl}/kc-dev/kew/DocHandler.do?command=displayDocSearchView&docId=${documentNumber}`)
                  .waitForElementVisible('body', 1000)
                  .assert.title('Kuali ::')
                  .assert.visible('input[type=text]')
                  .setValue('input[type=text]', 'quickstart')
                  .waitForElementVisible('button[id=Rice-LoginButton]', 1000)
                  .click('button[id=Rice-LoginButton]')
                  .waitForElementVisible('button[id=uj31cvf]', 10000)
                  //approve
                  .click('button[id=uj31cvf]')
                  .pause(1000)

                  // quickstart approves
                  .url(`${client.globals.baseUrl}/kc-dev/kc-krad/landingPage?viewId=Kc-LandingPage-DefaultView&methodToCall=logout`)
                  .pause(15000)
                  .url(`${client.globals.baseUrl}/kc-dev/kew/DocHandler.do?command=displayDocSearchView&docId=${documentNumber}`)
                  .waitForElementVisible('body', 1000)
                  .assert.title('Kuali ::')
                  .assert.visible('input[type=text]')
                  .setValue('input[type=text]', 'quickstart')
                  .waitForElementVisible('button[id=Rice-LoginButton]', 1000)
                  .click('button[id=Rice-LoginButton]')
                  .waitForElementVisible('button[id=uj31cvf]', 10000)
                  //approve
                  .click('button[id=uj31cvf]')

                  //logout
                  .url(`${client.globals.baseUrl}/kc-dev/kc-krad/landingPage?viewId=Kc-LandingPage-DefaultView&methodToCall=logout`)
                  .pause(15000)
                  .url(`${client.globals.baseUrl}/kc-dev/kew/DocHandler.do?command=displayDocSearchView&docId=${documentNumber}`)
                  //login as quickstart to check status
                  .waitForElementVisible('body', 1000)
                  .assert.title('Kuali ::')
                  .assert.visible('input[type=text]')
                  .setValue('input[type=text]', 'quickstart')
                  .waitForElementVisible('button[id=Rice-LoginButton]', 1000)
                  .click('button[id=Rice-LoginButton]')
                  .waitForElementVisible('#u1wvlcrs', 5000)
                  .getText('#u1wvlcrs', function(result) {
                        documentStatus = result.value
                  })
                  .perform(function(client, done) {
                        console.log('status is ' + JSON.stringify(documentStatus))
                        assert(documentStatus === "Approved and Submitted")
                  })
            })
      }
};
