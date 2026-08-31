// src/pages/terms/Terms.jsx

import React from "react";
import SeoHead from "../../components/common/SeoHead";

const Terms = () => {
  return (
    <>
      <SeoHead
        title="Terms & Conditions | Construction Customer Service"
        description="Read the terms and conditions for booking CITB tests, CSCS cards, and construction training through Construction Customer Service."
        keywords="terms and conditions, booking terms, construction customer service terms"
      />
      {/* ── Page Header (Slim & Responsive) ── */}
      <div className="relative overflow-hidden shadow-md bg-[#f5f7ff] md:bg-[url('/images/page-header-bg-shape.png')] md:bg-cover md:bg-center">
        {/* Background Overlays */}
        <div className="absolute inset-0 z-0 bg-white/80 bg-gradient-to-r from-[#f1f3ff]/70 via-[#f4fef3]/70 to-[#fff3fc]/70"></div>
        <div className="absolute inset-0 bg-white opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 margin-container py-5 lg:py-6 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            Privacy &amp; Cancellation Policy
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            Last updated: June 2025 — please read carefully before booking any course, test, or service.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Policy Content */}
          <div className="lg:col-span-8 xl:col-span-9">

            {/* Section 1 */}
            <section className="mb-7">
              <h2 className="text-xl font-semibold mb-3">1. Cancellation &amp; Refund Policy</h2>
              <p className="mb-3">
                Please read this policy carefully before booking any course, test, or service with
                Construction Customer Service Ltd. By completing a booking, you confirm that you have
                read, understood, and agreed to these terms.
              </p>
            </section>

            {/* 1.1 */}
            <section className="mb-7">
              <h2 className="text-xl font-semibold mb-3">1.1 Online Courses — No Refund</h2>
              <p className="mb-3 font-semibold text-blue-600">
                IMPORTANT: Online courses are strictly non-refundable once booked.
              </p>
              <p className="mb-3">
                Because our online CSCS and CITB training courses grant immediate access to digital
                learning materials upon payment, we are unable to offer refunds under any
                circumstances. This applies regardless of:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-3">
                <li>Whether or not you have started the course</li>
                <li>Change of mind or personal circumstances</li>
                <li>Technical issues on the learner's own device or internet connection</li>
                <li>Failure to complete the course within the access period</li>
                <li>Errors in booking (wrong course selected, wrong learner details, etc.)</li>
              </ul>
              <p className="mb-3">
                If you are unsure which course is right for you, please contact us before booking at{" "}
                <a
                  href="mailto:admin@constructioncustomerservice.co.uk"
                  className="text-blue-600 underline"
                >
                  admin@constructioncustomerservice.co.uk
                </a>{" "}
                or call us for guidance.
              </p>
            </section>

            {/* 1.2 */}
            <section className="mb-7">
              <h2 className="text-xl font-semibold mb-3">1.2 Classroom Courses — No Refund</h2>
              <p className="mb-3 font-semibold text-blue-600">
                IMPORTANT: Classroom course bookings are strictly non-refundable.
              </p>
              <p className="mb-3">
                Classroom course fees are non-refundable once a booking has been confirmed. We incur
                costs for venue, trainer, and materials immediately upon confirmation, and as such we
                are unable to refund fees in the event of:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-3">
                <li>Cancellation by the learner for any reason</li>
                <li>Non-attendance on the day of the course</li>
                <li>Late arrival resulting in missed course content</li>
                <li>Failure to bring required identification or supporting documents</li>
                <li>Rescheduling requests made less than 5 working days before the course date</li>
              </ul>
              <p className="mb-3">
                Rescheduling requests made more than 5 working days before the course date may be
                considered at our sole discretion and may be subject to an administration fee. We
                reserve the right to decline any rescheduling request.
              </p>
            </section>

            {/* 1.3 */}
            <section className="mb-7">
              <h2 className="text-xl font-semibold mb-3">
                1.3 CITB Health, Safety &amp; Environment (HS&amp;E) Test — No Refund
              </h2>
              <p className="mb-3 font-semibold text-blue-600">
                IMPORTANT: CITB test bookings are strictly non-refundable.
              </p>
              <p className="mb-3">
                CITB HS&amp;E test fees are non-refundable once a test slot has been booked and
                confirmed. Test slots are allocated in real-time through the CITB testing network, and
                once secured your slot cannot be released for a refund. No refunds will be issued for:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-3">
                <li>Cancellations or rescheduling requests by the candidate</li>
                <li>Non-attendance at the test centre</li>
                <li>
                  Failure to bring valid identification or required documentation on the test day
                </li>
                <li>
                  Test failure — the test fee is a booking and administration charge, not a guarantee
                  of a pass
                </li>
                <li>
                  Technical difficulties arising from the candidate's own equipment or internet
                  connection (for online tests)
                </li>
              </ul>
              <p className="mb-3">
                If you believe your test booking was affected by an error on our part, please contact
                us within 24 hours of the test date.
              </p>
            </section>

            {/* 1.4 */}
            <section className="mb-7">
              <h2 className="text-xl font-semibold mb-3">1.4 When a Refund May Be Issued</h2>
              <p className="mb-3">
                The only circumstance in which a refund will be considered is if your payment card
                was not successfully charged and no service or booking confirmation was issued.
              </p>
              <p className="mb-3">
                If your payment was declined, failed, or was not processed by our payment provider,
                and you have not received a booking confirmation, you may be eligible for a refund of
                any amount already captured in error. In such cases:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-3">
                <li>
                  A valid refund request must be submitted to{" "}
                  <a
                    href="mailto:admin@constructioncustomerservice.co.uk"
                    className="text-blue-600 underline"
                  >
                    admin@constructioncustomerservice.co.uk
                  </a>{" "}
                  within 7 days of the attempted transaction
                </li>
                <li>
                  We will verify the payment status with our payment processor before approving any
                  refund
                </li>
                <li>
                  An administration fee will be deducted from any refund amount to cover processing
                  and bank charges
                </li>
                <li>
                  Refunds will be returned to the original payment method only and may take 5–10
                  business days to appear
                </li>
              </ul>
              <p className="mb-3">We are not liable for delays caused by your bank or card issuer.</p>
            </section>

            {/* 1.5 */}
            <section className="mb-7">
              <h2 className="text-xl font-semibold mb-3">1.5 Administration Fee</h2>
              <p className="mb-3">
                Where a refund is approved (solely in the payment processing failure scenario
                described above), an administration fee will be deducted before the refund is issued.
                The administration fee covers:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-3">
                <li>Payment gateway and bank processing charges</li>
                <li>Staff time for investigation and processing</li>
                <li>Any third-party fees incurred as a result of the transaction</li>
              </ul>
              <p className="mb-3">
                The applicable administration fee will be confirmed to you in writing before the
                refund is processed. By accepting the refund, you agree to the fee deduction.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-7">
              <h2 className="text-xl font-semibold mb-3">2. Privacy Policy</h2>
              <p className="mb-3">
                This privacy policy applies between you, the User of this Website, and Construction
                Customer Service Ltd., the owner and provider of this Website. Construction Customer
                Service Ltd. takes the privacy of your information very seriously. This policy applies
                to all data collected by us or provided by you in connection with your use of this
                Website.
              </p>
              <p className="mb-3">
                Registered in England and Wales — Company No. 11003602. Registered office: 85 Great
                Portland Street, London, W1W 7LT.
              </p>
            </section>

            {/* 2.1 */}
            <section className="mb-7">
              <h2 className="text-xl font-semibold mb-3">2.1 Definitions</h2>
              <p className="mb-3">In this privacy policy, the following terms apply:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-semibold">Data</span> — all information you submit to
                  Construction Customer Service Ltd. via this Website, including personal data as
                  defined by the Data Protection Act 1998 and the UK GDPR
                </li>
                <li>
                  <span className="font-semibold">Cookies</span> — small text files placed on your
                  device when you visit certain parts of the Website
                </li>
                <li>
                  <span className="font-semibold">User / You</span> — any third party accessing this
                  Website who is not employed by, or contracted to, Construction Customer Service Ltd.
                </li>
                <li>
                  <span className="font-semibold">Website</span> —
                  www.constructioncustomerservice.co.uk and all sub-domains, unless expressly excluded
                </li>
              </ul>
            </section>

            {/* 2.2 */}
            <section className="mb-7">
              <h2 className="text-xl font-semibold mb-3">2.2 Data We Collect</h2>
              <p className="mb-3">
                We may collect the following personal data from you when you use our Website or book
                a course or test:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-3">
                <li>Full name</li>
                <li>Date of birth</li>
                <li>Gender</li>
                <li>Occupation / trade</li>
                <li>Contact details (email address and telephone number)</li>
                <li>
                  Payment information (processed securely by our payment provider — we do not store
                  card details)
                </li>
              </ul>
              <p className="mb-3">
                There are different pricing structures displayed online. Please contact us to confirm
                the correct rates before booking.
              </p>
            </section>

            {/* 2.3 */}
            <section className="mb-7">
              <h2 className="text-xl font-semibold mb-3">2.3 How We Use Your Data</h2>
              <p className="mb-3">
                Construction Customer Service Ltd. is the data controller for the purposes of the
                Data Protection Act 1998 and UK GDPR. We will use your data to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-3">
                <li>Process your booking and administer your course or test</li>
                <li>Maintain internal records and comply with legal obligations</li>
                <li>
                  Send you relevant marketing and promotional materials by email (you may opt out at
                  any time)
                </li>
                <li>
                  Contact you for customer service, quality assurance, or market research purposes
                </li>
                <li>Improve our Website, courses, and services</li>
              </ul>
              <p className="mb-3">
                We will retain your personal data for a period of 3 months following your interaction
                with us, unless a longer retention period is required by law.
              </p>
            </section>

            {/* 2.4 */}
            <section className="mb-7">
              <h2 className="text-xl font-semibold mb-3">2.4 Data Sharing &amp; Third Parties</h2>
              <p className="mb-3">
                We will not sell, rent, or share your personal data with third parties except in the
                following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-3">
                <li>
                  With trusted service providers acting on our behalf (e.g. payment processors, IT
                  providers) who are contractually obligated to keep your data secure
                </li>
                <li>If required to do so by law, regulation, or court order</li>
                <li>
                  In connection with a business sale, merger, or transfer of control, where data may
                  be transferred as part of that transaction — new owners will be bound by the terms
                  of this policy
                </li>
              </ul>
              <p className="mb-3">
                We will never disclose your data to unauthorised third parties or use it for any
                purpose other than those described in this policy.
              </p>
            </section>

            {/* 2.5 */}
            <section className="mb-7">
              <h2 className="text-xl font-semibold mb-3">2.5 Data Security</h2>
              <p className="mb-3">
                We take data security seriously. We have implemented appropriate physical, electronic,
                and managerial procedures to safeguard and protect data collected via this Website.
                However, please be aware that transmitting information over the internet carries
                inherent risks and is done at your own risk.
              </p>
              <p className="mb-3">
                If any part of our Website requires a password, you are solely responsible for
                keeping that password confidential.
              </p>
            </section>

            {/* 2.6 */}
            <section className="mb-7">
              <h2 className="text-xl font-semibold mb-3">2.6 Cookies</h2>
              <p className="mb-3">
                Our Website may place cookies on your device to improve your browsing experience and
                help us understand how visitors use our site. All cookies are used in accordance with
                UK and EU Cookie Law.
              </p>
              <p className="mb-3">
                Before placing cookies, you will be presented with a consent request. You may choose
                to accept or decline. Declining may affect the functionality of certain features.
              </p>
              <p className="mb-3">
                We use analytical/performance cookies to help us understand visitor behaviour and
                improve the Website. You can manage or delete cookies at any time via your browser
                settings.
              </p>
            </section>

            {/* 2.7 */}
            <section className="mb-7">
              <h2 className="text-xl font-semibold mb-3">2.7 Your Rights</h2>
              <p className="mb-3">
                Under the UK GDPR and Data Protection Act 2018, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-3">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate or incomplete data</li>
                <li>Request deletion of your data (subject to legal retention obligations)</li>
                <li>Object to or restrict processing of your data</li>
                <li>Withdraw marketing consent at any time</li>
              </ul>
              <p className="mb-3">
                To exercise any of these rights, please contact us at{" "}
                <a
                  href="mailto:admin@constructioncustomerservice.co.uk"
                  className="text-blue-600 underline"
                >
                  admin@constructioncustomerservice.co.uk
                </a>
                .
              </p>
            </section>

            {/* 2.8 */}
            <section className="mb-7">
              <h2 className="text-xl font-semibold mb-3">2.8 Links to Other Websites</h2>
              <p className="mb-3">
                Our Website may contain links to third-party websites. We have no control over the
                content or privacy practices of those sites and are not responsible for them. We
                recommend reviewing the privacy policy of any third-party website before using it.
              </p>
            </section>

            {/* 2.9 */}
            <section className="mb-7">
              <h2 className="text-xl font-semibold mb-3">2.9 Changes to This Policy</h2>
              <p className="mb-3">
                Construction Customer Service Ltd. reserves the right to update this Privacy &amp;
                Cancellation Policy at any time, as required by law or business need. Any changes
                will be published on this page with an updated date. Continued use of the Website
                after changes constitutes acceptance of the revised policy.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-7">
              <h2 className="text-xl font-semibold mb-3">3. Contact Us</h2>
              <p className="mb-3">
                If you have any questions about this policy, wish to exercise your data rights, or
                need to raise a concern about a booking or payment, please get in touch:
              </p>
              <ul className="list-none pl-0 space-y-1 mb-3">
                <li>
                  <span className="font-semibold">Construction Customer Service Ltd.</span>
                </li>
                <li>
                  Email:{" "}
                  <a
                    href="mailto:admin@constructioncustomerservice.co.uk"
                    className="text-blue-600 underline"
                  >
                    admin@constructioncustomerservice.co.uk
                  </a>
                </li>
                <li>
                  Website:{" "}
                  <a
                    href="https://www.constructioncustomerservice.co.uk"
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    www.constructioncustomerservice.co.uk
                  </a>
                </li>
                <li>Registered in England &amp; Wales — Company No. 11003602</li>
                <li>Registered Office: 85 Great Portland Street, London, W1W 7LT</li>
              </ul>
              <p className="mb-3">
                This policy is governed by the laws of England and Wales. Any disputes arising under
                this policy shall be subject to the exclusive jurisdiction of the English and Welsh
                courts.
              </p>
            </section>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-24">
              <section className="w-full">
                <div className="flex justify-center lg:justify-end">
                  <img
                    src="/images/Klarna.jpeg"
                    alt="Construction worker holding a CSCS card with Klarna payment option"
                    className="w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[360px] xl:max-w-[400px] h-auto rounded-2xl shadow-sm object-contain"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </section>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Terms;