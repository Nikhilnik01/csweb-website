const WhyChooseUs = () => {
  const features = [
    {
      icon: "./images/languages.jpg",
      title: "Multiple Languages",
    },
    {
      icon: "./images/secure-payment.jpeg",
      title: "Secure Online Payments",
    },
    {
      icon: "./images/nation-services.jpeg",
      title: "Nationwide Services",
    },
    {
      icon: "./images/discount.svg",
      title: "Group Booking Discounts",
    },
  ];

  return (
    <section className=" bg-white">
      <div className="margin-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Why Choose us?
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto">
            Construction Customer Service is a trusted nationwide provider with
            over 10 years of experience specializing in construction industry
            training and certification services. We facilitate a comprehensive
            range of CITB Tests including the Health, Safety and Environment
            Test for multiple trades, and coordinate essential construction
            training courses such as HSA One Day Course, SSSTS, SMSTS, and
            various other construction qualifications. Our expert team assists
            both individuals and organizations in obtaining the appropriate
            Construction Cards that match their specific roles within the
            construction sector.
          </p>
        </div>

        <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="text-center px-4">
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-28 h-28 mx-auto mb-4"
              />
              <h3 className="font-semibold text-gray-800">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
