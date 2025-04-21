'use client';

import Hero from "./components/Hero/Hero";
import OrderBlock from "./components/OrderBlock/OrderBlock";
import PriceCalculator from "./components/PriceCalculator/PriceCalculator";
import WorkProcess from "./components/WorkProcess/WorkProcess";

export default function WebServices() {
    return (
        <main>
            <Hero />
            <PriceCalculator />
            <WorkProcess />
            <OrderBlock />
        </main>
    );
}
