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
import SeoHead from "../../components/common/SeoHead";
import Blog from "../courses/Blog";

const Home = () => {
  return (
    <>
      <SeoHead
        title="Book Construction Card, Construction Test Online, CITB Health & Safety Test - Constructioncustomerservice.co.uk"
        description="Book your Construction card, Construction test, citb health safety & environment test with constructioncustomerservice.co.uk to get a right Construction Card"
        keywords="CITB test booking, CSCS card application, construction safety test, health and safety test, CITB test centres UK"
      />

      <main className="flex-1">
        <HeroSection id="home" />
        <TestCentreLocation id="find-test-centre" />
        <BookCITBTest id="book-citb-test" />
        <GreenCardApplication id="green-card-application" />
        {/* <KlarnaBanner /> */}
        <WhyChooseUs id="why-choose-us" />

        <Blog />
        <CTBTestCentres id="test-centres" />
        <WhatsAppCallButtons phone="+447856423532" whatsapp="+447856423532" />
      </main>
    </>
  );
};

export default Home;
