'use client';

import Hero from "./components/Hero/Hero";
import OrderBlock from "./components/CTA-1/OrderBlock";
import PriceCalculator from "./components/PriceCalculator/PriceCalculator";
import WorkProcess from "./components/WorkProcess/WorkProcess";
import WhyChooseUs from "./components/WhyChooseUs/WhyChooseUs";
import FAQ from "./components/FAQ/FAQ";
import CTA from "./components/CTA-2/CTA";
import LatestWorks from "./components/LatestWorks/LatestWorks";
import Contact from "./components/Contact/Contact";

export default function WebServices() {
    return (
        <main>
            <Hero />
            <PriceCalculator />
            <WorkProcess />
            <OrderBlock />
            <WhyChooseUs />
            <FAQ />
            <CTA />
            <LatestWorks />
            <Contact />
        </main>
    );
}
