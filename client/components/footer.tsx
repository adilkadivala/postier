import Link from "next/link";
import { PlaneTakeoff } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex flex-col md:flex-row gap-y-5 items-center justify-between">
          <Link href="/">
            <span className="flex items-center">
              P
              <span>
                <PlaneTakeoff />
              </span>
              stier
            </span>
          </Link>
          <ul className="flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400">
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
                href="https://www.x.com/adil_kadival"
                className="hover:underline me-4 md:me-6"
                target="_blank"
              >
                X
              </Link>
            </li>
            <li>
              <Link
                href="https://mail.google.com/mail/?view=cm&fs=1&to=adilkadivala560@gmail.com"
                className="hover:underline"
                target="_blank"
              >
                Gmail
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-5 mx-auto border-b-2 border-gray-400/20 dark:border-zinc-50/10 border-dashed" />
        <span className="flex items-center flex-col md:flex-row justify-center gap-5 text-sm text-gray-500 text-center dark:text-gray-400">
          © {currentYear} . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
