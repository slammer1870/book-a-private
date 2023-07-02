type ServiceProps = {
  handleTos: () => void;
};

export const TermsOfService = ({ handleTos }: ServiceProps) => {
  return (
    <div className="fixed top-0 left-0 z-50 flex h-full w-full bg-black bg-opacity-90 p-4">
      <button
        className="absolute h-screen w-screen"
        onClick={handleTos}
      ></button>
      <div className="relative z-20 mx-auto my-auto h-96 w-full max-w-screen-md overflow-auto bg-white p-4">
        <div className="w-auto">
          <div id="outputPage" className="ContractText">
            <div className="format-html">
              <div data-exp="simple2" className="outputVersion1">
                <p
                  style={{
                    lineHeight: "18pt",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman",
                    color: "#000000",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontStyle: "normal",
                      fontWeight: "bold",
                      textDecoration: "underline",
                    }}
                  >
                    TERMS AND CONDITIONS
                  </span>
                </p>
                <p
                  style={{
                    lineHeight: "18pt",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman",
                    color: "#000000",
                    textAlign: "left",
                  }}
                >
                  These terms and conditions (the &ldquo;Terms and
                  Conditions&ldquo;) govern the use of
                  <span style={{ fontStyle: "normal", fontWeight: "bold" }}>
                    www.book-a-private.com
                  </span>
                  (the &ldquo;Site&ldquo;). This Site is owned and operated by
                  book-a-private.com. This Site is an ecommerce website.
                  <br />
                  <br />
                  By using this Site, you indicate that you have read and
                  understand these Terms and Conditions and agree to abide by
                  them at all times.
                </p>
                <div>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "normal",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Intellectual Property
                    </span>
                    <br />
                    All content published and made available on our Site is the
                    property of book-a-private.com and the Site&apos;s creators.
                    This includes, but is not limited to images, text, logos,
                    documents, downloadable files and anything that contributes
                    to the composition of our Site.
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "normal",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Acceptable Use
                    </span>
                    <br />
                    As a user of our Site, you agree to use our Site legally,
                    not to use our Site for illegal purposes, and not to:
                  </p>
                  <ul
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      listStyle: "disc",
                    }}
                  >
                    <li style={{ marginBottom: "18pt" }} value={1}>
                      <span>Harass or mistreat other users of our Site;</span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "18pt" }} value={2}>
                      <span>
                        Violate the rights of other users of our Site;
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "18pt" }} value={3}>
                      <span>
                        Violate the intellectual property rights of the Site
                        owners or any third party to the Site;
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "18pt" }} value={4}>
                      <span>
                        Hack into the account of another user of the Site;
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "18pt" }} value={5}>
                      <span>
                        Act in any way that could be considered fraudulent; or
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "0pt" }} value={6}>
                      <span>
                        Post any material that may be deemed inappropriate or
                        offensive.
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                  </ul>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    If we believe you are using our Site illegally or in a
                    manner that violates these Terms and Conditions, we reserve
                    the right to limit, suspend or terminate your access to our
                    Site. We also reserve the right to take any legal steps
                    necessary to prevent you from accessing our Site.
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "normal",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      User Contributions
                    </span>
                    <br />
                    Users may post the following information on our Site:
                  </p>
                  <ul
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      listStyle: "disc",
                    }}
                  >
                    <li style={{ marginBottom: "0pt" }} value={1}>
                      <span>Public comments.</span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                  </ul>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    By posting publicly on our Site, you agree not to act
                    illegally or violate these Terms and Conditions.
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "normal",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Accounts
                    </span>
                    <br />
                    When you create an account on our Site, you agree to the
                    following:
                  </p>
                  <ol
                    start={1}
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      listStyle: "decimal",
                    }}
                  >
                    <li style={{ marginBottom: "18pt" }} value={1}>
                      <span>
                        You are solely responsible for your account and the
                        security and privacy of your account, including
                        passwords or sensitive information attached to that
                        account; and
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "0pt" }} value={2}>
                      <span>
                        All personal information you provide to us through your
                        account is up to date, accurate, and truthful and that
                        you will update your personal information if it changes.
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                  </ol>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    We reserve the right to suspend or terminate your account if
                    you are using our Site illegally or if you violate these
                    Terms and Conditions.
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "normal",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Sale of Goods And Services
                    </span>
                    <br />
                    These Terms and Conditions govern the sale of goods and
                    services available on our Site.
                  </p>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    The following goods are available on our Site:
                  </p>
                  <ul
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      listStyle: "disc",
                    }}
                  >
                    <li style={{ marginBottom: "18pt" }} value={1}>
                      <span>Memberships;</span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "18pt" }} value={2}>
                      <span>Digital Content; and</span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "0pt" }} value={3}>
                      <span>Clothing.</span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                  </ul>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    We are under a legal duty to supply goods that match the
                    description of the good(s) you order on our Site.
                  </p>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    The following services are available on our Site:
                  </p>
                  <ul
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      listStyle: "disc",
                    }}
                  >
                    <li style={{ marginBottom: "0pt" }} value={1}>
                      <span>Brazilian Jiu Jitsu.</span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                  </ul>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    The services will be paid for in full when the services are
                    ordered.
                  </p>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    These Terms and Conditions apply to all the goods and
                    services that are displayed on our Site at the time you
                    access it. This includes all products listed as being out of
                    stock. All information, descriptions, or images that we
                    provide about our goods and services are as accurate as
                    possible. However, we are not legally bound by such
                    information, descriptions, or images as we cannot guarantee
                    the accuracy of all goods and services we provide. You agree
                    to purchase goods and services from our Site at your own
                    risk.
                  </p>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    We reserve the right to modify, reject or cancel your order
                    whenever it becomes necessary. If we cancel your order and
                    have already processed your payment, we will give you a
                    refund equal to the amount you paid. You agree that it is
                    your responsibility to monitor your payment instrument to
                    verify receipt of any refund.
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "normal",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      User Goods and Services
                    </span>
                    <br />
                    Our Site allows users to sell goods and services. We do not
                    assume any responsibility for the goods and services users
                    sell on our Site. We cannot guarantee the quality or
                    accuracy of any goods and services sold by users on our
                    Site. However, if we are made aware that a user is violating
                    these Terms and Conditions, we reserve the right to suspend
                    or prohibit the user from selling goods and services on our
                    Site.
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "normal",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Subscriptions
                    </span>
                    <br />
                    Your subscription automatically renews and you will be
                    automatically billed until we receive notification that you
                    want to cancel the subscription.
                  </p>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    To cancel your subscription, please follow these steps:
                    ___________________________________________________________
                    <br />
                    ___________________________________________________________
                    <br />
                    ___________________________________________________________
                    <br />
                    ___________________________________________________________
                    <br />
                    ___________________________________________________________
                    <br />
                    ___________________________________________________________
                    <br />
                    ___________________________________________________________
                    <br />
                    ___________________________________________________________
                    <br />
                    ___________________________________________________________
                    <br />
                    ___________________________________________________________
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "normal",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Payments
                    </span>
                    <br />
                    We accept the following payment methods on our Site:
                  </p>
                  <ul
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      listStyle: "disc",
                    }}
                  >
                    <li style={{ marginBottom: "18pt" }} value={1}>
                      <span>Credit Card;</span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "18pt" }} value={2}>
                      <span>PayPal;</span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "18pt" }} value={3}>
                      <span>Debit;</span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "18pt" }} value={4}>
                      <span>Direct Debit; and</span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "0pt" }} value={5}>
                      <span>Bitcoin.</span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                  </ul>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    When you provide us with your payment information, you
                    authorise our use of and access to the payment instrument
                    you have chosen to use. By providing us with your payment
                    information, you authorise us to charge the amount due to
                    this payment instrument.
                    <br />
                    <br />
                    If we believe your payment has violated any law or these
                    Terms and Conditions, we reserve the right to cancel or
                    reverse your transaction.
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "normal",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Shipping and Delivery
                    </span>
                    <br />
                    When you purchase goods from our Site, the goods will be
                    delivered through one of the following methods:
                  </p>
                  <ul
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      listStyle: "disc",
                    }}
                  >
                    <li style={{ marginBottom: "0pt" }} value={1}>
                      <span>
                        Standard delivery by post. Delivery takes 5 - 7 business
                        days.
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                  </ul>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    Delivery will take place as soon as reasonably possible,
                    depending on the delivery method selected. Delivery times
                    may vary due to unforseen circumstances. Please note that
                    delivery times do not include weekends and bank holidays.
                  </p>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    You will be required to pay delivery charges in addition to
                    the price for the goods you purchase.
                  </p>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    You are required to provide us with a complete and accurate
                    delivery address, including the name of the recipient. We
                    are not liable for the delivery of your goods to the wrong
                    address or wrong person as a result of you providing us with
                    inaccurate or incomplete information.
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "normal",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Right to Cancel and Receive Reimbursement
                    </span>
                    <span style={{ textDecoration: "underline" }}>
                      <br />
                    </span>
                    If you are a customer living in the United Kingdom or the
                    Eurpoean Union you have the right to cancel your contract to
                    purchase goods and services from us within 14 days without
                    giving notice. The cancellation period:
                  </p>
                  <ul
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      listStyle: "disc",
                    }}
                  >
                    <li style={{ marginBottom: "18pt" }} value={1}>
                      <span>
                        Will end 14 days from the date of purchas when you
                        purchased digital content that was not supplied on a
                        tangible medium;
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "18pt" }} value={2}>
                      <span>
                        Will end 14 days from the date of purchase when you
                        purchased a service;
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "18pt" }} value={3}>
                      <span>
                        Will end 14 days from when you receive, or someone you
                        nominate receives, the goods when you purchased good(s)
                        in one order that are all delivered together;
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "18pt" }} value={4}>
                      <span>
                        Will end 14 days from when you receive, or someone you
                        nominate receives, the last good when you purchased
                        goods in one order that are delivered separately; or
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "0pt" }} value={5}>
                      <span>
                        Will end 14 days from when you receive, or someone you
                        nominate receives, the first good when you purchased
                        goods that will be regularly delivered during a defined
                        period of time.
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                  </ul>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    To exercise your right to cancel you must inform us of your
                    decision to cancel within the cancellation period. To
                    cancel, contact us by email at sam@book-a-private.com or by
                    post at 1 Victoria Terrace. You may use a copy of the
                    <span style={{ fontStyle: "italic", fontWeight: "normal" }}>
                      Cancellation Form
                    </span>
                    , found at the end of these Terms and Conditions, but you
                    are not required to do so.
                  </p>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    The right to cancel does not apply to:
                  </p>
                  <ul
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      listStyle: "disc",
                    }}
                  >
                    <li style={{ marginBottom: "18pt" }} value={1}>
                      <span>
                        Goods or services, other than the supply of water, gas,
                        electricity, or district heating, where the price
                        depends upon fluctuations in the financial market that
                        we cannot control and that may occur during the
                        cancellation period;{" "}
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "18pt" }} value={2}>
                      <span>Custom or personalised goods; </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "18pt" }} value={3}>
                      <span>
                        Goods that will deteriorate or expire rapidly;{" "}
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "18pt" }} value={4}>
                      <span>
                        Goods that were unsealed after delivery and are not
                        suitable for return for health and hygiene reasons;{" "}
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "18pt" }} value={5}>
                      <span>
                        Goods that are, according to their nature, inseparably
                        mixed with other items after delivery;{" "}
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "18pt" }} value={6}>
                      <span>
                        Alcoholic beverages where the price has been agreed upon
                        at the time of purchase, delivery of them can only take
                        place after 30 days, and their value is dependent on
                        fluctuations in the market that we cannot control;{" "}
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "18pt" }} value={7}>
                      <span>
                        Services that the customer has requested for the purpose
                        of carrying out urgent repairs or maintenance;{" "}
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "18pt" }} value={8}>
                      <span>
                        Sealed audio or sealed video recordings or sealed
                        computer software that were unsealed after delivery;{" "}
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "18pt" }} value={9}>
                      <span>
                        Newspapers, magazines, or periodicals, except for
                        subscriptions to such publications;{" "}
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "18pt" }} value={10}>
                      <span>Passenger transport services; and</span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                    <li style={{ marginBottom: "0pt" }} value={11}>
                      <span>
                        Accommodation, transport of goods, vehicle rental
                        services, catering, or services related to leisure
                        activities, if the contract includes a specific date or
                        period of performance.
                      </span>
                      <span style={{ color: "#000000" }}>
                        <br />
                      </span>
                    </li>
                  </ul>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ textDecoration: "underline" }}>
                      Effects of Cancellation
                    </span>
                    <br />
                    If you cancel your contract with us and goods have already
                    been sent to you, then you must return the goods to us as
                    soon as possible after informing us of your decision to
                    cancel. You will be responsible for the cost of returning
                    the goods. We will not be responsible for any damage or loss
                    to the goods that occurs before they are returned to us,
                    including while the goods are in transit.
                    <br />
                    <br />
                    If you cancel your contract with us, we will reimburse to
                    you all payments we received from you under the contract,
                    including the costs of delivery, except for any
                    supplementary delivery charges resulting from your choice of
                    a delivery type other than the least expensive type of
                    standard delivery that we offer. Please note that we are
                    permitted by law to reduce your reimbursement to reflect any
                    reduction in the value of the goods that was caused by
                    handling other than what is necessary to establish the
                    nature, characteristics, and functioning of the goods.{" "}
                    <br />
                    <br />
                    We will provide the reimbursement without undue delay and no
                    later than the earlier of 14 days after we receive back from
                    you any goods supplied or 14 days after you provide proof
                    that you have returned the goods. If no goods were supplied,
                    then we will provide the reimbursement no later than 14 days
                    after the day we were informed of your decision to cancel.{" "}
                    <br />
                    <br />
                    If you requested the performance of services begin during
                    the cancellation period, you are required to pay us an
                    amount which is in proportion to what has been performed
                    until you have communicated to us your decision to cancel
                    this contract. We will reimburse to you any amount you have
                    paid above this proportionate payment.
                    <br />
                    <br />
                    If you provide express consent to the supply of digital
                    content during the cancellation period and acknowledge that
                    your right to cancel the contract is lost by the supply of
                    digital content during the cancellation period, you will no
                    longer have a right to cancel the contract.
                  </p>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    We will make the reimbursement using the same form of
                    payment as you used for the initial purchase unless you have
                    expressly agreed otherwise. You will not incur any fees
                    because of the reimbursement.
                  </p>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    This right to cancel and to reimbursement is not affected by
                    any return or refund policy we may have.
                  </p>
                </div>
                <div>
                  <div>
                    <p
                      style={{
                        lineHeight: "18pt",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman",
                        color: "#000000",
                        textAlign: "left",
                      }}
                    >
                      <span
                        style={{
                          fontStyle: "normal",
                          fontWeight: "bold",
                          textDecoration: "underline",
                        }}
                      >
                        Refunds
                      </span>
                      <br />
                      <span style={{ textDecoration: "underline" }}>
                        Refunds for Goods
                      </span>
                      <br />
                      Refund requests must be made within 14 days after receipt
                      of your goods.
                    </p>
                    <div>
                      <p
                        style={{
                          lineHeight: "18pt",
                          fontSize: "12pt",
                          fontFamily: "Times New Roman",
                          color: "#000000",
                          textAlign: "left",
                        }}
                      >
                        Refunds do not apply to the following goods:
                      </p>
                      <ul
                        style={{
                          lineHeight: "18pt",
                          fontSize: "12pt",
                          fontFamily: "Times New Roman",
                          color: "#000000",
                          listStyle: "disc",
                        }}
                      >
                        <li style={{ marginBottom: "18pt" }} value={1}>
                          <span>Sale Items; and</span>
                          <span style={{ color: "#000000" }}>
                            <br />
                          </span>
                        </li>
                        <li style={{ marginBottom: "0pt" }} value={2}>
                          <span>Bitcoin Purchases.</span>
                          <span style={{ color: "#000000" }}>
                            <br />
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <p
                      style={{
                        lineHeight: "18pt",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman",
                        color: "#000000",
                        textAlign: "left",
                      }}
                    >
                      <span style={{ textDecoration: "underline" }}>
                        Refunds for Services
                      </span>
                      <br />
                      We provide refunds for services sold on our Site as
                      follows:
                    </p>
                    <ul
                      style={{
                        lineHeight: "18pt",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman",
                        color: "#000000",
                        listStyle: "disc",
                      }}
                    >
                      <li style={{ marginBottom: "0pt" }} value={1}>
                        <span>
                          Memberships are refundable up to 50% of outstanding
                          balance. Bitcoin purchases are non refundable.
                        </span>
                        <span style={{ color: "#000000" }}>
                          <br />
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "normal",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Returns
                    </span>
                    <br />
                    Returns can be made in person at the following location(s):
                    At our premises.
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "normal",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Consumer Protection Law
                    </span>
                    <br />
                    Where the
                    <span style={{ fontStyle: "italic", fontWeight: "normal" }}>
                      Sale of Goods and Supply of Services Act 1980
                    </span>
                    , or any other consumer protection legislation in your
                    jurisdiction applies and cannot be excluded, these Terms and
                    Conditions will not limit your legal rights and remedies
                    under that legislation. These Terms and Conditions will be
                    read subject to the mandatory provisions of that
                    legislation. If there is a conflict between these Terms and
                    Conditions and that legislation, the mandatory provisions of
                    the legislation will apply.
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "normal",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Links to Other Websites
                    </span>
                    <span style={{ textDecoration: "underline" }}>
                      <br />
                    </span>
                    Our Site contains links to third party websites or services
                    that we do not own or control. We are not responsible for
                    the content, policies, or practices of any third party
                    website or service linked to on our Site. It is your
                    responsibility to read the terms and conditions and privacy
                    policies of these third party websites before using these
                    sites.
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "normal",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Limitation of Liability
                    </span>
                    <br />
                    book-a-private.com and our directors, officers, agents,
                    employees, subsidiaries, and affiliates will not be liable
                    for any actions, claims, losses, damages, liabilities and
                    expenses including legal fees from your use of the Site.
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "normal",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Indemnity
                    </span>
                    <br />
                    Except where prohibited by law, by using this Site you
                    indemnify and hold harmless book-a-private.com and our
                    directors, officers, agents, employees, subsidiaries, and
                    affiliates from any actions, claims, losses, damages,
                    liabilities and expenses including legal fees arising out of
                    your use of our Site or your violation of these Terms and
                    Conditions.
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "normal",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Applicable Law
                    </span>
                    <br />
                    These Terms and Conditions are governed by the laws of
                    Ireland.
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "normal",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Severability
                    </span>
                    <br />
                    If at any time any of the provisions set forth in these
                    Terms and Conditions are found to be inconsistent or invalid
                    under applicable laws, those provisions will be deemed void
                    and will be removed from these Terms and Conditions. All
                    other provisions will not be affected by the removal and the
                    rest of these Terms and Conditions will still be considered
                    valid.
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "normal",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Changes
                    </span>
                    <br />
                    These Terms and Conditions may be amended from time to time
                    in order to maintain compliance with the law and to reflect
                    any changes to the way we operate our Site and the way we
                    expect users to behave on our Site. We will notify users by
                    email of changes to these Terms and Conditions or post a
                    notice on our Site.
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "normal",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Contact Details
                    </span>
                    <br />
                    Please contact us if you have any questions or concerns. Our
                    contact details are as follows:
                    <br />
                    <br />
                    0851 564894
                    <br />
                    sam@book-a-private.com
                    <br />
                    165 Lower Kilmacud Road,
                  </p>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    You can also contact us through the feedback form available
                    on our Site.
                  </p>
                </div>
                <p
                  style={{
                    lineHeight: "18pt",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman",
                    color: "#000000",
                    textAlign: "right",
                  }}
                >
                  Effective Date: ________ day of ________________, ________
                </p>
                <div>
                  <br className="pageBreak" />
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ fontStyle: "normal", fontWeight: "bold" }}>
                      Cancellation Form
                    </span>
                  </p>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    If you want to cancel your contract of sale with us you may
                    use this form and email or post it back to us at the address
                    below.
                    <br />
                    <br />
                    To: www.book-a-private.com
                    <br />
                    Address: 165 Lower Kilmacud Road,
                    <br />
                    Email: sam@book-a-private.com
                  </p>
                  <p
                    style={{
                      lineHeight: "18pt",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    I hereby give notice that I cancel my contract of sale of
                    the following goods or services:
                    <br />
                    ____________________________________________________________
                    <br />
                    <br />
                    Ordered on: ______________________________________
                    <br />
                    <br />
                    Received on: ______________________________________
                    <br />
                    <br />
                    Customer name: ______________________________________
                    <br />
                    <br />
                    Customer address:
                    ____________________________________________________________________________
                    <br />
                    <br />
                    Signature (only required if you are returning a hardcopy of
                    this form):
                    <br />
                    <br />
                    ______________________________________
                    <br />
                    <br />
                    Date: ______________________________________
                  </p>
                </div>
                <div className="LDCopyright">
                  <p>©2002-2022 LawDepot.com®</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
