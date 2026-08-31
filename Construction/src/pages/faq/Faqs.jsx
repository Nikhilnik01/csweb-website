import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import KlarnaBanner from '../../components/sections/KlarnaBanner';
import SeoHead from '../../components/common/SeoHead';

const Faqs = () => {

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const data = [
        {
            title: "What is the CITB test?",
            content: "The CITB Health, Safety and Environment Test is for people applying for a CSCS card or working on a construction site."
        },
        {
            title: "How to book the test?",
            content: "You can book the test through our online portal by filling in your personal details and selecting a location."
        },
        {
            title: "What ID do I need to bring?",
            content: "You must bring valid photo ID such as a passport or UK driving licence on the day of the test."
        },
    ];

    return (
        <>
            <SeoHead
                title="Frequently Asked Questions | Construction Customer Service"
                description="Find answers to common questions about CITB tests, CSCS cards, course bookings, renewals, and refunds."
                keywords="CSCS FAQ, CITB FAQ, construction card questions, help, support"
            />
            {/* header */}
            <div
                className="relative overflow-hidden text-white"
                style={{
                    backgroundImage: "url('/images/page-header-bg-shape.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 z-0 bg-white/80 bg-gradient-to-r from-[#f1f3ff]/70 via-[#f4fef3]/70 to-[#fff3fc]/70"></div>
                <div className="absolute inset-0 bg-white opacity-40"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                        FAQs
                    </h1>
                </div>
            </div>

            {/* text area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* faq 1 */}
                <div className="border border-blue-400 rounded-xl overflow-hidden mb-6">
                    {/* Header (Clickable Line) */}
                    <div
                        onClick={() => setOpen1(!open1)}
                        className="flex justify-between items-center px-4 py-3 cursor-pointer bg-white hover:bg-gray-50"
                    >
                        <span className="font-bold text-lg">How can I book a test?</span>
                        {open1 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>

                    {/* Hidden Content */}
                    {open1 && (
                        <div className="px-4 py-3 bg-gray-50 text-normal">
                            <p className='mb-2'>
                                Booking is extremely quick and easy!
                            </p>
                            <p className='mb-2'>
                                Simply go to the booking page, fill in the form and review/complete your booking.
                            </p>
                            <p className='mb-2'>
                                After completing your booking, confirmation will be sent to you via Email and SMS containing
                                details of your appointment, including date, time and test centre address.
                            </p>
                            <p className='mb-2'>
                                Continue to <Link to="#" className="text-blue-600 hover:underline font-bold">BOOK YOUR TEST
                                </Link>

                            </p>
                            <p className='mb-2'>
                                Still want to email our team? <Link to="#" className="text-blue-600 hover:underline font-bold">Click here.
                                </Link>
                            </p>


                        </div>
                    )}
                </div>

                {/* faq 2 */}
                <div className="border border-blue-400 rounded-xl overflow-hidden mb-6">
                    {/* Header (Clickable Line) */}
                    <div
                        onClick={() => setOpen2(!open2)}
                        className="flex justify-between items-center px-4 py-3 cursor-pointer bg-white hover:bg-gray-50"
                    >
                        <span className="font-bold text-lg">How can I book a test?</span>
                        {open2 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>

                    {/* Hidden Content */}
                    {open2 && (
                        <div className="px-4 py-3 bg-gray-50 text-normal">
                            <p className='mb-2'>
                                Booking is extremely quick and easy!
                            </p>
                            <p className='mb-2'>
                                Simply go to the booking page, fill in the form and review/complete your booking.
                            </p>
                            <p className='mb-2'>
                                After completing your booking, confirmation will be sent to you via Email and SMS containing
                                details of your appointment, including date, time and test centre address.
                            </p>
                            <p className='mb-2'>
                                Continue to <Link to="#" className="text-blue-600 hover:underline font-bold">BOOK YOUR TEST
                                </Link>

                            </p>
                            <p className='mb-2'>
                                Still want to email our team? <Link to="#" className="text-blue-600 hover:underline font-bold">Click here.
                                </Link>
                            </p>


                        </div>
                    )}
                </div>

                <KlarnaBanner />

                {/* faq 3 */}
                <div className="border border-blue-400 rounded-xl overflow-hidden">
                    {/* Header (Clickable Line) */}
                    <div
                        onClick={() => setOpen3(!open3)}
                        className="flex justify-between items-center px-4 py-3 cursor-pointer bg-white hover:bg-gray-50"
                    >
                        <span className="font-bold text-lg">How can I book a test?</span>
                        {open3 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>

                    {/* Hidden Content */}
                    {open3 && (
                        <div className="px-4 py-3 bg-gray-50 text-normal">
                            <p className='mb-2'>
                                Booking is extremely quick and easy!
                            </p>
                            <p className='mb-2'>
                                Simply go to the booking page, fill in the form and review/complete your booking.
                            </p>
                            <p className='mb-2'>
                                After completing your booking, confirmation will be sent to you via Email and SMS containing
                                details of your appointment, including date, time and test centre address.
                            </p>
                            <p className='mb-2'>
                                Continue to <Link to="#" className="text-blue-600 hover:underline font-bold">BOOK YOUR TEST
                                </Link>

                            </p>
                            <p className='mb-2'>
                                Still want to email our team? <Link to="#" className="text-blue-600 hover:underline font-bold">Click here.
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Faqs;
