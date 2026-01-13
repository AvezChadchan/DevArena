"use client";

import Hero from "@/components/dashboard/Hero";
import Stats from "@/components/dashboard/Stats";
import UpcomingContests from "@/components/dashboard/UpcomingContests";
export default function Dashboard() {
    return (
        <div className="space-y-10">
            <Hero />
            <Stats />
            <UpcomingContests />
        </div>
    )
}