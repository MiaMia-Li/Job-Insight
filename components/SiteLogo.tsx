import Image from "next/image";
import Link from "next/link";

export const SiteLogo = () => (
  <Link href="/">
    <Image src="/Vector.png" height={40} width={150} alt="Logo" />
  </Link>
);
