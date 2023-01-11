import Hero from "../molecules/Hero";
import Layout from "../organisms/Layout";

export function HomePage() {
  return (
    <Layout>
      <div className="h-[80vh]">
        <Hero />
      </div>
    </Layout>
  );
}
