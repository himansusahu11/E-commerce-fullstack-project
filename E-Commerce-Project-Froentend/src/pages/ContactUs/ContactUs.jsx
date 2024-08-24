import React from "react";
import ContactUsHero from "../../components/ContactUsHero/ContactUsHero";
import ContactUsSection1 from "../../components/ContactUsSection1/ContactUsSection1";
import CompanyPolicy from "../../components/CompanyPolicy/CompanyPolicy";
import Explore from "../../components/Explore/Explore";
const ContactUs = () => {
  return (
    <div>
      <ContactUsHero />
      <ContactUsSection1 />
      <CompanyPolicy />
      <Explore />
    </div>
  );
};

export default ContactUs;
