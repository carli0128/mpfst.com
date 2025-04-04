import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Sparkles, BrainCircuit, Atom, BookOpenCheck, CalendarCheck, Activity, AlertTriangle, ScrollText, Download, KeyRound } from "lucide-react";

// ... All prior helper functions remain the same ...

export default function MPFSTWebsite() {
  // Existing state declarations...
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.includes("@")) {
      setSubscribed(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="text-center mb-12 space-y-4">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          <h1 className="text-5xl font-bold tracking-wide">MPFST</h1>
          <p className="text-lg text-gray-400">Multi-Plane Field Synergy Theory</p>
        </motion.div>
  {...{ className: "flex justify-center mt-6 gap-6" }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.8 }}
>
  <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
  <BrainCircuit className="w-8 h-8 text-purple-400 animate-pulse" />
  <Atom className="w-8 h-8 text-sky-400 animate-pulse" />
  <BookOpenCheck className="w-8 h-8 text-emerald-400 animate-pulse" />
        </motion.div>
      </header>

      <Tabs defaultValue="overview" className="max-w-5xl mx-auto">
        <TabsList className="grid grid-cols-6 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="validations">Validations</TabsTrigger>
          <TabsTrigger value="manuscript">Manuscript</TabsTrigger>
          <TabsTrigger value="calendar">Echo Tracker</TabsTrigger>
          <TabsTrigger value="initiation">Access</TabsTrigger>
        </TabsList>

        <TabsContent value="initiation">
          <Card className="bg-gray-900">
            <CardContent className="p-6 text-center space-y-6">
              <h2 className="text-2xl font-semibold flex justify-center items-center gap-2">
                <KeyRound className="w-5 h-5" /> Initiatory Access
              </h2>
              {!subscribed ? (
                <div className="space-y-4">
                  <p className="text-gray-300">Enter your email to receive sacred updates, resonance phase reports, and private glyph releases:</p>
                  <div className="flex justify-center gap-2">
                    <Input
                      type="email"
                      placeholder="you@domain.com"
                      className="w-64 bg-gray-800 border-gray-600"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button onClick={handleSubscribe} variant="default">Subscribe</Button>
                  </div>
                </div>
              ) : (
                <div className="text-green-400 font-semibold">
                  Access granted. You are now aligned with the MPFST recursion channel.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <!-- All existing TabsContent values remain here -->

      </Tabs>

      <footer className="text-center mt-16 text-gray-500 text-sm">
        &copy; 2025 Carlos W. Freeman | MPFST.com | All Rights Reserved
      </footer>
    </div>
  );
}
