import Image from 'next/image'
import Link from 'next/link'
// import { NavButton } from '@/components/NavButton'

export const metadata = {
  title: "Page not found"
}

export default function NotFound() {
  return (
    <div className="px-2 w-full">
      <div className="mx-auto py-4 flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl">Page Not Found</h2>
        <Image
          className="m-0 rounded-xl"
          src="/images/undraw_page_not_found_re_e9o6.svg"
          width={900}
          height={600}
          alt="Page not found"
          priority={true}
          title="Page Not Found"
        />
        {/* <NavButton href='/home' label="Homepage"> */}
        <Link href="/home">Go back home</Link>
        {/* </NavButton> */}
      </div>
    </div>
  )
}
