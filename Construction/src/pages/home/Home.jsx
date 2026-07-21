// src/pages/home/Home.jsx

import HeroSection from "../../components/sections/HeroSection";
import TestCentreLocation from "../../components/sections/TestCentreLocation";
import CTBTestCentres from "../../components/sections/CTBTestCentres";
import WhyChooseUs from "../../components/sections/WhyChooseUs";
import CourseCards from "../../components/sections/CourseCards";
import BookCITBTest from "../../components/sections/BookCITBTest";
import GreenCardApplication from "../../components/sections/GreenCardApplication";
import KlarnaBanner from "../../components/sections/KlarnaBanner";
import WhatsAppCallButtons from "../../components/sections/WhatsAppCallButtons";
import { Helmet } from "react-helmet-async";
import Blog from "../courses/Blog";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>
          CITB Test Booking | CSCS Card Application - Construction Customer
          Service
        </title>
        <meta
          name="description"
          content="Book your CITB Health, Safety & Environment Test online. Apply for CSCS Cards with over 150 approved test centres across the UK. Fast, secure booking available."
        />
        <meta
          name="keywords"
          content="CITB test booking, CSCS card application, construction safety test, health and safety test, CITB test centres UK"
        />
      </Helmet>

      <main className="flex-1">
        <HeroSection id="home" />
        <TestCentreLocation id="find-test-centre" />
        <BookCITBTest id="book-citb-test" />
        <GreenCardApplication id="green-card-application" />
        {/* <KlarnaBanner /> */}
        <WhyChooseUs id="why-choose-us" />

        <Blog />
        <CTBTestCentres id="test-centres" />
        <WhatsAppCallButtons phone="03333440036" whatsapp="03333440036" />
      </main>
    </>
  );
};

export default Home;
