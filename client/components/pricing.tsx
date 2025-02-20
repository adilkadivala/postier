import { Check } from "lucide-react";
import Link from "next/link";

const Pricing = () => {
  return (
    <div className="relative isolate px-6 lg:px-8 py-10 " id="pricing">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mt-2 font-semibold text-4xl tracking-tight text-balance text-gray-900 dark:text-gray-300">
          Choose the{" "}
          <span className="border-b-2 border-b-indigo-600 dark:border-b-zinc-400 border-dashed">
            right plan
          </span>{" "}
          for you
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center font-medium text-pretty text-gray-900 dark:text-gray-300 text-xl/8">
        Choose an{" "}
        <span className="border-b-2 border-b-indigo-600 dark:border-b-zinc-400 border-dashed">
          affordable plan{" "}
        </span>{" "}
        that&apos;s packed with the best features for engaging your audience,
        creating customer loyalty, and driving sales.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 lg:max-w-6xl lg:grid-cols-3 border-b-2 pb-10 border-dashed">
        <div className="rounded-3xl rounded-t-3xl border border-gray-600 md:border-t-gray-600  md:border-l-gray-600  md:border-b-gray-600 border-dashed mx-5 rounded-b-none p-5 md:p-10 lg:mx-0 lg:rounded-tr-none lg:rounded-bl-3xl">
          <h3
            id="tier-hobby"
            className="text-base/7 text-center font-semibold text-indigo-600"
          >
            Free
          </h3>
          <p className="mt-4 flex items-baseline gap-x-2">
            <span className="text-5xl font-semibold tracking-tight text-gray-900 dark:text-gray-300">
              $0.00
            </span>
            <span className="text-base text-gray-500">up to month</span>
          </p>
          <p className="mt-6 text-base/7 text-center text-gray-900 dark:text-gray-300">
            The perfect plan if you&#039;re just getting started with our
            product.
          </p>
          <ul
            role="list"
            className="mt-8 space-y-3 text-sm/6 text-gray-900 dark:text-gray-300"
          >
            <li className="flex gap-x-3">
              <Check className="text-gray-900 dark:text-indigo-600" />
              25 products
            </li>
            <li className="flex gap-x-3">
              <Check className="text-gray-900 dark:text-indigo-600" />
              Up to 10,000 subscribers
            </li>
            <li className="flex gap-x-3">
              <Check className="text-gray-900 dark:text-indigo-600" />
              Advanced analytics
            </li>
            <li className="flex gap-x-3">
              <Check className="text-gray-900 dark:text-indigo-600" />
              24-hour support response time
            </li>
          </ul>
          <Link
            href="#"
            aria-describedby="tier-hobby"
            className="mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get started today
          </Link>
        </div>
        <div className="relative rounded-3xl bg-indigo-600 shadow-2xl p-10">
          <h3
            id="tier-enterprise"
            className="text-base/7 text-center font-semibold text-indigo-200"
          >
            Elite
          </h3>
          <p className="mt-4 flex items-baseline gap-x-2">
            <span className="text-5xl font-semibold tracking-tight text-white">
              $99
            </span>
            <span className="text-base text-zinc-300">/month</span>
          </p>
          <p className="mt-6 text-base/7 text-center text-zinc-200">
            Dedicated support and infrastructure for your company.
          </p>
          <ul role="list" className="mt-8 space-y-3 text-sm/6 text-gray-300">
            <li className="flex gap-x-3 text-zinc-200">
              <Check className="text-gray-50 dark:text-indigo-300" />
              Unlimited products
            </li>
            <li className="flex gap-x-3 text-zinc-200">
              <Check className="text-gray-50 dark:text-indigo-300" />
              Unlimited subscribers
            </li>
            <li className="flex gap-x-3 text-zinc-200">
              <Check className="text-gray-50 dark:text-indigo-300" />
              Advanced analytics
            </li>
            <li className="flex gap-x-3 text-zinc-200">
              <Check className="text-gray-50 dark:text-indigo-300" />
              Dedicated support representative
            </li>
            <li className="flex gap-x-3 text-zinc-200">
              <Check className="text-gray-50 dark:text-indigo-300" />
              Marketing automations
            </li>
            <li className="flex gap-x-3 text-zinc-200">
              <Check className="text-gray-50 dark:text-indigo-300" />
              Custom integrations
            </li>
          </ul>
          <Link
            href="#"
            aria-describedby="tier-hobby"
            className="mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-zinc-200"
          >
            Get started today
          </Link>
        </div>
        <div className="rounded-3xl rounded-t-3xl border border-gray-600 md:border-t-gray-600  md:border-r-gray-600  md:border-b-gray-600 border-dashed mx-5 rounded-b-none p-5 md:p-10 lg:mx-0 lg:rounded-tl-none lg:rounded-br-3xl">
          <h3
            id="tier-hobby"
            className="text-base/7 text-center font-semibold text-indigo-600"
          >
            Custome
          </h3>
          <p className="mt-4 flex items-baseline gap-x-2">
            <span className="text-5xl font-semibold tracking-tight text-gray-900 dark:text-gray-300">
              $59
            </span>
            <span className="text-base text-gray-500">/month</span>
          </p>
          <p className="mt-6 text-base/7 text-center text-gray-900 dark:text-gray-300">
            The perfect plan if you&#039;re just getting started with our
            product.
          </p>
          <ul
            role="list"
            className="mt-8 space-y-3 text-sm/6 text-gray-900 dark:text-gray-300"
          >
            <li className="flex gap-x-3">
              <Check className="text-gray-900 dark:text-indigo-600" />
              25 products
            </li>
            <li className="flex gap-x-3">
              <Check className="text-gray-900 dark:text-indigo-600" />
              Up to 10,000 subscribers
            </li>
            <li className="flex gap-x-3">
              <Check className="text-gray-900 dark:text-indigo-600" />
              Advanced analytics
            </li>
            <li className="flex gap-x-3">
              <Check className="text-gray-900 dark:text-indigo-600" />
              24-hour support response time
            </li>
          </ul>
          <Link
            href="#"
            aria-describedby="tier-hobby"
            className="mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get started today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
