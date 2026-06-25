import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bloom Valley Nursery | Home" },
      { name: "description", content: "Bloom Valley Nursery provides healthy plants, garden supplies, and friendly advice for every type of gardener." },
      { property: "og:title", content: "Bloom Valley Nursery" },
      { property: "og:description", content: "Healthy plants, garden supplies, and friendly advice." },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/home.html");
  }, []);
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui" }}>
      <p>
        Loading Bloom Valley Nursery… <a href="/home.html">Click here if you are not redirected.</a>
      </p>
    </div>
  );
}
