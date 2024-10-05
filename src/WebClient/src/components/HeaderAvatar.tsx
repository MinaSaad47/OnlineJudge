import { FragmentType, gql, useFragment } from "@/__codegen__";
import { Auth } from "@/lib/auth";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";

const HeaderAvatar_UserFragment = gql(`
  fragment HeaderAvatar_UserFragment on User {
    id
    userName,
    email
  } 
`);

type HeaderAvatarProps = {
  user: FragmentType<typeof HeaderAvatar_UserFragment>;
};

function HeaderAvatar(props: HeaderAvatarProps) {
  const user = useFragment(HeaderAvatar_UserFragment, props.user);

  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <User
          name={user.userName}
          description={user.email}
          avatarProps={{
            src: `https://ui-avatars.com/api/?name=${user.userName}`,
            as: "button",
            isBordered: true,
          }}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label='Profile Actions' variant='flat'>
        <DropdownItem key='profile' className='gap-2 h-14'>
          <p className='font-semibold'>Signed in as</p>
          <p className='font-semibold'>{user.email}</p>
        </DropdownItem>
        <DropdownItem key='settings'>My Settings</DropdownItem>
        <DropdownItem key='logout' color='danger' onClick={Auth.logout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default HeaderAvatar;
