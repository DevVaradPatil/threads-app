'use client'
import Link from 'next/link';
import Image from 'next/image';
import { OrganizationSwitcher, SignOutButton, SignedIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

function Topbar() {

  return (
    <nav
      className={`topbar bg-dark-2  py-3 px-6 flex items-center justify-between`}
    >
      <Link href="/" className='flex items-center gap-4 text-light-1 hover:text-primary-500'>
        <Image src="/assets/l71.svg" alt="logo" width={50} height={50} quality={100} objectFit='cover' layout='fit' priority />
        <p className={`text-heading3-bold-logo tracking-wider text-light-1 pacifico-font max-xs:hidden`}>Threads</p>
      </Link>
      <div className='flex items-center gap-1'>
        <div className='md:hidden'>
          <SignedIn>
            <SignOutButton>
              <div className='flex cursor-pointer items-center text-light-1 hover:text-primary-500 mr-2'>
                <Image src="/assets/logout.svg" alt="logout" width={24} height={24} />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher 
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger:
                'py-2 px-4 rounded-lg bg-primary-500 text-light-1 hover:bg-primary-600 hover:text-light-1 focus:bg-primary-600 focus:text-light-1'
            }
          }}
        />
      </div>
    </nav>
  );
}

export default Topbar;
