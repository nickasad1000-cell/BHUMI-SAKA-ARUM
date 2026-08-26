import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Highlights } from "@/components/highlights";
import { HouseTypes } from "@/components/house-types";
import { Pricelist } from "@/components/pricelist";
import { InstallmentCalculator } from "@/components/calculator";
import { SitePlan } from "@/components/siteplan";
import { Gallery } from "@/components/gallery";
import { LocationSection } from "@/components/location";
import { LeadForm } from "@/components/lead-form";
import { Footer, FloatingWa } from "@/components/footer";
import { getUnits } from "@/lib/supabase";

export const revalidate = 300;

export default async function Home() {
  const units = await getUnits();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <HouseTypes />
        <Pricelist units={units} />
        <InstallmentCalculator />
        <SitePlan />
        <Gallery />
        <LocationSection />
        <LeadForm />
      </main>
      <Footer />
      <FloatingWa />
    </>
  );
}
