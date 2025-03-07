import {
  ChartPie,
  CloudUpload,
  GripVertical,
  Handshake,
  Lock,
  Repeat2,
} from "lucide-react";
import React from "react";

const Features = () => {
  return (
    <div className="md:py-5 py-10" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 border-b-2 border-dashed">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base/7 font-semibold text-gray-900  dark:text-zinc-200">
            Post For Better Effect
          </h2>
          <p
            className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900
           dark:text-zinc-200  sm:text-5xl lg:text-balance"
          >
            Ai post analysis for better{" "}
            <span className="border-b-2 border-b-indigo-600 dark:border-b-zinc-400 border-dashed">
              marketing
            </span>
          </p>
          <p className="mt-6 text-lg/8 text-gray-900  dark:text-zinc-200">
            Post with the helpof ai and be active with your audience!,{" "}
            <span className="border-b-2 border-b-indigo-600 dark:border-b-zinc-400 border-dashed">
              irrespective
            </span>{" "}
            where are you and what is time now
          </p>
        </div>

        <div className="mx-auto mt-16 w-full sm:mt-20 lg:mt-24 ">
          <dl className="flex flex-wrap flex-col md:flex-row gap-y-16">
            <div className="relative pl-16 w-full md:w-1/2 lg:w-1/3">
              <dt className="text-base/7 font-semibold text-gray-900 dark:text-zinc-200">
                <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                  <CloudUpload className="text-zinc-200" />
                </div>
                Schedule as your time-line
              </dt>
              <dd className="mt-2 text-base/7 text-gray-900 dark:text-zinc-200">
                Easily schedule posts according to your timeline, ensuring
                seamless content delivery.
              </dd>
            </div>
            <div className="relative pl-16 w-full md:w-1/2 lg:w-1/3">
              <dt className="text-base/7 font-semibold text-gray-900 dark:text-zinc-200">
                <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                  <Lock className="text-zinc-200" />
                </div>
                completely secure
              </dt>
              <dd className="mt-2 text-base/7 text-gray-900 dark:text-zinc-200">
                Your data and posts are protected with high-level security and
                encryption.
              </dd>
            </div>
            <div className="relative pl-16 w-full md:w-1/2 lg:w-1/3">
              <dt className="text-base/7 font-semibold text-gray-900 dark:text-zinc-200">
                <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                  <Repeat2 className="text-zinc-200" />
                </div>
                Simple posts queue
              </dt>
              <dd className="mt-2 text-base/7 text-gray-900 dark:text-zinc-200">
                Manage your posts effortlessly with a structured and automated
                queue system.
              </dd>
            </div>
            <div className="relative pl-16 w-full md:w-1/2 lg:w-1/3">
              <dt className="text-base/7 font-semibold text-gray-900 dark:text-zinc-200">
                <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                  <GripVertical className="text-zinc-200" />
                </div>
                post Drag-Drop
              </dt>
              <dd className="mt-2 text-base/7 text-gray-900 dark:text-zinc-200">
                Drag and drop posts with ease for quick reordering and better
                workflow management.
              </dd>
            </div>
            <div className="relative pl-16 w-full md:w-1/2 lg:w-1/3">
              <dt className="text-base/7 font-semibold text-gray-900 dark:text-zinc-200">
                <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                  <ChartPie className="text-zinc-200" />
                </div>
                Analysis on post
              </dt>
              <dd className="mt-2 text-base/7 text-gray-900 dark:text-zinc-200">
                Gain insights into your posts&apos; performance with real-time
                analytics and reports.
              </dd>
            </div>
            <div className="relative pl-16 w-full md:w-1/2 lg:w-1/3">
              <dt className="text-base/7 font-semibold text-gray-900 dark:text-zinc-200">
                <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                  <Handshake className="text-zinc-200" />
                </div>
                simple and user-friendly
              </dt>
              <dd className="mt-2 text-base/7 text-gray-900 dark:text-zinc-200">
                Designed with simplicity in mind, making it easy for anyone to
                use and manage.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
