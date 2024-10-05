import { gql } from "@/__codegen__";
import HeaderAvatar from "@/components/HeaderAvatar";
import { useQuery } from "@apollo/client";
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Skeleton,
} from "@nextui-org/react";
import React from "react";
import { useLocation } from "react-router-dom";

const Header_UserQuery = gql(`
  query Header_UserQuery {
    me {
      id
      ... HeaderAvatar_UserFragment
    }
  }
`);

export default function Header() {
  const { data, loading } = useQuery(Header_UserQuery);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const location = useLocation();

  const menuItems = ["Profile", "Problems", "Submissions", "Log Out"];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className='sm:hidden'
        />
        <NavbarBrand>
          <p className='font-bold text-inherit'>ACME</p>
        </NavbarBrand>
      </NavbarContent>

      {/* center content */}
      <NavbarContent className='hidden gap-4 sm:flex' justify='center'>
        <NavbarItem isActive={location.pathname === "/problems"}>
          <Link color='foreground' href='/problems'>
            Problems
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === "/submissions"}>
          <Link href='/submissions'>Submissions</Link>
        </NavbarItem>
      </NavbarContent>

      {/* end content */}
      <NavbarContent justify='end'>
        <Skeleton isLoaded={!loading} className='w-10 h-10 rounded-full' />
        {!loading && data?.me && <HeaderAvatar user={data.me} />}
        {!loading && !data?.me && (
          <>
            <NavbarItem className='hidden lg:flex'>
              <Link href='/login'>Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color='primary'
                href='/register'
                className='text-green-500'
                variant='flat'>
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* mobile menu */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className='w-full'
              href='#'
              size='lg'>
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
