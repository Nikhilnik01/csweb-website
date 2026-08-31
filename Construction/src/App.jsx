// src/App.jsx
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import WhatsAppCallButtons from "./components/sections/WhatsAppCallButtons";
import ScrollToTop from "./utils/ScrollToTop";
import { NavigationDataProvider } from "./context/NavigationDataContext";

import Home from "./pages/home/Home";
import CscsCardsPage from "./pages/cscsCards/CscsCardsPage";
import CscsCardDetail from "./pages/cscsCards/CscsCardDetail";
import CscsCardForm from "./pages/cscsCards/CscsCardForm";
import CitbTest from "./pages/citbTest/CitbTest";
import BulkTestBooking from "./pages/citbTest/BulkTestBooking";
import CoursesPage from "./pages/courses/CoursesPage";
import CourseDetail from "./pages/courses/CourseDetail";
import CourseBooking from "./pages/courses/CourseBooking";
import TrainingPage from "./pages/training/TrainingPage";
import TrainingDetail from "./pages/training/TrainingDetail";
import NvqBookingPage from "./pages/training/NvqBookingPage";
import CpcsCard from "./pages/cpcs/CpcsCard";
import FollowInstruction from "./pages/cpcs/FollowInstruction";
import WhichTest from "./pages/whichTest/WhichTest";
import TestCenter from "./pages/testCenter/TestCenter";
import BlogsPage from "./pages/blogs/BlogsPage";
import BlogDetail from "./pages/blogs/BlogDetail";
import Faqs from "./pages/faq/Faqs";
import ContactUs from "./pages/contact/ContactUs";
import Terms from "./pages/terms/Terms";
import PaymentResponse from "./pages/payment/PaymentResponse";
import TestPaymentResponse from "./pages/payment/TestPaymentResponse";
import CoursePaymentResponse from "./pages/payment/CoursePaymentResponse";
import TrainingPaymentResponse from "./pages/payment/TrainingPaymentResponse";
import CpcsPaymentResponse from "./pages/payment/CpcsPaymentResponse";
import CscsBottomBanner from "./components/sections/CscsCtaBanner";

function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavigationDataProvider>
      <div className="mx-auto flex min-h-screen max-w-[1920px] flex-col">
        <Header />
        <main className="flex-grow">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/cscs-cards" element={<CscsCardsPage />} />
            <Route path="/cscs-cards/:cardId" element={<CscsCardDetail />} />
            <Route path="/cscs-card-form/:cardId" element={<CscsCardForm />} />

            <Route path="/book-citb-test" element={<CitbTest />} />
            <Route path="/book-bulk-citb-test" element={<BulkTestBooking />} />
            <Route path="/which-test" element={<WhichTest />} />
            <Route path="/test-center" element={<TestCenter />} />

            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/course-booking" element={<CourseBooking />} />

            <Route path="/training" element={<TrainingPage />} />
            <Route path="/training/:id" element={<TrainingDetail />} />
            <Route path="/nvq-course-form" element={<NvqBookingPage />} />

            <Route path="/cpcs" element={<CpcsCard />} />
            <Route path="/renewcpcs" element={<FollowInstruction />} />

            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blog/:id" element={<BlogDetail />} />

            {/* SEO Mapped Blog Routes */}
            <Route path="/citb-test-online-for-cscs-card" element={<BlogDetail />} />
            <Route path="/citb-test-booking-guide" element={<BlogDetail />} />
            <Route path="/citb-test-requirements" element={<BlogDetail />} />
            <Route path="/citb-test-for-cscs-card" element={<BlogDetail />} />
            <Route path="/cscs-card-application-guide" element={<BlogDetail />} />
            <Route path="/citb-health-safety-environment-test" element={<BlogDetail />} />
            <Route path="/how-to-pass-citb-test" element={<BlogDetail />} />
            <Route path="/citb-test-faqs" element={<BlogDetail />} />

            <Route path="/faqs" element={<Faqs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/terms" element={<Terms />} />

            <Route path="/response" element={<PaymentResponse />} />
            <Route
              path="/test-payment-response"
              element={<TestPaymentResponse />}
            />
            <Route
              path="/course-payment-response"
              element={<CoursePaymentResponse />}
            />
            <Route
              path="/training-payment-response"
              element={<TrainingPaymentResponse />}
            />
            <Route
              path="/cpcs-payment-response"
              element={<CpcsPaymentResponse />}
            />

          </Routes>
        </main>
        <div className="">
          <CscsBottomBanner />
        </div>
        <Footer />
        <WhatsAppCallButtons phone="03333440036" whatsapp="03333440036" />
      </div>
      </NavigationDataProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;