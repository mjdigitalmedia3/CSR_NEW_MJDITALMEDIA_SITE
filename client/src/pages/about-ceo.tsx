import { User, GraduationCap, Palette, Music, Trees, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutCEO() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              Meet the Founder
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              About the CEO
            </h1>
            <p className="text-xl text-muted-foreground">
              A creative journey from Cleveland to digital innovation
            </p>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Photo */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <img
                src="/assets/mario-ceo.jpg"
                alt="Mario Jackson - CEO"
                className="w-64 h-64 object-cover rounded-2xl shadow-2xl border-4 border-primary/20"
              />
              <div className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                CEO & Founder
              </div>
            </div>
          </div>

          <div className="space-y-12">
            
            {/* Introduction */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Hi, I'm Mario</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I was born and raised in Cleveland, Ohio, and from an early age I found joy in drawing, painting, and all things creative. This passion for the arts shaped who I am today and laid the foundation for my career in visual communication and digital media.
                </p>
              </div>
            </div>

            {/* Education */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Palette className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Early Education & Artistic Foundation</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  My passion for the arts led me to the <strong>Cleveland School of the Arts</strong>, where I studied from 4th through 12th grade. During my time there, I built a strong foundation in the fundamentals of art.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I didn't stop at visual arts—I also pursued <strong>piano as a second major</strong>, developing discipline and creativity that would serve me throughout my career.
                </p>
              </div>
            </div>

            {/* University */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Higher Education & Professional Development</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  After graduating, I continued my creative journey at <strong>Bowling Green State University</strong>, majoring in Visual Communication Technology. There, I developed a strong background in visual media—sharpening my skills in:
                </p>
                <ul className="grid grid-cols-2 gap-3 mb-4">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Graphic Design</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Video Production</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Photography</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Print Media</span>
                  </li>
                </ul>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I later earned my <strong>Master's Degree in Career & Technology Education</strong>, expanding my ability to teach, lead, and inspire others through technology and creativity.
                </p>
              </div>
            </div>

            {/* Current Roles */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Rocket className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">What I Do Today</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Today, I proudly wear a few hats, combining my love for education, nature, and digital innovation:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <Trees className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="font-semibold">Mobile Outreach Naturalist</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        At Cleveland Metroparks, I use technology and hands-on learning to teach Pre-K through 5th grade students about the wonders of nature.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <Rocket className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="font-semibold">CEO & Owner</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        At MJDigitalMedia3, I help businesses grow by generating more leads, more customers, and more revenue through strategic web design, SEO, and digital marketing.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Mission Statement */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8 text-center">
                <Music className="h-12 w-12 text-primary mx-auto mb-4" />
                <blockquote className="text-xl font-medium italic text-foreground">
                  "Every project is an opportunity to blend creativity with strategy, 
                  helping businesses tell their story and reach their full potential."
                </blockquote>
                <p className="mt-4 text-muted-foreground">— Mario, CEO & Founder</p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </div>
  );
}
