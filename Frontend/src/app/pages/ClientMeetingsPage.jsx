import React, { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Play, Globe, ShieldCheck, Star } from 'lucide-react';
import { Dialog, DialogContent } from '../components/ui/dialog';
import { PageTransition } from '../components/shared/PageTransition';

const stats = [
  { label: 'Meetings', value: '250+', icon: Star },
  { label: 'Countries', value: '15+', icon: Globe },
  { label: 'Client Trust', value: '100%', icon: ShieldCheck },
];

const meetings = [
  {
    flag: '🇺🇸',
    country: 'USA Client',
    service: 'Website Development',
    date: 'Jul 2026',
    duration: '28 Minutes',
    thumbnail: 'https://img.youtube.com/vi/o399T6jdQaM/maxresdefault.jpg',
    video: 'https://www.youtube.com/embed/o399T6jdQaM?autoplay=1',
  },
  {
    flag: '🇨🇦',
    country: 'Canada Client',
    service: 'SEO Consultation',
    date: 'Aug 2026',
    duration: '35 Minutes',
    thumbnail: 'https://img.youtube.com/vi/o399T6jdQaM/maxresdefault.jpg',
    video: 'https://www.youtube.com/embed/o399T6jdQaM?autoplay=1',
  },
  {
    flag: '🇬🇧',
    country: 'UK Client',
    service: 'Facebook Ads Strategy',
    date: 'Aug 2026',
    duration: '42 Minutes',
    thumbnail: 'https://img.youtube.com/vi/o399T6jdQaM/maxresdefault.jpg',
    video: 'https://www.youtube.com/embed/o399T6jdQaM?autoplay=1',
  },
  {
    flag: '🇦🇺',
    country: 'Australia Client',
    service: 'Ecommerce Store',
    date: 'Jul 2026',
    duration: '31 Minutes',
    thumbnail: 'https://img.youtube.com/vi/o399T6jdQaM/maxresdefault.jpg',
    video: 'https://www.youtube.com/embed/o399T6jdQaM?autoplay=1',
  },
  {
    flag: '🇩🇪',
    country: 'Germany Client',
    service: 'UI/UX Meeting',
    date: 'Jul 2026',
    duration: '29 Minutes',
    thumbnail: 'https://img.youtube.com/vi/o399T6jdQaM/maxresdefault.jpg',
    video: 'https://www.youtube.com/embed/o399T6jdQaM?autoplay=1',
  },
  {
    flag: '🇸🇬',
    country: 'Singapore Client',
    service: 'Business Website',
    date: 'Aug 2026',
    duration: '33 Minutes',
    thumbnail: 'https://img.youtube.com/vi/o399T6jdQaM/maxresdefault.jpg',
    video: 'https://www.youtube.com/embed/o399T6jdQaM?autoplay=1',
  },
];

const ClientMeetingsPage = () => {
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  return (
    <PageTransition>
      <section className="relative overflow-hidden bg-[#0A0F1E] text-white">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#090c14] via-[#0d1220] to-[#0a0f1e]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,139,253,0.12)_0%,transparent_35%),radial-gradient(circle_at_30%_40%,rgba(56,189,248,0.08)_0%,transparent_25%)]" />
        <div className="relative mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-[#93c5fd] shadow-sm mb-6">
              <span className="h-2.5 w-2.5 rounded-full bg-[#93c5fd]" />
              Client Success Stories
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Real Client Meetings.
              <br />
              <span className="text-[#93c5fd]">Real Business Growth.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Watch how we discuss, plan and deliver success for businesses worldwide.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-[2rem] border border-white/10 bg-[#08101f] px-6 py-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1e2b4a] text-[#8ca6ff] mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-3xl font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.28em] text-slate-400">{item.label}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {meetings.map((meeting) => (
              <article key={meeting.country} className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#08101f] shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative overflow-hidden">
                  <img
                    src={meeting.thumbnail}
                    alt={`${meeting.country} meeting`}
                    className="h-64 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/40" />
                  <button
                    type="button"
                    onClick={() => setSelectedMeeting(meeting)}
                    className="absolute inset-0 flex items-center justify-center"
                    aria-label={`Play ${meeting.country} meeting video`}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white shadow-lg transition hover:scale-105">
                      <Play className="h-6 w-6" />
                    </div>
                  </button>
                </div>
                <div className="space-y-5 px-6 py-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 items-center rounded-full bg-white/10 px-3 text-sm font-semibold text-white">
                      {meeting.flag}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{meeting.country}</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{meeting.service}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
                    <div>
                      <p className="font-semibold text-white">{meeting.date}</p>
                      <p className="text-slate-400">DATE</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{meeting.duration}</p>
                      <p className="text-slate-400">LENGTH</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#4338CA] px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 transition hover:bg-[#3730A3]"
            >
              See More Client Meetings
              {/* <ArrowRight className="h-4 w-4" /> */}
            </a>
          </div>
        </div>
      </section>

      <Dialog open={!!selectedMeeting} onOpenChange={(open) => { if (!open) setSelectedMeeting(null); }}>
        <DialogContent className="!w-[90vw] !max-w-4xl !max-h-[80vh] !p-0 overflow-hidden bg-[#0A0F1E]">
          <div className="h-[60vh] w-full bg-black">
            {selectedMeeting?.video ? (
              <iframe
                src={selectedMeeting.video}
                title="Client meeting video"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-200">No video available.</div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
};

export default ClientMeetingsPage;
