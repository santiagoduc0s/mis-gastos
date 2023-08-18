"use client";

const routes = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "About",
    route: "/about",
  },
];

import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarBrand,
  Button,
  ButtonGroup,
} from "@nextui-org/react";
import NextLink from "next/link";

export default function Navigation() {
  return (
    <Navbar
      position="static"
      className="bg-gradient-to-r from-blue-400 to-purple-500"
    >
      <NavbarBrand>
        <p className="font-bold text-inherit text-white">MisGastos</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {routes.map(({ label, route }) => (
          <NavbarItem key={label} isActive>
            <Link
              color="foreground"
              href={route}
              as={NextLink}
              className="text-white"
            >
              {label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
}
