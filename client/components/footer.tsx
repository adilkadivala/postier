import Link from "next/link";
import { PlaneTakeoff } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="rounded-lg shadow-sm m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/" className="hover:underline">
            <span className="flex items-center">
              P
              <span>
                <PlaneTakeoff />
              </span>
              stier
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link
                href="https://www.github.com/adilkadivala"
                className="hover:underline me-4 md:me-6"
                target="_blank"
              >
                Github
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/adilkadival"
                className="hover:underline me-4 md:me-6"
                target="_blank"
              >
                Linkedin
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:underline me-4 md:me-6"
                target="_blank"
              >
                X
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline" target="_blank">
                Gmail
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6  sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="flex items-center justify-center gap-5 text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {currentYear}{" "}
          <Link href="/" className="hover:underline">
            <span className="flex items-center">
              P
              <span>
                <PlaneTakeoff />
              </span>
              stier™
            </span>
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
