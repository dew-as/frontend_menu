import React, { useState, useEffect } from "react";
import { fetchMenus, fetchMenuItems, addItemToMenu } from "../services/api"; // Import API functions
import MenuItems from "./MenuItem";
import Header from "./Header";
import Footer from "./Footer";

function Menu() {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMenuId, setSelectedMenuId] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(""); // State to handle errors
    const [success, setSuccess] = useState(""); // State to handle success messages

    useEffect(() => {
        const getMenus = async () => {
            try {
                const data = await fetchMenus();
                setMenus(data);
            } catch (error) {
                console.error("Error fetching menus:", error);
            } finally {
                setLoading(false);
            }
        };
        getMenus();
    }, []);

    useEffect(() => {
        const getMenuItems = async () => {
            if (selectedMenuId) {
                try {
                    const data = await fetchMenuItems(selectedMenuId);
                    setMenuItems(data.items);
                } catch (error) {
                    console.error("Error fetching menu items:", error);
                }
            }
        };
        getMenuItems();
    }, [selectedMenuId]);

    const toggleModal = () => setShowModal(!showModal);

    const handleNameChange = (e) => setName(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newItem = { name, price, description };

        try {
            // Add new menu item
            const response = await addItemToMenu(selectedMenuId, newItem);
            setSuccess("Menu item added successfully!"); // Set success message
            setName(""); // Reset form fields
            setPrice("");
            setDescription("");
            setShowModal(false); // Close modal
            // Fetch updated menu items after adding
            await fetchMenuItems(selectedMenuId).then((data) => setMenuItems(data.items));
        } catch (error) {
            setError("Failed to add menu item. Please try again."); // Set error message
            console.error("Error adding menu item:", error);
        }
    };

    const selectedMenu = menus.find((menu) => menu._id === selectedMenuId);

    return (
        <div className="flex flex-col" style={{ backgroundColor: '#111827' }}>
            <div className="w-full">
                <Header setMenus={setMenus} />

                <div className="text-center py-16 text-white">
                    <h3 className="text-3xl font-bold mb-4">MENU</h3>
                    <p>
                        Please take a look at our menu featuring food, drinks, and brunch.
                        If you'd like to place an order,<br /> use the "Order Online" button
                        located below the menu.
                    </p>
                </div>

                <div className="flex justify-center">
                    {loading ? (
                        <div className="text-white">Loading menus...</div>
                    ) : (
                        menus.map((menu) => (
                            <button
                                key={menu.id}
                                className="bg-gray-800 text-white font-bold py-2 px-4 rounded mr-4"
                                onClick={() => setSelectedMenuId(menu._id)}
                            >
                                {menu.name}
                            </button>
                        ))
                    )}
                </div>

                {selectedMenuId && (
                    <div>
                        {/* Display Add Item Button if no items or items already exist */}
                        <div className="flex justify-center">
                            <button
                                onClick={toggleModal}
                                className="text-white bg-gray-700 hover:bg-gray-800 rounded py-2 px-4 mt-4"
                            >
                                {menuItems.length === 0 ? "Add Menu Item for " : "Add Another Item for "} {selectedMenu.name}
                            </button>
                        </div>

                        {menuItems.length === 0 ? (
                            <div className="flex justify-center mt-4">
                                <p className="text-white">No menu items available. Please add some!</p>
                            </div>
                        ) : (
                            <MenuItems menuItems={menuItems} menu={selectedMenu.name} />
                        )}

                        {showModal && (
                            <div
                                id="crud-modal"
                                className="fixed top-0 left-0 right-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
                            >
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md p-4">
                                    <div className="relative">
                                        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Add New Menu Item for {selectedMenu.name}
                                            </h3>
                                            <button
                                                onClick={toggleModal}
                                                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2"
                                            >
                                                <svg
                                                    className="w-3 h-3"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 14 14"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                    />
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                        </div>

                                        <form className="p-4" onSubmit={handleSubmit}>
                                            {error && <p className="text-red-500">{error}</p>}
                                            {success && <p className="text-green-500">{success}</p>}
                                            <div className="grid gap-4 mb-4">
                                                <div>
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                        Item Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        value={name}
                                                        onChange={handleNameChange}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                        placeholder="Item name"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                        Price
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="price"
                                                        id="price"
                                                        value={price}
                                                        onChange={handlePriceChange}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                        placeholder="Price"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-span-2">
                                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                        Description
                                                    </label>
                                                    <textarea
                                                        id="description"
                                                        rows="4"
                                                        value={description}
                                                        onChange={handleDescriptionChange}
                                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Write item description here"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
                                            >
                                                Add Item
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Menu;
