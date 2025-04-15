import {
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageHeaderInfo,
  PageIcon,
  PageTitle,
} from "@/components/shared/page-header";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { RiInformationLine } from "@remixicon/react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/about")({
  component: About,
});

function About() {
  return (
    <>
      <PageHeader>
        <PageHeaderContent>
          <SidebarTrigger />
          <PageIcon as={RiInformationLine} />
          <PageHeaderInfo>
            <PageTitle>
              <h1>About</h1>
            </PageTitle>
            <PageDescription className="hidden sm:block">
              A message from the creator of Stride.
            </PageDescription>
          </PageHeaderInfo>
        </PageHeaderContent>
      </PageHeader>

      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="shadow-md rounded-lg bg-white p-6">
          <h2 className="text-2xl mb-4 font-semibold text-gray-900">
            About Stride
          </h2>

          <p className="mb-4 text-gray-700">
            Stride is an application created for the Frontend UI Hackathon 2025,
            hosted by{" "}
            <a
              href="https://outlier.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-base hover:text-primary-dark"
            >
              Outlier AI
            </a>
            . This app focuses solely on the frontend and utilizes mock data,
            aligning with the hackathon's requirements. It was developed in just
            2-3 days, drawing on my existing knowledge, previous projects, and
            the capabilities of AI tools like Windsurf.
          </p>

          <p className="mb-4 text-gray-700">
            If you appreciate my work and would like to express your support or
            have any questions, please feel free to contact me. You can find my
            official website at{" "}
            <a
              href="http://vishaltailor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-base hover:text-primary-dark"
            >
              vishaltailor.com
            </a>
            , where my contact information is available.
          </p>

          <p className="font-medium text-gray-700">
            Thank you!
          </p>
        </div>
      </div>
    </>
  );
}
