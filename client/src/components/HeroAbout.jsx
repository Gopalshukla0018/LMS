import React from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, ClipboardList, Users } from "lucide-react";

const HeroAbout = () => {
  return (
    <div className="relative z-10 max-w-6xl mt-12">
      <div className="px-4 py-8 bg-gradient-to-r from-white/50 to-transparent rounded-xl backdrop-blur-sm dark:from-black/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold">Why SkillsMittra?</h2>
          <p className="mt-2 text-base text-muted-foreground">
            Learn practical, high-impact skills designed for the modern job
            market — or share your knowledge and earn as an instructor.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-3">
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 text-white bg-indigo-600 rounded-md">
                <Sparkles size={18} />
              </div>
              <div>
                <CardTitle className="text-sm">Learn from Experts</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Courses taught by industry professionals with real-world
                  projects and mentoring.
                </CardDescription>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 text-white bg-green-600 rounded-md">
                <ClipboardList size={18} />
              </div>
              <div>
                <CardTitle className="text-sm">Build Projects</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Hands-on assignments and capstone projects that you can add to
                  your portfolio.
                </CardDescription>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 text-white rounded-md bg-rose-600">
                <Users size={18} />
              </div>
              <div>
                <CardTitle className="text-sm">Earn as an Instructor</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Have knowledge to share? Create courses, reach learners, and
                  earn revenue.
                </CardDescription>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HeroAbout;
