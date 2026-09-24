// React Router
import {
  createBrowserRouter,
  RouterProvider as ReactRouter,
} from "react-router";

// Types
import type { PageMetaT } from "@/lib/types/page";

// Components
import { App } from "@/app/App.tsx";
import { LandingPage } from "@/app/components/LandingPage";
import { About } from "@/app/components/About";
import { Research } from "@/app/components/Research";
import { Contact } from "@/app/components/Contact";

const home: PageMetaT = {
  title: "Petrichor — Make it Rain",
  description:
    "Petrichor is a small laboratory based in Austin, Texas. Petrichor develops cloud seeding technology for natural resource abundance in Texas.",
};

const about: PageMetaT = {
  title: "Petrichor — About",
  description:
    "A cloud is seeded by various materials in the form of crystalline dust, which nucleate supercooled liquid water and precipitate from the sky.",
};

const research: PageMetaT = {
  title: "Petrichor — Research",
  description:
    "Petrichor research involves decision science software, neural networks, and drones.",
};

const contact: PageMetaT = {
  title: "Petrichor — Contact",
  description:
    "Petrichor works from Austin, Texas. The lab posts its research on X.",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
        handle: home,
      },
      {
        path: "/about",
        element: <About />,
        handle: about,
      },
      {
        path: "/research",
        element: <Research />,
        handle: research,
      },
      {
        path: "/contact",
        element: <Contact />,
        handle: contact,
      },
    ],
  },
]);

export const RouterProvider = () => {
  return <ReactRouter router={router} />;
};
