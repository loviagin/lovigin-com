'use client';

import Hero from "./components/Hero/Hero";
import OrderBlock from "./components/OrderBlock/OrderBlock";
import PriceCalculator from "./components/PriceCalculator/PriceCalculator";
import WorkProcess from "./components/WorkProcess/WorkProcess";
import WhyChooseUs from "./components/WhyChooseUs/WhyChooseUs";
import FAQ from "./components/FAQ/FAQ";

export default function WebServices() {
    return (
        <main>
            <Hero />
            <PriceCalculator />
            <WorkProcess />
            <OrderBlock />
            <WhyChooseUs />
            <FAQ />
        </main>
    );
}
