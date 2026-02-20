"use client";

import GlobalStyles from "../../components/GlobalStyles";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import FeaturedTournaments from "../../components/FeaturedTournaments";
import HallOfFame from "../../components/HallOfFame";
import Newsletter from "../../components/Sponsor";
import Footer from "../../components/Footer";
import GameCategory from "../../components/GameCategory";
import JoinCTA from "../../components/JoinCTA";

export default function Home() {
    return (
        <>
            <GlobalStyles />
            <Navbar />
            <Hero />
            <FeaturedTournaments />
            <GameCategory />
            <JoinCTA />
            <HallOfFame />
            <Newsletter />
            <Footer />
        </>
    );
}