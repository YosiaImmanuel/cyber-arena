"use client";

import GlobalStyles from "../../components/GlobalStyles";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";
import GameCategory from "../../components/GameCategory";
import HowToJoin from "../../components/HowToJoin";
import Features from "@/components/Features";
import JoinToAction from "@/components/JoinToAction";

export default function Home() {
    return (
        <>
            <GlobalStyles />
            {/* Vertical accent lines (global background) */}
            <div className="landing-accent-lines">
                <span /><span /><span />
            </div>
            <Navbar />
            <Hero />
            <HowToJoin />            
            <GameCategory />
            <Features />
            <JoinToAction />
            <Footer />
        </>
    );
}