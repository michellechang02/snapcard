import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";



const Navbar2: React.FC = () => {
  return (
    <Navbar>
      <NavbarBrand>
      <div className="flex items-center space-x-4 hover:scale-105 transition-transform duration-300">
      <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z" fill="#fbdba7"/>
<path d="M11.5 17.25C11.5 17.61 11.14 17.85 10.81 17.71C9.6 17.19 8.02 16.71 6.92 16.57L6.73 16.55C6.12 16.47 5.62 15.9 5.62 15.28V7.58C5.62 6.81 6.24 6.24 7 6.3C8.25 6.4 10.1 7 11.26 7.66C11.42 7.75 11.5 7.92 11.5 8.09V17.25Z" fill="white"/>
<path d="M18.38 15.27C18.38 15.89 17.88 16.46 17.27 16.54L17.06 16.56C15.97 16.71 14.4 17.18 13.19 17.69C12.86 17.83 12.5 17.59 12.5 17.23V8.08C12.5 7.9 12.59 7.73 12.75 7.64C13.91 6.99 15.72 6.41 16.95 6.3H16.99C17.76 6.3 18.38 6.92 18.38 7.69V15.27Z" fill="white"/>
</svg>
      
      <h1
        className="ml-2 font-extrabold font-3xl"
      >
        AutoCard
      </h1>
    </div>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Button as={Link} color="warning" href="/" variant="flat">
            Create
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="warning" href="/cards" variant="flat">
            Review
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Navbar2;