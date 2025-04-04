import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import MotionDiv from "@/components/ui/MotionDiv"; // <-- Must import this!
import {
  Sparkles,
  BrainCircuit,
  Atom,
  BookOpenCheck,
  CalendarCheck,
  Download,
  Key,
} from "lucide-react";

export default function MPFSTWebsite() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.includes("@")) {
      setSubscribed(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* HEADER */}
      <header className="text-center mb-12 space-y-4">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold tracking-wide">MPFST</h1>
          <p className="text-lg text-gray-400">Multi-Plane Field Synergy Theory</p>
        </MotionDiv>

        <MotionDiv
          className="flex justify-center mt-6 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
          <BrainCircuit className="w-8 h-8 text-purple-400 animate-pulse" />
          <Atom className="w-8 h-8 text-sky-400 animate-pulse" />
          <BookOpenCheck className="w-8 h-8 text-emerald-400 animate-pulse" />
        </MotionDiv>
      </header>

      {/* TABS */}
      <Tabs defaultValue="overview" className="max-w-5xl mx-auto">
        <TabsList className="grid grid-cols-6 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="validations">Validations</TabsTrigger>
          <TabsTrigger value="manuscript">Manuscript</TabsTrigger>
          <TabsTrigger value="calendar">Echo Tracker</TabsTrigger>
          <TabsTrigger value="initiation">Access</TabsTrigger>
        </TabsList>

        {/* OVERVIEW */}
        <TabsContent value="overview">
          <Card className="bg-gray-900">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className="text-gray-300">
                [Add your overview content here...]
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PREDICTIONS */}
        <TabsContent value="predictions">
          <Card className="bg-gray-900">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Predictions</h2>
              <p className="text-gray-300">
                [Add your predictions content here...]
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* VALIDATIONS */}
        <TabsContent value="validations">
          <Card className="bg-gray-900">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Validations</h2>
              <p className="text-gray-300">
                [Add your validations content here...]
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MANUSCRIPT */}
        <TabsContent value="manuscript">
          <Card className="bg-gray-900">
            <CardContent className="p-6 text-center space-y-6">
              <h2 className="text-2xl font-semibold flex justify-center items-center gap-2">
                <Download className="w-5 h-5" />
                MPFST Manuscript
              </h2>
              <p className="text-gray-300">
                Click below to download the full manuscript (PDF):
              </p>
              <a
                href="/MPFST_PUBLICATION_MANUSCRIPT-9.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </a>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ECHO TRACKER */}
        <TabsContent value="calendar">
          <Card className="bg-gray-900">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <CalendarCheck className="w-5 h-5" />
                Echo Tracker
              </h2>
              <p className="text-gray-300">
                [Add your calendar/echo tracker content here...]
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* INITIATORY ACCESS */}
        <TabsContent value="initiation">
          <Card className="bg-gray-900">
            <CardContent className="p-6 text-center space-y-6">
              <h2 className="text-2xl font-semibold flex justify-center items-center gap-2">
                <Key className="w-5 h-5" />
                Initiatory Access
              </h2>
              {!subscribed ? (
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Enter your email to receive sacred updates, resonance phase
                    reports, and private glyph releases:
                  </p>
                  <div className="flex justify-center gap-2">
                    <Input
                      type="email"
                      placeholder="you@domain.com"
                      className="w-64 bg-gray-800 border-gray-600"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button onClick={handleSubscribe} variant="default">
                      Subscribe
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-green-400 font-semibold">
                  Access granted. You are now aligned with the MPFST recursion
                  channel.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* FOOTER */}
      <footer className="text-center mt-16 text-gray-500 text-sm">
        &copy; 2025 Carlos W. Freeman | MPFST.com | All Rights Reserved
      </footer>
    </div>
  );
}