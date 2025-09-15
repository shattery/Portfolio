import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import lineMdMenu from '@iconify-icons/line-md/menu';
import lineMdClose from '@iconify-icons/line-md/close';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden"> {/* Only visible on small screens */}
      <button onClick={toggleMenu} className="p-2 text-textColor focus:outline-none">
        <Icon icon={isOpen ? lineMdClose : lineMdMenu} className="w-8 h-8" />
      </button>

      <div className={`absolute top-full left-0 w-full bg-cardBackground shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen py-4' : 'max-h-0'}`}>
          <ul className="flex flex-col items-center space-y-4">
            <li><a href="#" className="text-textColor hover:text-tertiary text-lg" onClick={toggleMenu}>Home</a></li>
            <li><a href="#" className="text-textColor hover:text-tertiary text-lg" onClick={toggleMenu}>Über uns</a></li>
            <li><a href="#" className="text-textColor hover:text-tertiary text-lg" onClick={toggleMenu}>Kontakt</a></li>
          </ul>
        </div>
    </div>
  );
};

export default MobileNav; 