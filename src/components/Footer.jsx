import React from "react";

const Footer = () => {
    const data = [
        {
            title: "CONNECT WITH US",
            details: [
                { icon: "📞", text: "+91 9567483340" },
                { icon: "✉️", text: "info@deepnetsoft.com" },
            ],
        },
        {
            title: "DEEP NET SOFT",
            logo: "https://image.similarpng.com/very-thumbnail/2021/05/Illustration-of-logo-design-template-on-transparent-background-PNG.png",
            socialIcons: ["🐦", "📘", "📸", "🎥"],
        },
        {
            title: "FIND US",
            details: [
                { icon: "📍", text: "First floor, Geo Infopark, Infopark EXPY, Kakkanad" },
            ],
        },
    ];

    return (
        <>
            <div className="bg-black text-white py-8 px-6" style={{ backgroundColor: '#111827' }}>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="border border-gray-600 p-6 rounded-lg flex flex-col items-center text-center"
                        >
                            <h3 className="text-lg font-bold mb-4">{item.title}</h3>
                            {/* Logo Section */}
                            {item.logo && (
                                <div className="mb-4">
                                    <img
                                        src={item.logo}
                                        alt="Logo"
                                        className="w-12 h-12 mx-auto"
                                    />
                                </div>
                            )}
                            {/* Details Section */}
                            {item.details &&
                                item.details.map((detail, i) => (
                                    <div key={i} className="flex items-center justify-center gap-2 mb-2">
                                        <span className="text-xl">{detail.icon}</span>
                                        <span>{detail.text}</span>
                                    </div>
                                ))}
                            {/* Social Icons */}
                            {item.socialIcons && (
                                <div className="flex gap-4 mt-4">
                                    {item.socialIcons.map((icon, i) => (
                                        <span key={i} className="text-xl">
                                            {icon}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <footer className="w-full bg-gray-800 text-white text-center py-4 mt-8">
                <p>© 2024 Deepnetsoft Solutions. All rights reserved.</p>
                <a href="#terms" className="text-white underline">
                    Terms & Conditions
                </a>
                <span className="mx-2">|</span>
                <a href="#privacy" className="text-white underline">
                    Privacy Policy
                </a>
            </footer>
        </>
    );
};

export default Footer;
