/**
 * @file BackToTopButton.tsx - A simple floating button that scrolls the page to the top
 *
 * Import required dependencies:
 * - React and hooks for component functionality
 *
 * Functionality:
 * - This component displays a floating button in the bottom-right corner of the screen
 *   when the user scrolls down more than 300 pixels.
 * - When clicked, it smoothly scrolls the page back to the top.
 */
import React, { useState, useEffect } from 'react';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle button visibility based on scroll position
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll the page to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Add and clean up the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-5 right-5 z-50
            w-12 h-12 rounded-full
            bg-gray-700 text-white
            flex items-center justify-center
            text-xl font-bold
            shadow-md hover:bg-gray-800
            transition-all duration-300 ease-in-out
            focus:outline-none
          "
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
