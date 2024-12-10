import React, { useEffect } from "react";

const MenuItems = ({ menuItems,menu }) => {
    if (!menuItems || menuItems.length === 0) {
        return <div className="text-white text-center">No items available for this menu</div>;
    }

    return (
        <div className="bg-black text-white py-6 px-6" style={{ backgroundColor: '#111827' }}>
            <div className="relative max-w-4xl mx-auto border border-gray-600 p-6">
                {/* Top-left image */}
                <img
                    src="https://cdn-icons-png.flaticon.com/256/4359/4359642.png" 
                    alt="Cocktail Icon"
                    className="absolute -top-4 -left-4 w-20 h-20 object-cover"
                />
                {/* Bottom-right image */}
                <img
                    src="https://cdn-icons-png.flaticon.com/256/9496/9496794.png" 
                    alt="Cocktail Icon"
                    className="absolute -bottom-4 -right-4 w-20 h-20 object-cover"
                />

                {/* Title */}
                <div className="text-center text-2xl font-bold tracking-wide border-b border-gray-600 pb-4">
                    {menu}
                </div>

                {/* Menu Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col border-b border-gray-600 pb-4"
                        >
                            {/* Item Name and Price */}
                            <div className="flex justify-between items-start">
                                <div className="text-lg font-semibold">{item.name}</div>
                                <div className="text-lg font-bold">{item.price}</div>
                            </div>
                            {/* Description */}
                            <div className="text-sm text-gray-400 mt-2">
                                {item.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MenuItems;
