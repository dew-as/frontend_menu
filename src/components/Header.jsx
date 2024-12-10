import React, { useState } from 'react';
import { createMenu } from '../services/api'; // Import the createMenu function

const Header = ({ setMenus }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuName, setMenuName] = useState('');
  const [menuDescription, setMenuDescription] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleMenuNameChange = (e) => {
    setMenuName(e.target.value);
  };

  const handleMenuDescriptionChange = (e) => {
    setMenuDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMenu = {
      name: menuName,
      description: menuDescription,
    };

    try {
      const createdMenu = await createMenu(newMenu); // Call the createMenu function from the service
      console.log('Menu created:', createdMenu);
      setMenus((prevMenus) => [...prevMenus, createdMenu]); // Add new menu to the list
      setMenuName(''); // Clear the input fields after successful submission
      setMenuDescription('');
      setIsModalOpen(false); // Close the modal after submission
    } catch (error) {
      console.error('Error creating menu:', error);
    }
  };

  return (
    <div>
      {/* Header section */}
      <header>
        <nav className="w-full bg-gray-800 text-white text-center py-4">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="#" className="flex items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/256/4359/4359922.png"
                className="mr-3 h-6 sm:h-9"
                alt="Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                MenuLists
              </span>
            </a>
            <button
              onClick={toggleMenu}
              className="lg:hidden text-white p-2 rounded-md focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Navigation Links */}
            <div
              className={`lg:flex lg:w-auto lg:order-1 ${isMenuOpen ? 'block' : 'hidden'} w-full`}
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <button
                    onClick={toggleModal}
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Add Menu
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Modal toggle */}
      <button
        data-modal-target="crud-modal"
        data-modal-toggle="crud-modal"
        className="hidden" // Hidden as it will be triggered by Add Menu button
      >
        Toggle modal
      </button>

      {/* Main modal */}
      {isModalOpen && (
        <div
          id="crud-modal"
          className="fixed top-0 left-0 right-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md p-4">
            <div className="relative">
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Menu
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
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Menu
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={menuName}
                      onChange={handleMenuNameChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type menu name"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows="4"
                      value={menuDescription}
                      onChange={handleMenuDescriptionChange}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write product description here"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add new menu
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
