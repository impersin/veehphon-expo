import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Modal
} from 'react-native';
import { Constants } from 'expo';
import { AntDesign } from '@expo/vector-icons/';

export default class LoginModal extends React.Component {
  render() {
    return (
      <View style={styles.modalContainer}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={true}
          onRequestClose={() => {
            this.props.openModal('signup');
          }}
        >
          <View style={{ paddingTop: Constants.statusBarHeight }} />
          <View style={Platform.OS === 'ios' ? styles.topMenuModalIos : styles.topMenuModalAndroid}>
            <TouchableOpacity
              onPress={e => this.props.openModal('signup')}
              style={[
                styles.topMenuOne,
                {
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start'
                }
              ]}
            >
              <AntDesign name="left" color={'#444'} size={30} />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ padding: 20, paddingTop: 50 }}>
            <Text style={{ color: '#444' }}>{`Terms of Use January 5th, 2018\n`}</Text>
            <Text style={{ color: '#444' }}>
              This Terms of Use Agreement ("Terms"), govern your access to, use of, and
              participation in the Platform made available by VEEH Corporation ("VEEH," "we," "our,"
              or "us") or through VEEH and the entirety of your relationship with VEEH. PLEASE READ
              THE TERMS THOROUGHLY AND CAREFULLY. BY USING THE PLATFORM, YOU AGREE TO BE BOUND BY
              THESE TERMS. AS DETAILED IN THE ELIGIBILITY, SERVICE MEMBER REPRESENTATIONS,
              WARRANTIES, AND USE OF THE PLATFORM SECTION BELOW, IF YOU ARE A SERVICE MEMBER, YOU
              UNDERSTAND AND AGREE THAT VEEH MAY USE YOUR INFORMATION TO OBTAIN BACKGROUND CHECKS
              FROM ITS VENDORS. IF YOU DO NOT AGREE TO THESE TERMS, THEN YOU MAY NOT ACCESS OR USE
              THE PLATFORM. All references to "you" or "your," as applicable, mean the person who
              accesses, uses, and/or participates in the Platform in any manner, and each of your
              heirs, assigns, and successors. If you use the Platform on behalf of an entity, you
              represent and warrant that you have the authority to bind that entity, your acceptance
              of the Terms will be deemed an acceptance by that entity, and "you" and "your" herein
              shall refer to that entity. MODIFICATIONS VEEH reserves the right, in its sole
              discretion, to modify these Terms, and any other documents incorporated by reference
              herein, at any time and without prior notice. VEEH will notify you of changes by
              posting on the VEEH Terms of Use website, sending you a message, or otherwise
              notifying you when you are logged into your account. Amendments will become effective
              thirty (30) days after they are posted on the Platform or a message is sent to you, or
              you are otherwise notified when you are logged into your account. Your use of the
              Platform after the expiration of the thirty (30) days shall constitute your consent to
              the changes. If you do not agree, you may not access or use the Platform. ADDITIONAL
              TERMS AND POLICIES Please review VEEH, incorporated herein by reference, for
              information and notices concerning VEEH's collection and use of your information. The
              provision and delivery of text messages by VEEH or our text message service providers
              is governed by our SMS Terms and Conditions, which are expressly incorporated herein.
            </Text>
            <Text>
              The VEEH Guarantee is governed by the VEEH Guarantee Terms and Conditions, which are
              expressly incorporated herein. Please review the full set of key VEEH policies that
              govern your use of the Platform and our interactions with you and third parties.
              Certain areas of and/or products on the Platform may have different terms and
              conditions posted or may require you to agree with and accept additional terms and
              conditions or policies. If there is a conflict between these Terms and the terms and
              conditions or policies posted for a specific area or product, the latter take
              precedence with respect to your use of that area or product. KEY TERMS "Collective
              Content" means User Content and VEEH Content together. "Content" means text, graphics,
              images, music, software, audio, video, information or other materials, including but
              not limited to profile information, SERVICES requests, quotes, message threads,
              reviews, scheduling and calendar information, and other information or materials
              available on or through the Platform. "Customer Member" means a Member who is
              registered to receive services, requests quotes for services, or otherwise uses the
              Platform to receive, pay for, review, or facilitate the receipt of services.
              "Publisher Member" means a person who completes VEEH's account registration process or
              a person who submits or receives a service request through VEEH, including but not
              limited Customer Members. "Platform" means all VEEH websites, mobile or other
              applications, software, processes and any other services provided by or through VEEH.
              "Services" means the services listed, quoted, scheduled, offered or provided by
              Publisher Members, or sought, scheduled or received by Customer Members, through the
              Platform. "Publisher Member" means a Member who is registered to send quotes for
              services, or otherwise uses the Platform to offer, provide, receive payment for, or
              facilitate the provision of services. "VEEH Content" means all Content VEEH makes
              available on or through the Platform, including any Content licensed from a third
              party, but excluding User Content. "User Content" means all Content submitted, posted,
              uploaded, published, or transmitted on or through the Platform by any Member or other
              user of the Platform, including but not limited to photographs, profile information,
              descriptions, postings, reviews, and payments made through the Platform, but excluding
              VEEH Content and Feedback. ELIGIBILITY, SERVICE MEMBER REPRESENTATIONS, WARRANTIES,
              AND USE OF THE PLATFORM Access to and use of the Platform is available only to
              individuals who are at least 18 years old and can form legally binding contracts under
              applicable law. By accessing or using the Platform, you represent and warrant that you
              are eligible. By registering or using the Platform to offer, post or provide services,
              Publisher Members represent and warrant that they are properly and fully qualified and
              experienced in the jurisdiction(s) in which they offer their services and in relation
              to the specific job they are performing. VEEH is not in the business of providing
              services. Publisher Members understand and agree that by creating and maintaining an
              account on the Platform, they receive only the ability to use the VEEH Platform to
              access persons interested in receiving services and related tools, including but not
              limited to the ability to message Customer Members or schedule appointments, that
              facilitate the provision of services. Publisher Members understand and agree that
              using the Platform does not guarantee that any VEEH users will engage them for
              services. Publisher Members understand and agree that they are customers of VEEH, and
              are not VEEH employees, joint venturers, partners, or agents. Publisher Members
              acknowledge that they set or confirm their own prices, provide their own job
              performance and determine their own work schedule. VEEH, as permitted by applicable
              laws, obtains reports based on publicly available information regarding Publisher
              Members, which may include history of criminal convictions or sex offender
              registration, and we may limit, block, suspend, deactivate, or cancel an Publisher
              Member’s account based on the results of such a check. As an Publisher Member, you
              agree and authorize us to use your personal information, such as your full name and
              date of birth, to obtain such reports from VEEH’s vendors. ACCOUNT REGISTRATION AND
              OTHER SUBMISSIONS Users may access the Platform without registering for an account.
            </Text>
            <Text>
              To access and participate in certain features of the Platform, you will need to create
              a password-protected account ("Account"). You may register for an Account using your
              existing Facebook account and log-in credentials (your "Third-Party Site Password").
              You agree to provide accurate, current, and complete information during the
              registration or request submission process and at all other times when you use the
              Platform, and to update information to keep it accurate, current, and complete. You
              are solely responsible for safeguarding your VEEH password and, if applicable, your
              Third-Party Site Password. You are solely responsible for all activity that occurs on
              your Account, and you will notify VEEH immediately of any unauthorized use. VEEH is
              not liable for any losses by any party caused by an unauthorized use of your Account.
              Notwithstanding the foregoing, you may be liable for the losses of VEEH or others due
              to such unauthorized use. YOUR LICENSE TO USE THE PLATFORM Subject to your compliance
              with these Terms, VEEH grants you a limited, non-exclusive, revocable,
              nontransferable, and non-sublicensable license to reproduce and display Collective
              Content (excluding any software source code) solely for your personal and
              non-commercial use and only in connection with your access to and participation in the
              Platform. You will not use, copy, adapt, modify, prepare derivative works based upon,
              distribute, license, sell, transfer, publicly display, publicly perform, transmit,
              stream, broadcast or otherwise exploit the Platform or Collective Content, except as
              expressly permitted in these Terms. The Platform and Collective Content are provided
              to you AS IS. If you download or print a copy of Collective Content for personal use,
              you must retain all copyright and other proprietary notices contained thereon. No
              licenses or rights are granted to you by implication or otherwise under any
              intellectual property rights owned or controlled by VEEH or its licensors, except for
              the licenses and rights expressly granted in these Terms. USER CONTENT We may, in our
              sole discretion, permit you to post, upload, publish, submit or transmit User Content.
              By making available any User Content on or through the Platform, you hereby grant to
              VEEH a worldwide, irrevocable, perpetual, non-exclusive, transferable, royalty-free
              license, with the right to sublicense, to use, copy, adapt, modify, distribute,
              license, sell, transfer, publicly display, publicly perform, transmit, stream,
              broadcast, access, view, and otherwise exploit such User Content on, through, by means
              of or to promote, market or advertise the Platform or services, or for any other
              purpose in our sole discretion, except that private messaging through the Platform
              will not be used by VEEH in public advertising. In the interest of clarity, the
              license granted to VEEH shall survive termination of the Platform or your Account.
              VEEH does not claim ownership rights in your User Content and nothing in these Terms
              will be deemed to restrict rights that you may have to use and exploit any such User
              Content submitted, posted, uploaded, published, or transmitted on or through the
              Platform by you. You acknowledge and agree that you are solely responsible for all
              User Content that you make available on or through the Platform. Accordingly, you
              represent and warrant that: (a) you either are the sole and exclusive owner of all
              User Content that you make available on or through the Platform or you have all
              rights, licenses, consents and releases that are necessary to grant to VEEH the rights
              in such User Content, as contemplated under these Terms; and (b) neither the User
              Content nor your posting, uploading, publication, submission or transmittal of the
              User Content or VEEH's use of your User Content (or any portion thereof) on, through
              or by means of the Platform will infringe, misappropriate or violate a third party's
              patent, copyright, trademark, trade secret, moral rights or other proprietary or
              intellectual property rights, or rights of publicity or privacy, or result in the
              violation of any applicable law or regulation. You agree that VEEH may proofread,
              summarize or otherwise edit and/or withdraw your User Content,and you understand it
              remains your sole responsibility to monitor your User Content and ensure that such
              edited Content is accurate and consistent with your representations and warranties in
              these Terms.
            </Text>
            <Text>
              VEEH reserves the right, at any time and without prior notice, to remove or disable
              access to User Content that we, in our sole discretion, consider to be objectionable
              for any reason, in violation of these Terms or otherwise harmful to the Platform or
              users, or for any other reason. PROHIBITIONS As a user of the Platform, you may not: •
              Use another person's Account, misrepresent yourself or services offered through the
              Platform, misrepresent your identity or qualifications, misrepresent a project or
              other information in a quote request, or post Content in any inappropriate category or
              areas on the Platform; • Use any automated system including but not limited to robots,
              spiders, offline readers, scrapers to access the Platform for any purpose without
              VEEH's prior written approval;provided, however, that the operators of public search
              engines may use spiders or robots to copy materials from the Platform for the sole
              purpose of creating publicly available searchable indices of the materials, but not
              caches or archives of such material (VEEH reserves the right to revoke these
              exceptions either generally or in specific cases); • In any manual or automated manner
              copy copyrighted text, or otherwise misuse or misappropriate Platform information or
              Content including but not limited to, use on a mirrored, competitive, or third-party
              site; • Transmit more request messages through the Platform in a given period of time
              than a human can reasonably produce in the same period by using a conventional online
              web browser; • Take any action that (a) may unreasonably encumber the Platform's
              infrastructure; (b) interferes or attempts to interfere with the proper working of the
              Platform or any third-party participation; (c) bypasses measures that are used to
              prevent or restrict access to the Platform; (d) circumvents, disables or otherwise
              interferes with security features of the Platform; (e) distributes viruses or any
              other technologies that may harm VEEH or users; (f) uses the Platform in a way that
              violates any copyrights, trade secrets, or other rights of any third party, including
              privacy or publicity rights; or (g) circumvents or manipulates Fee (defined herein)
              structure, billing, or Fees owed; • As an Publisher Member, use the Platform in any
              manner that circumvents your obligation to pay VEEH. Collect, harvest or publish any
              personally identifiable data including but not limited to names or other account
              information, from the Platform, or use the communication systems provided by the
              Platform for any reason not explicitly authorized by these Terms, including commercial
              solicitation purposes; • Recruit, solicit, or contact in any form Publisher Members or
              Customer Members for employment or any other use not specifically intended by the
              Platform; • Take any inappropriate or unlawful actions, including the submission of
              inappropriate or unlawful Content to or through the Platform, including Content that
              is harassing, hateful, illegal, profane, obscene, defamatory, threatening, or
              discriminatory, or that advocates, promotes, or encourages inappropriate activity,
              conduct that would be considered a criminal offense, or conduct that would give rise
              to civil liability or violate any law; • Violate any key VEEH policies that govern
              your use of the Platform and our interactions with you and third parties; • Advertise
              or solicit a service not related to or appropriate for the Platform including, but not
              limited to any service that (a) is not in supported categories • Submit User Content
              that damages the experience of any user including but not limited to (a) requests to
              download non-VEEH mobile applications and/or links that direct the user to mirrored
              websites where the user must enter information that is redundant with what has already
              been entered on VEEH, (b) offers to purchase a service or any other service outside of
              VEEH, or (c) using a profile page or user name to promote services not offered on or
              through the Platform; • Take any action that may undermine the efficacy or accuracy of
              reviews or ratings systems; • Fail to perform services purchased from you as promised,
              unless the Customer Member fails to materially meet the terms of the mutually
              agreed-upon agreement for the services, or a clear typographical error is made, or you
              cannot authenticate the Customer Member's identity; • Engage in fraudulent conduct
              including but not limited to offering to make money transfers with intent to request a
              refund of any portion of the payment or soliciting users to mail cash or use other
              payment methods prohibited by VEEH; • Sign up for, negotiate a price for, use, or
              otherwise solicit a service with no intention of following through with your use of or
              payment for the service; • Agree to purchase a service when you do not meet a Service
              Member's requirements; • Undertake any activity or engage in any conduct that is
              inconsistent with the business or purpose of the Platform; and • Attempt to indirectly
              undertake any of the foregoing. VEEH FEES AND TAXES In connection with use of VEEH's
              Platform, VEEH charges certain Fees ("VEEH Fees" or "Fees"). Current Fees paid for by
              Service and Customer Members for various purposes will be shown on an account summary.
              Fees for additional products or services, including ongoing services, will be provided
              to you before you use such services. VEEH may also charge penalty Fees for fraud,
              misconduct or other violations of these Terms, as determined in our sole discretion.
              Information about current penalty Fees is available in the policy or support center.
              You agree to pay these Fees. Information about current penalty Fees is available in
              the policy or support center. You agree to pay all applicable Fees or charges based on
              the Fee and billing terms then in effect, regardless of whether you have an active
              Account. Charges shall be made to your credit card, PayPal or other payment method
              designated at the time you make a purchase or register for a service. If you do not
              pay on time or if VEEH cannot charge a credit card, PayPal or other payment method for
              any reason, VEEH reserves all rights permissible under law to recover payment and all
              costs and expenses incurred, including reasonable attorneys' fees, in our pursuit of
              payment. You explicitly agree that all communication in relation to delinquent
              accounts or Fees due will be made by electronic mail or by phone. Such communication
              may be made by VEEH or by anyone on its behalf, including but not limited to a
              third-party collection agent. If you cancel your Account at any time, you will not
              receive any refund. If you have a balance due on any Account, you agree that VEEH may
              charge such unpaid Fees to your credit card or otherwise bill you for such unpaid
              Fees. You understand and agree that you are solely responsible for determining your
              own tax reporting and sales tax collection requirements in consultation with tax
              advisers, and that we cannot and do not offer specific tax advice to either Publisher
              Members or Customer Members. All sales on VEEH are final and non-refundable, except as
              otherwise specified herein. PAYMENTS Marketplace payment processing services for
              Publisher members on VEEH are provided by Shopify, and, where applicable, may include
              money transmission services pursuant to licenses held by Shopify. Payment processing
              services provided by Shopify are subject to the Shopify Connected Account Agreement,
              which includes the Shopify Services Agreement. By agreeing to these terms or
              continuing to operate as a Service Member on VEEH, you agree to be bound by the
              Shopify Connected Account Agreement and Shopify Services Agreement, as the same may be
              modified by Shopify from time to time. As a condition of VEEH enabling payment
              processing services through Shopify, you agree to provide VEEH accurate and complete
              information about you and your business, and you authorize VEEH to share with Shopify
              this information and transaction information related to your use of the payment
              processing services provided by Shopify.
            </Text>
            <Text>
              VEEH serves as a limited payment collection agent of an Publisher Member and is
              authorized to collect payment from Customer Members on behalf of an Publisher Member.
              Payment made by a Customer Member to VEEH in connection with services shall be
              considered the same as a payment made directly to an Publisher Member. As an Publisher
              Member, you hereby appoint VEEH as your limited payment collection agent solely for
              the purpose of accepting payment from Customer Members in connection with services.
              You agree that payment made to VEEH shall be considered the same as a payment made
              directly to you. You further understand that, as a limited payment collection agent
              for its Publisher Members, VEEH’s obligation to you, as the Publisher Member, is
              subject to and conditional upon successful receipt of payment from Customer Member. In
              accepting appointment as your limited payment collection agent, VEEH assumes no
              liability for your acts or omissions in your capacity as the Publisher Member. If any
              Member does not make a marketplace payment on time or if VEEH cannot charge a credit
              card, PayPal or other payment method for any reason, VEEH reserves all rights
              permissible under law to recover payment and all costs and expenses incurred,
              including reasonable attorneys' fees, in our pursuit of payment. You explicitly agree
              that all communication in relation to delinquent accounts or payments due will be made
              by electronic mail or by phone. Such communication may be made by VEEH or by anyone on
              its behalf, including but not limited to a third-party collection agent. If you have a
              balance due on any Account, you agree that VEEH may charge such unpaid payments to
              your credit card or otherwise bill you for such unpaid payments. All cancellation and
              refund requests will be subject to VEEH’s review and absolute discretion. We will
              normally process your valid written request within thirty (30) days of receiving it,
              unless a shorter period is required by law. You may request a cancellation or refund
              by emailing your request to VEEH support at support@veeh.co. If you cancel your
              Account at any time, you will not receive any refund. DISPUTES BETWEEN OR AMONG USERS
              VEEH values our Publishers and Customers, and we understand that occasionally disputes
              may arise between or among them. Our goal is to provide tools to help users resolve
              such disputes independently. In the rare event a dispute initiated by either an
              Publisher Member or a Customer Member cannot be resolved independently, you agree, at
              VEEH's request, to participate with good faith, to the extent you are reasonably able
              to do so, in a neutral resolution, mediation, or arbitration process conducted by VEEH
              or a neutral third-party mediator or arbitrator selected by VEEH. Notwithstanding the
              foregoing, you acknowledge and agree that VEEH is under no obligation to become
              involved in or impose resolution in any dispute between or among users or any third
              party. INTELLECTUAL PROPERTY RIGHTS VEEH Content is protected by copyright, trademark,
              and other laws of the United States, foreign countries, and international conventions.
              Except as expressly provided in these Terms, VEEH and its licensors exclusively own
              all right, title, and interest in and to the Platform and VEEH Content, including all
              associated intellectual property rights. All trademarks, service marks, logos, trade
              names and any other proprietary designations of VEEH used herein are trademarks or
              registered trademarks of VEEH. Any other trademarks, service marks, logos, trade names
              and any other proprietary designations are the trademarks or registered trademarks of
              their respective owners. FEEDBACK By sending us any feedback, comments, questions, or
              suggestions concerning VEEH or our services, including the Platform (collectively,
              “Feedback”) you represent and warrant (a) that you have the right to disclose the
              Feedback, (b) that the Feedback does not violate the rights of any other person or
              entity, and (c) that your Feedback does not contain the confidential or proprietary
              information of any third party or parties. By sending us any Feedback, you further (i)
              agree that we are under no obligation of confidentiality, express or implied, with
              respect to the Feedback, (ii) acknowledge that we may have something similar to the
              Feedback already under consideration or in development, (iii) grant us an irrevocable,
              non-exclusive, royalty-free, perpetual, worldwide license to use, modify, prepare
              derivative works, publish, distribute and sublicense the Feedback, and (iv)
              irrevocably waive, and cause to be waived, against VEEH and its users any claims and
              assertions of any moral rights contained in such Feedback. This Feedback section shall
              survive any termination of your Account or the Platform. COPYRIGHT POLICY We will
              respond to notices of alleged copyright infringement that comply with applicable law
              and are properly provided to us. If you believe that your Content has been copied in a
              way that constitutes copyright infringement, please provide our copyright agent with
              the following information in accordance with the Digital Millennium Copyright Act: (i)
              a physical or electronic signature of the copyright owner or a person authorized to
              act on their behalf; (ii) identification of the copyrighted work claimed to have been
              infringed; (iii) identification of the material that is claimed to be infringing or to
              be the subject of infringing activity and that is to be removed or access to which is
              to be disabled, and information reasonably sufficient to permit us to locate the
              material; (iv) your contact information, including your address, telephone number, and
              an email address; (v) a statement by you that you have a good faith belief that use of
              the material in the manner complained of is not authorized by the copyright owner, its
              agent, or the law; and (vi) a statement that the information in the notification is
              accurate, and, under penalty of perjury, that you are authorized to act on behalf of
              the copyright owner. Our designated copyright agent for notice of alleged copyright
              infringement or other legal notices regarding Content appearing on the Service is:
              VEEH Corporation 232 Acalanes Drive, #3 Sunnyvale, CA 94086 support@veeh.co We reserve
              the right to remove Content alleged to be infringing or otherwise illegal without
              prior notice and at our sole discretion. In appropriate circumstances, we will also
              terminate a user's account if the user is determined to be a repeat infringer. NO
              ENDORSEMENT VEEH does not endorse any Member, user or any services, and VEEH is not a
              party to any agreements between or among users, Members or third parties. No agency,
              partnership, joint venture, or employment is created as a result of the Terms or any
              user's or Member's use of any part of the Platform, including but not limited to any
              scheduling or other services. Neither VEEH nor any Members or users of the Platform
              may direct or control the day-to-day activities of the other, or create or assume any
              obligation on behalf of the other. Members are required by these Terms to provide
              accurate information, and although VEEH may undertake additional checks and processes
              designed to help verify or check the identities or backgrounds of users, we do not
              make any representations about, confirm, or endorse any user or their purported
              identity or background, regardless of the specific VEEH services they are using or any
              involvement by VEEH personnel in providing or scheduling those services.
            </Text>
            <Text>
              Any reference on the Platform to a user being credentialed in some manner, indicates
              only that the user has completed a relevant account process or met user review
              standards, and does not represent anything else. Any such description is not an
              endorsement, certification or guarantee by VEEH and is not verification of their
              identity and whether they or their services trustworthy, safe or suitable. Instead,
              any such description is intended to be useful information for you to evaluate when you
              make your own decisions about the identity and suitability of others whom you contact
              or interact with via the Platform. You should always exercise responsibility, due
              diligence and care when deciding whether to have any interaction with any other user.
              VEEH offers a non-exhaustive list of safety tips to consider when hiring an Publisher
              Member. VEEH is not responsible for any damage or harm resulting from your
              interactions with other users. The Collective Content may contain links to third-party
              websites, offers, or other events/activities not owned or controlled by VEEH. We do
              not endorse or assume any responsibility for any such links, and if you access them,
              you do so at your own risk. By using the Platform, you understand and agree that any
              legal remedy or liability that you seek to obtain for actions or omissions of other
              users or other third parties will be limited to a claim against those particular users
              or other third parties. You agree not to attempt to impose liability on or seek any
              legal remedy from VEEH with respect to such actions or omissions. SANCTIONS FOR
              VIOLATIONS OF THESE TERMS Without limiting any other rights reserved herein, VEEH may,
              in its sole discretion, take any action permitted by law for any violation of these
              Terms or any other policy or agreement between you and VEEH, including but not limited
              to removing User Content you posted, limiting your Account access, requiring you to
              forfeit certain funds or paid Fees, assessing monetary penalties or costs, terminating
              your Account, decreasing your status or search rank, canceling quotes or postings,
              blocking access, investigating you, and/or cooperating with law enforcement agencies
              in investigation or prosecution. ACCOUNT SUSPENSION OR TERMINATION We may, in our
              discretion, with or without cause, with or without prior notice and at any time,
              decide to limit, block, suspend, deactivate or cancel your VEEH Account in whole or in
              part. If we exercise our discretion under these Terms to do so, any or all of the
              following can occur with or without prior notice or explanation to you: (a) your
              Account will be deactivated or suspended, your password will be disabled, and you will
              not be able to access the Platform or your User Content, or receive assistance from
              VEEH support teams; (b) if appropriate in our sole discretion, we may communicate to
              other users that your Account has been terminated, blocked, suspended, deactivated, or
              cancelled, and why this action has been taken; and (c) you will not be entitled to any
              compensation for Platform Services cancelled or delayed as a result of Account
              termination. You may cancel your use of the Platform and/or terminate your Account at
              any time by following the "Settings" link in in your profile, clicking "Account," and
              clicking "Deactivate Account." Please note that if your Account is cancelled, we do
              not have an obligation to delete or return to you any Content you have posted to the
              Platform, including, but not limited to, any reviews. GOVERNING LAW The Terms and the
              relationship between you and VEEH shall be governed in all respects by the laws of the
              State of California, without regard to its conflict of law provisions. You agree that
              any claim or dispute you may have against VEEH that is not subject to arbitration must
              be resolved by a court located in San Francisco County, San Francisco, California, or
              a United States District Court, Northern District of California, located in San
              Francisco, California, except as otherwise agreed by the parties. You agree to submit
              to the personal jurisdiction of the courts located within San Francisco County,
              California or the United States District Court, Northern District of California
              located in San Francisco, California, for the purpose of litigating all such claims or
              disputes that are not subject to arbitration. You hereby waive any and all
              jurisdictional and venue defenses otherwise available. DISCLAIMERS YOUR USE OF THE
              PLATFORM, SERVICES, OR COLLECTIVE CONTENT SHALL BE SOLELY AT YOUR OWN RISK. YOU
              ACKNOWLEDGE AND AGREE THAT VEEH DOES NOT HAVE AN OBLIGATION, BUT RESERVES THE RIGHT
              FOR ANY REASON, TO (A) MONITOR OR REVIEW USER CONTENT; OR (B) FOR ANY PERMISSIBLE
              PURPOSE, CONDUCT IDENTITY VERIFICATION, BACKGROUND (INCLUDING CRIMINAL BACKGROUND) OR
              REGISTERED SEX OFFENDER CHECKS ON ANY MEMBER, INCLUDING BUT NOT LIMITED TO PUBLISHER
              MEMBERS AND CUSTOMER MEMBERS. THE PLATFORM IS PROVIDED "AS IS," WITHOUT WARRANTY OF
              ANY KIND, EITHER EXPRESS OR IMPLIED. WITHOUT LIMITING THE FOREGOING, VEEH AND ITS
              AFFILIATES AND SUBSIDIARIES, AND THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES AND
              AGENTS EXPLICITLY DISCLAIM ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, QUIET ENJOYMENT OR NON-INFRINGEMENT; ANY WARRANTIES ARISING OUT OF COURSE OF
              DEALING OR USAGE OF OR IN TRADE; ANY WARRANTIES, REPRESENTATIONS, OR GUARANTEES IN
              CONNECTION WITH THIS PLATFORM OR THE SERVICES OFFERED ON OR THROUGH THIS PLATFORM; AND
              ANY WARRANTIES RELATING TO THE QUALITY, SUITABILITY, TRUTH, ACCURACY OR COMPLETENESS
              OF ANY INFORMATION OR MATERIAL CONTAINED OR PRESENTED ON THIS PLATFORM, INCLUDING
              WITHOUT LIMITATION ALL COLLECTIVE CONTENT. VEEH MAKES NO WARRANTY THAT THE PLATFORM OR
              SERVICES WILL MEET YOUR REQUIREMENTS OR BE AVAILABLE ON AN UNINTERRUPTED, SECURE, OR
              ERROR-FREE BASIS. VEEH ASSUMES NO RESPONSIBILITY, AND SHALL NOT BE LIABLE FOR ANY
              DAMAGES TO YOUR COMPUTER EQUIPMENT OR OTHER PROPERTY ON ACCOUNT OF YOUR ACCESS TO OR
              USE OF THE PLATFORM. VEEH SHALL NOT BE LIABLE FOR ANY DEFAMATORY, OFFENSIVE, OR
              ILLEGAL CONDUCT OF ANY THIRD PARTY, OR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A
              RESULT OF THE USE OF ANY DATA, INFORMATION, MATERIALS, SUBSTANCE, OR COLLECTIVE
              CONTENT POSTED, TRANSMITTED, OR MADE AVAILABLE VIA THE PLATFORM. NO ADVICE OR
              INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED FROM VEEH OR THROUGH THE PLATFORM, WILL
              CREATE ANY WARRANTY NOT EXPRESSLY MADE HEREIN. YOU ARE SOLELY RESPONSIBLE FOR ALL OF
              YOUR COMMUNICATIONS AND INTERACTIONS WITH OTHER USERS OR MEMBERS OF THE PLATFORM AND
              WITH OTHER PERSONS WITH WHOM YOU COMMUNICATE OR INTERACT AS A RESULT OF YOUR USE OF
              THE PLATFORM, INCLUDING BUT NOT LIMITED TO ANY CUSTOMER MEMBERS, PUBLISHER MEMBERS OR
              SERVICE RECIPIENTS. YOU UNDERSTAND THAT VEEH DOES NOT MAKE ANY ATTEMPT TO VERIFY THE
              STATEMENTS OF USERS OF THE PLATFORM OR TO REVIEW OR VET ANY SERVICES. VEEH MAKES NO
              REPRESENTATIONS OR WARRANTIES AS TO THE CONDUCT OF USERS OF THE PLATFORM OR THEIR
              COMPATIBILITY WITH ANY CURRENT OR FUTURE USERS OF THE PLATFORM. YOU AGREE TO TAKE
              REASONABLE PRECAUTIONS IN ALL COMMUNICATIONS AND INTERACTIONS WITH OTHER USERS OF THE
              PLATFORM AND WITH OTHER PERSONS WITH WHOM YOU COMMUNICATE OR INTERACT AS A RESULT OF
              YOUR USE OF THE PLATFORM, PARTICULARLY IF YOU DECIDE TO MEET OFFLINE OR IN PERSON AND
              GIVE OR RECEIVE SERVICES. VEEH EXPLICITLY DISCLAIMS ALL LIABILITY FOR ANY ACT OR
              OMISSION OF ANY USERS OR THIRD PARTIES. LIMITATION OF LIABILITY YOU ACKNOWLEDGE AND
              AGREE THAT, TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE ENTIRE RISK ARISING OUT OF
              YOUR ACCESS TO AND USE OF THE PLATFORM AND COLLECTIVE CONTENT, YOUR OFFERING OR
              PROVIDING SERVICES OR REQUESTING OR RECEIVING SERVICES THROUGH THE PLATFORM, AND ANY
              CONTACT YOU HAVE WITH OTHER USERS OF VEEH OR THIRD PARTIES, WHETHER IN PERSON OR
              ONLINE, REMAINS WITH YOU.
            </Text>
            <Text>
              NEITHER VEEH NOR ANY OTHER PARTY INVOLVED IN CREATING, PRODUCING, OR DELIVERING THE
              PLATFORM WILL BE LIABLE (WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING
              NEGLIGENCE), PRODUCT LIABILITY OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT VEEH HAS
              BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE, EVEN IF A LIMITED REMEDY SET FORTH
              HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE) FOR: (A) ANY INCIDENTAL,
              SPECIAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS, LOSS OF DATA OR
              LOSS OF GOODWILL; (B) SERVICE INTERRUPTION, COMPUTER DAMAGE OR SYSTEM FAILURE; (C) THE
              COST OF SUBSTITUTE PRODUCTS OR SERVICES; (D) ANY DAMAGES FOR PERSONAL OR BODILY INJURY
              OR EMOTIONAL DISTRESS ARISING OUT OF OR IN CONNECTION WITH THESE TERMS; (E) THE USE OF
              OR INABILITY TO USE THE PLATFORM, SERVICES OR COLLECTIVE CONTENT; (F) ANY
              COMMUNICATIONS, INTERACTIONS OR MEETINGS WITH OTHER USERS OF THE PLATFORM OR OTHER
              PERSONS WITH WHOM YOU COMMUNICATE OR INTERACT AS A RESULT OF YOUR USE OF THE PLATFORM;
              OR (G) YOUR OFFERING OR PROVIDING SERVICES OR REQUESTING OR RECEIVING SERVICES THROUGH
              THE PLATFORM. IN NO EVENT SHALL THE TOTAL, AGGREGATE LIABILITY OF VEEH AND ITS
              AFFILIATES AND SUBSIDIARIES, AND THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES AND
              AGENTS, ARISING FROM OR RELATING TO THE TERMS, PLATFORM, SERVICES, AND/OR COLLECTIVE
              CONTENT, OR FROM THE USE OF OR INABILITY TO USE THE PLATFORM OR COLLECTIVE CONTENT OR
              IN CONNECTION WITH ANY SERVICES OR INTERACTIONS WITH ANY OTHER USERS EXCEED THE TOTAL
              AMOUNT OF FEES ACTUALLY PAID TO VEEH BY YOU HEREUNDER, OR ONE HUNDRED US DOLLARS IF NO
              SUCH PAYMENTS HAVE BEEN MADE, AS APPLICABLE. THE LIMITATION OF LIABILITY DESCRIBED
              ABOVE SHALL APPLY FULLY TO RESIDENTS OF NEW JERSEY. INDEMNIFICATION AND RELEASE You
              agree to release, defend, indemnify, and hold VEEH and its affiliates and
              subsidiaries, and their respective officers, directors, employees and agents, harmless
              from and against any claims, liabilities, damages, losses, and expenses, including
              without limitation reasonable legal and accounting fees, arising out of or in any way
              connected with (a) your access to or use of the Platform or your violation of these
              Terms; (b) your User Content or the Collective Content; (c) your interaction with any
              Member or user; and (d) the request or receipt or offer or provision of services by
              you, including but not limited to any injuries, losses, or damages (compensatory,
              direct, incidental, consequential or otherwise) of any kind arising in connection with
              such services. Notwithstanding the foregoing paragraph, if you are a resident of New
              Jersey, you only agree to release, defend, indemnify, and hold VEEH and its affiliates
              and subsidiaries, and their respective officers, directors, employees and agents,
              harmless from and against any third-party claims, liabilities, damages, losses, and
              expenses, including without limitation reasonable legal and accounting fees, arising
              out of or in any way connected with your violation of these Terms. If you are a
              California resident, you waive California Civil Code Section 1542, which provides: A
              general release does not extend to claims which the creditor does not know or suspect
              to exist in his or her favor at the time of executing the release, which if known by
              him or her must have materially affected his or her settlement with the debtor. If you
              are not a California resident, you waive your rights under any statute or common law
              principle similar to Section 1542 that governs your rights in the jurisdiction of your
              residence. GENERAL Force Majeure: Other than payment obligations, neither VEEH nor you
              shall be liable to the other for any delay or failure in performance under the Terms
              arising out of a cause beyond its control and without its fault or negligence. Such
              causes may include but are not limited to fires, floods, earthquakes, strikes,
              unavailability of necessary utilities, blackouts, acts of God, acts of declared or
              undeclared war, acts of regulatory agencies, or national disasters. No Third-Party
              Beneficiaries: You agree that, except as otherwise expressly provided in these Terms,
              there shall be no third-party beneficiaries to these Terms. Contacting You and E-SIGN
              Consent: You agree that VEEH may provide you with notices, including those regarding
              changes to the Terms, by email, regular mail, or postings on the Platform. With your
              consent, VEEH or Publisher members may also contact you by telephone or through text
              messages. If you have agreed to receive text messages or telephone calls from VEEH or
              Publisher members, you also consent to the use of an electronic record to document
              your agreement. You may withdraw your consent to the use of the electronic record by
              sending an email to support@veeh.co with "Revoke Electronic Consent" in the subject
              line. To view and retain a copy of this disclosure or any information regarding your
              enrollment in this program, you will need (a) a device (such as a computer or mobile
              phone) with a web browser and Internet access; and (b) either a printer or storage
              space on such device. For a free paper copy, or to update our records of your contact
              information, send an email to support@veeh.co with contact information and the address
              for delivery. Entire Agreement: These Terms, together with the Privacy Policy and any
              other legal notices or additional terms and conditions or policies published by VEEH
              on the Platform, shall constitute the entire agreement between you and VEEH concerning
              the Platform or services obtained through the Platform. Except as explicitly stated
              herein, if any provision of the Terms is deemed invalid by a court of competent
              jurisdiction, the invalidity of such provision shall not affect the validity of the
              remaining provisions of the Terms, which shall remain in full force and effect.
              Waiver: No waiver of any provision of these Terms shall be deemed a further or
              continuing waiver of such term or any other term, and VEEH's failure to assert any
              right or provision under these Terms shall not constitute a waiver of such right or
              provision. Statute of Limitations: You agree that regardless of any statute or law to
              the contrary, any claim arising out of or related to the Platform or the services
              offered therein must commence within one (1) year after the cause of action accrues.
              Otherwise, such cause of action is permanently barred. Notwithstanding the foregoing,
              this statute of limitations shall not apply to residents of New Jersey. Section
              Headings: The section headings in these Terms are for convenience only and have no
              legal or contractual effect. Contact Information: If you have any questions about
              these Terms or the Platform, please contact us by sending an email to support@veeh.co,
              or by writing to VEEH Corporation 232 Acalanes Drive, #3, Sunnyvale, CA 94086
            </Text>
          </ScrollView>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white'
    // paddingTop: Constants.statusBarHeight
  },
  topMenuOne: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10
  },
  topMenuModalAndroid: {
    display: 'flex',
    alignSelf: 'stretch',
    position: 'absolute',
    // top: 44,
    // height: 200,
    zIndex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  topMenuModalIos: {
    display: 'flex',
    alignSelf: 'stretch',
    position: 'absolute',
    top: Constants.statusBarHeight,
    // height: 200,
    zIndex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'white'
  }
});
