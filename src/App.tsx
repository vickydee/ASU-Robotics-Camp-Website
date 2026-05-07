/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Bot,
  Building2,
  Calendar,
  ChevronRight,
  Clock,
  Cpu,
  DollarSign,
  ExternalLink,
  Facebook,
  FileText,
  GraduationCap,
  HelpCircle,
  HeartHandshake,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Navigation,
  Newspaper,
  Phone,
  Rocket,
  Search,
  ShieldCheck,
  Twitter,
  Users,
  X,
  Zap,
} from 'lucide-react';

// --- Types ---
type View = 'home' | 'program' | 'schedule' | 'faq' | 'contact';

type Tone = 'gold' | 'maroon' | 'dark';

type CampNavItem =
  | { type: 'view'; view: View; label: string }
  | { type: 'external'; href: string; label: string };

interface NavLinkProps {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
}

interface AsuUnitHeaderProps {
  view: View;
  setView: (view: View) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

interface AsuFooterProps {
  setView: (view: View) => void;
}

interface CampProgram {
  title: string;
  audience: string;
  schedule: string;
  description: string;
  highlights: string[];
  tags: string[];
  icon: ReactNode;
  image: string;
  imageAlt: string;
  actionLabel: string;
  actionHref: string;
  tone: Tone;
}

interface FaqItem {
  q: string;
  a: string;
}

const ENROLLMENT_URL = 'https://apps.ideal-logic.com/asureg?key=8SWS-QRX2D_K9KH-5PTF_5e7138eb968d';
const CAMP_WEBSITE_URL = 'https://scai.engineering.asu.edu/summer-camps/';
const SCAI_URL = 'https://scai.engineering.asu.edu/';
const ASU_DIRECTIONS_URL = 'https://www.asu.edu/map/directions.html';
const VALLEY_METRO_URL = 'https://www.valleymetro.org/';
const DR_CHEN_PROFILE_URL = 'https://search.asu.edu/profile/328180';

const ASSETS = {
  hero: '/legacy/images/robotics-camp-legacy-hero.jpg',
  parking: '/legacy/images/brickyard-parking-reference.jpg',
  republicJuly4: '/legacy/images/arizona-republic-july-4-2008.jpg',
  republicJuly10: '/legacy/images/arizona-republic-july-10-2008.jpg',
  teacherTraining: '/legacy/images/k12-teachers-dr-chen-robotics-camp.jpg',
  flyerEnglish: '/legacy/docs/asu-robotics-camp-flyer-english.pdf',
  flyerSpanish: '/legacy/docs/asu-robotics-camp-flyer-spanish.pdf',
};

const CONTACTS = {
  generalPhone: '480.965.3199',
  generalEmail: 'scai.summercamps@asu.edu',
  teacherEmail: 'scai.summercamps@asu.edu',
  accommodationsEmail: 'Carrie.Clemens@asu.edu',
};

const FOOTER_LOGO_URL = 'https://scai.engineering.asu.edu/wp-content/themes/asu-divi/src/img/endorsed-logo/asu_fultonengineering_white.png';
const SUPPORT_ASU_URL = 'https://invest.engineering.asu.edu';

const campNavItems: CampNavItem[] = [
  { type: 'view', view: 'home', label: 'Overview' },
  { type: 'view', view: 'program', label: 'Program' },
  { type: 'view', view: 'schedule', label: 'Schedule and Location' },
  { type: 'view', view: 'faq', label: 'FAQ' },
  { type: 'view', view: 'contact', label: 'Contact' },
  { type: 'external', href: ENROLLMENT_URL, label: 'Register online' },
];

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/SCAIASU', icon: <Facebook size={28} strokeWidth={1.8} /> },
  { label: 'X', href: 'https://twitter.com/SCAI_ASU', icon: <Twitter size={28} strokeWidth={1.8} /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/showcase/school-of-computing-and-augmented-intelligence/?viewAsMember=true', icon: <Linkedin size={28} strokeWidth={1.8} /> },
];

const universityServiceLinks = [
  { label: 'Maps and Locations', href: 'https://www.asu.edu/about/locations-maps' },
  { label: 'Jobs', href: 'https://cfo.asu.edu/applicant' },
  { label: 'Directory', href: 'https://search.asu.edu/?search-tabs=web_dir_faculty_staff' },
  { label: 'Contact ASU', href: 'https://www.asu.edu/about/contact' },
  { label: 'My ASU', href: 'https://my.asu.edu/' },
];

const legalLinks = [
  { label: 'Copyright and Trademark', href: 'https://www.asu.edu/about/copyright-trademark' },
  { label: 'Accessibility', href: 'https://accessibility.asu.edu/report' },
  { label: 'Terms of Use', href: 'https://www.asu.edu/about/terms-of-use' },
  { label: 'Emergency', href: 'https://www.asu.edu/emergency/' },
  { label: 'Privacy', href: 'https://www.asu.edu/about/privacy' },
];

const programs: CampProgram[] = [
  {
    title: '7Up Robot Camp',
    audience: 'Students entering grades 7-8',
    schedule: 'June 1-12, 2026 | 8:15am-4:45pm',
    description:
      'Designed for middle school students. Exceptional and well prepared students entering grade 6 can be considered.',
    highlights: [
      'Alice 3D animation, movie, and game development',
      'LEGO EV3 robot design and construction',
      'EV3 graphical robotics programming',
      'FIRST Lego League-style robotics challenge preparation',
      'Bluetooth remote control and AI maze navigation',
    ],
    tags: ['Alice', 'LEGO EV3', 'FLL', 'AI Maze'],
    icon: <Bot size={24} />,
    image: ASSETS.hero,
    imageAlt: 'Legacy ASU Robotics Camp graphic with LEGO robot',
    actionLabel: 'Enroll in 7Up',
    actionHref: ENROLLMENT_URL,
    tone: 'gold',
  },
  {
    title: '9Up Robot Camp',
    audience: 'Students entering grades 9-12',
    schedule: 'June 1-12, 2026 | 8:15am-4:45pm',
    description:
      'Designed for high school students ready for advanced computing, robotics, web programming, and phone app development.',
    highlights: [
      'Robot construction and visual programming language concepts',
      'Python programming and robotics programming',
      'Web programming in service-oriented computing',
      'Phone app programming and app development',
      'End-of-camp robotics challenge and demonstration',
    ],
    tags: ['Python', 'Robotics', 'Web Apps', 'Phone Apps'],
    icon: <Cpu size={24} />,
    image: ASSETS.republicJuly10,
    imageAlt: 'Arizona Republic coverage of teens robots taking over campus',
    actionLabel: 'Enroll in 9Up',
    actionHref: ENROLLMENT_URL,
    tone: 'maroon',
  },
  {
    title: 'K-12 Teacher Training',
    audience: 'Teachers in computing, robotics, or clubs',
    schedule: 'Runs as a session within 7Up Robot Camp',
    description:
      'A training option for K-12 teachers involved in computing, game programming, or robotics courses and clubs.',
    highlights: [
      'Hands-on experience with classroom robotics activities',
      'Exposure to computing and game programming content',
      'Scholarship support may cover teacher tuition',
      'Principal endorsement letter required for teacher scholarship requests',
    ],
    tags: ['Teachers', 'Computing', 'Robotics Clubs'],
    icon: <GraduationCap size={24} />,
    image: ASSETS.teacherTraining,
    imageAlt: 'K-12 teachers holding LEGO robots with Dr. Yinong Chen at ASU Robotics Camp',
    actionLabel: 'Ask about teacher training',
    actionHref: `mailto:${CONTACTS.teacherEmail}`,
    tone: 'dark',
  },
];

const programTopics7Up = [
  '3D movie and game programming using Alice',
  'Drawing 3D objects using SketchUp or Tinkercad design tools',
  'Creating and delivering PowerPoint presentations',
  'Construction of a LEGO EV3 robot',
  'Robotics programming in the EV3 graphical programming language',
  'FIRST Lego League competition preparation',
  'Bluetooth remote control for EV3 robots',
  'AI maze navigation and end-of-program robotics competition',
];

const programTopics9Up = [
  'Computing fundamentals and the logic behind computing',
  'Career paths in science, engineering, and computing',
  'Advanced presentation development',
  'Visual IoT and robotics programming environments',
  'Virtual and physical robot programming',
  'Bluetooth or Wi-Fi robot control',
  'Web programming and web app development',
  'Smartphone programming and Android phone app development',
];

const sharedSkills = [
  { title: 'Problem Solving', detail: 'Hands-on design decisions with real constraints.', icon: <Zap /> },
  { title: 'Engineering Design', detail: 'Build, test, debug, and iterate like an engineering team.', icon: <Building2 /> },
  { title: 'Logic Thinking', detail: 'Reason about sensors, control flow, and robotics behavior.', icon: <Cpu /> },
  { title: 'Teamwork', detail: 'Group projects, presentation practice, and individual creativity.', icon: <Users /> },
];

const dailySchedule = [
  { time: '8:00am - 8:30am', activity: 'Check in' },
  { time: '8:45am - 10:00am', activity: 'Instructions and hands-on laboratories' },
  { time: '10:00am - 10:15am', activity: 'Break, play, and snack time. Bring your own snack.' },
  { time: '10:15am - 11:30am', activity: 'Instructions and hands-on laboratories' },
  { time: '11:30am - 1:00pm', activity: 'Lunch break and play time. Bring your own lunch or buy lunch on Mill Ave.' },
  { time: '1:00pm - 2:15pm', activity: 'Instructions and hands-on laboratories' },
  { time: '2:15pm - 2:30pm', activity: 'Break, play, and snack time. Bring your own snack.' },
  { time: '2:30pm - 4:15pm', activity: 'Instructions and hands-on laboratories' },
  { time: '4:30pm - 5:00pm', activity: 'Play time and pick up / departure' },
];

const faqItems: FaqItem[] = [
  {
    q: 'How do I know if this program is right for my child?',
    a: '7Up is for students entering grades 7 and 8, with exceptional and well prepared entering grade 6 students considered. 9Up is for students entering grades 9 through 12. Students should be interested in building, programming, robotics challenges, and computing concepts.',
  },
  {
    q: 'Will my child earn college credit?',
    a: 'No. The pre-college summer camps are not offered for college credit, but the programming and engineering exposure connects to topics students may see in college computing courses.',
  },
  {
    q: 'Are the camps educational as well as entertaining?',
    a: 'Yes. The camps combine science, engineering, computing, and robotics concepts with practical projects, team challenges, and a final robotics competition or demonstration.',
  },
  {
    q: 'What are the unique features of ASU Robotics Camps?',
    a: 'The camps grew out of grant-supported ASU robotics education work and use robot construction, robotics programming, web programming, Alice game programming, and phone app programming to teach modern engineering design and computing concepts.',
  },
  {
    q: 'Is there a family event associated with the camp?',
    a: 'A robotics competition and demonstration is organized at the end of the camp. Family and friends are encouraged to attend and support the student teams.',
  },
  {
    q: 'Do students have to attend for the entire duration?',
    a: 'Students are expected to attend the full camp. The material is condensed into a short period, and group projects depend on each team member participating consistently.',
  },
  {
    q: 'What level of supervision is provided?',
    a: 'An ASU faculty member is responsible for the program content and instruction. Teaching assistants support the laboratory and hands-on work during class sessions; lunch-break supervision is excluded.',
  },
  {
    q: 'What happens if there is an illness or emergency?',
    a: 'If a student becomes ill during camp or does not arrive within one hour of the course start time, staff will call the emergency contact number provided during registration.',
  },
  {
    q: 'Are there additional costs?',
    a: 'Lunch is not included in the camp fee. Students may bring lunch or buy lunch nearby on Mill Avenue. Students should also bring their own snacks for break periods.',
  },
  {
    q: 'How do I apply for financial aid?',
    a: 'Scholarships may cover full or partial tuition depending on need, available funds, and number of applicants. Applicants pay the $50 non-refundable processing fee, then submit the scholarship questionnaire and supporting paperwork. Do not submit tax documents that include social security numbers.',
  },
  {
    q: 'Are accommodations available for special needs?',
    a: `Yes. If a child needs an accommodation to participate, contact Carrie Clemens at ${CONTACTS.accommodationsEmail} or ${CONTACTS.generalPhone}. Requests should be received at least 4 weeks before the program starts when possible.`,
  },
  {
    q: 'Whom may I contact with additional questions?',
    a: `For general questions, call ${CONTACTS.generalPhone} or email ${CONTACTS.generalEmail}. For technical questions, contact Dr. Yinong Chen, Camp Director and Instructor.`,
  },
];

const previousCampYears = ['2025', '2024', '2023', '2022', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006'];

// --- Components ---
const NavLink = ({ children, isActive, onClick }: NavLinkProps) => (
  <button
    onClick={onClick}
    className={`asu-main-nav-link ${isActive ? 'asu-main-nav-link-selected' : ''}`}
    aria-current={isActive ? 'page' : undefined}
  >
    {children}
  </button>
);

const SectionTitle = ({ children, subtitle }: { children: ReactNode; subtitle?: string }) => (
  <div className="mb-12">
    {subtitle && <div className="text-asu-maroon font-black text-[10px] uppercase tracking-[0.25em] mb-2">{subtitle}</div>}
    <h2 className="text-4xl font-black text-asu-grey-900 uppercase tracking-tighter leading-none">{children}</h2>
  </div>
);

const ExternalAnchor = ({ href, children, className }: { href: string; children: ReactNode; className: string }) => {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
};

const LegacyImage = ({
  src,
  alt,
  className = '',
  imageClassName = 'object-cover',
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}) => (
  <div className={`relative overflow-hidden rounded-xl border border-asu-grey-100 bg-white shadow-sm ${className}`}>
    <img src={src} alt={alt} className={`h-full w-full ${imageClassName}`} />
  </div>
);

const BulletList = ({ items, dense = false }: { items: string[]; dense?: boolean }) => (
  <ul className={dense ? 'space-y-3' : 'space-y-4'}>
    {items.map((item) => (
      <li key={item} className="flex gap-3 text-sm font-medium leading-relaxed text-asu-grey-600">
        <ArrowRight size={16} className="mt-1 shrink-0 text-asu-gold" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const InfoPill = ({ icon, label, value }: { icon: ReactNode; label: string; value: string }) => (
  <div className="rounded-lg border border-asu-grey-100 bg-white p-4 shadow-sm">
    <div className="mb-3 text-asu-maroon">{icon}</div>
    <div className="text-[10px] font-black uppercase tracking-[0.22em] text-asu-grey-500">{label}</div>
    <div className="mt-1 text-sm font-black text-asu-grey-900">{value}</div>
  </div>
);

const CampCard = ({ program }: { program: CampProgram }) => {
  const toneClass = {
    gold: 'border-asu-gold',
    maroon: 'border-asu-maroon',
    dark: 'border-asu-grey-900',
  }[program.tone];
  const imageClassName = program.image === ASSETS.teacherTraining ? 'object-cover object-center' : 'object-cover object-left-top';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className={`asu-card flex h-full flex-col justify-between group ${toneClass}`}
    >
      <div>
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="text-asu-grey-600 transition-colors group-hover:text-asu-maroon">{program.icon}</div>
          <span className="rounded border border-asu-grey-100 bg-asu-grey-50 px-2 py-1 text-right text-[10px] font-extrabold uppercase tracking-widest text-asu-grey-600">
            {program.audience}
          </span>
        </div>

        <LegacyImage src={program.image} alt={program.imageAlt} className="mb-5 aspect-video" imageClassName={imageClassName} />

        <h3 className="mb-2 text-xl font-bold leading-tight text-asu-grey-900">{program.title}</h3>
        <p className="mb-2 text-xs font-black uppercase tracking-widest text-asu-maroon">{program.schedule}</p>
        <p className="mb-6 text-sm font-medium leading-relaxed text-asu-grey-600">{program.description}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {program.tags.map((tag) => (
            <span key={tag} className="rounded border border-asu-grey-100 bg-asu-grey-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter text-asu-grey-500">
              {tag}
            </span>
          ))}
        </div>

        <BulletList items={program.highlights.slice(0, 3)} dense />
      </div>

      <ExternalAnchor href={program.actionHref} className="mt-8 flex w-full items-center justify-center gap-2 rounded bg-asu-maroon py-3 text-sm font-bold tracking-tight text-white transition-opacity hover:opacity-90">
        {program.actionLabel}
        <ChevronRight size={16} />
      </ExternalAnchor>
    </motion.div>
  );
};

const ContactBlock = ({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) => (
  <div className="rounded-xl border border-asu-grey-100 bg-white p-6 shadow-sm">
    <div className="mb-4 flex items-center gap-3 text-asu-maroon">
      {icon}
      <h3 className="text-lg font-black text-asu-grey-900">{title}</h3>
    </div>
    <div className="space-y-2 text-sm font-medium leading-relaxed text-asu-grey-600">{children}</div>
  </div>
);

// --- Views ---
const HomeView = ({ setView }: { setView: (v: View) => void }) => (
  <>
    <section className="border-b border-asu-grey-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-asu-maroon">Summer 2026 | Tempe, Arizona | Registration open</div>

          <h1 className="mb-8 text-5xl font-black leading-[1.03] tracking-tighter text-asu-grey-900 lg:text-7xl">
            SCAI Robotics Camps <span className="italic tracking-normal text-asu-maroon">2026</span>
          </h1>

          <p className="mb-8 max-w-2xl text-xl leading-relaxed text-asu-grey-600">
            A two-week summer program series for middle school and high school students who intend to pursue science and engineering careers.
          </p>

          <p className="mb-10 max-w-2xl text-base font-medium leading-relaxed text-asu-grey-600">
            Students learn through component-based robot construction, robotics programming, web programming, Alice game programming, and phone app programming. The robots built by students enter a robotics challenge and demonstration at the end of camp.
          </p>

          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            <InfoPill icon={<Calendar size={22} />} label="Dates" value="June 1-12, 2026" />
            <InfoPill icon={<Clock size={22} />} label="Time" value="8:15am-4:45pm" />
            <InfoPill icon={<MapPin size={22} />} label="Location" value="ASU Brickyard" />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <ExternalAnchor href={ENROLLMENT_URL} className="asu-button-primary flex items-center justify-center gap-2 px-8 shadow-lg shadow-asu-maroon/20">
              Register online
              <ExternalLink size={16} />
            </ExternalAnchor>
            <button onClick={() => setView('program')} className="asu-button-outline px-8">
              View program details
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="relative">
          <LegacyImage src={ASSETS.hero} alt="Legacy ASU Robotics Camp web graphic" className="aspect-[4/3] shadow-2xl shadow-asu-maroon/10 lg:aspect-[5/4]" imageClassName="object-cover object-left-top" />
          <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-white/30 bg-white/75 p-4 backdrop-blur-md">
            <div className="mb-1 flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-asu-green" />
              <span className="text-[10px] font-black uppercase tracking-widest text-asu-grey-900">Established in 2006</span>
            </div>
            <p className="text-sm font-bold leading-snug text-asu-grey-900">Administered by the School of Computing and Augmented Intelligence at Arizona State University.</p>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="bg-asu-grey-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <SectionTitle subtitle="2026 camp options">Available Programs</SectionTitle>
          <div className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-asu-green px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            Registration open
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {programs.map((program) => (
            <div key={program.title}>
              <CampCard program={program} />
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionTitle subtitle="What is ASU Summer Robotics Camp?">Built On ASU Robotics Education</SectionTitle>
            <div className="space-y-5 text-base font-medium leading-relaxed text-asu-grey-600">
              <p>
                ASU Robotics Camps were established through a U.S. Department of Education FIPSE Program grant, an Arizona Science Foundation grant, and Intel Education Partnership support.
              </p>
              <p>
                The camps are taught by Dr. Yinong Chen and Dr. Hokeun Kim, assisted by teaching assistants. Dr. Chen led ASU teams to champion titles in the Ultimate Architecture Sumo-Robot Competition and Intel Cup first-prize finishes in 2014, 2016, and 2018.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-asu-maroon p-6 text-white">
                <Award className="mb-4 text-asu-gold" size={28} />
                <h3 className="mb-2 font-black">Competition Driven</h3>
                <p className="text-sm font-medium leading-relaxed text-white/80">Every camp ends with a robotics challenge and demonstration.</p>
              </div>
              <div className="rounded-xl bg-asu-grey-900 p-6 text-white">
                <BookOpen className="mb-4 text-asu-gold" size={28} />
                <h3 className="mb-2 font-black">Faculty Led</h3>
                <p className="text-sm font-medium leading-relaxed text-white/80">Academic oversight comes from ASU computing and robotics faculty.</p>
              </div>
            </div>
          </div>
          <LegacyImage src={ASSETS.teacherTraining} alt="K-12 teachers holding LEGO robots with Dr. Yinong Chen at ASU Robotics Camp" className="min-h-[360px]" imageClassName="object-cover object-center" />
        </div>
      </div>
    </section>

    <section className="border-y border-asu-grey-100 bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-xl bg-asu-grey-900 p-10 text-white">
            <DollarSign className="mb-5 text-asu-gold" size={36} />
            <h3 className="mb-4 text-3xl font-black uppercase tracking-tight">Tuition</h3>
            <p className="mb-6 text-lg font-bold text-white">$900 per camp</p>
            <p className="text-sm font-medium leading-relaxed text-white/75">
              Tuition for either 7Up Camp or 9Up Camp includes a $50 non-refundable processing fee. The program does not offer an ASU employee or student discount in order to keep program costs as low as possible for everyone.
            </p>
          </div>
          <div className="rounded-xl bg-asu-maroon p-10 text-white">
            <HeartHandshake className="mb-5 text-asu-gold" size={36} />
            <h3 className="mb-4 text-3xl font-black uppercase tracking-tight">Scholarships</h3>
            <p className="mb-6 text-lg font-bold text-white">Full or partial tuition support may be available</p>
            <p className="text-sm font-medium leading-relaxed text-white/75">
              Scholarship applications are evaluated one month before camp starts. Seats are guaranteed if the award is approved and the $50 registration fee is received.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-asu-grey-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle subtitle="Camp experience">Media & Legacy Archive</SectionTitle>
        <div className="grid gap-4 md:grid-cols-4">
          <LegacyImage src={ASSETS.republicJuly4} alt="Arizona Republic article: Campers craft with technology" className="min-h-[360px] md:col-span-1 md:row-span-2" imageClassName="object-cover object-top" />
          <LegacyImage src={ASSETS.republicJuly10} alt="Arizona Republic article: Teens robots take over campus" className="min-h-[360px] md:col-span-1 md:row-span-2" imageClassName="object-cover object-top" />
          <div className="rounded-xl bg-asu-maroon p-8 text-white md:col-span-2">
            <Newspaper className="mb-5 text-asu-gold" size={32} />
            <h3 className="mb-4 text-2xl font-black">Featured Coverage</h3>
            <div className="space-y-3">
              <ExternalAnchor href="https://venus.sod.asu.edu/VIPLE/robotic-seeing-eye-dog.mp4" className="flex items-center justify-between border-b border-white/15 pb-3 text-sm font-bold text-white/85 hover:text-white">
                CBS News Video
                <ExternalLink size={15} />
              </ExternalAnchor>
              <ExternalAnchor href="http://vimeo.com/9740048" className="flex items-center justify-between border-b border-white/15 pb-3 text-sm font-bold text-white/85 hover:text-white">
                ASU News Video
                <ExternalLink size={15} />
              </ExternalAnchor>
              <ExternalAnchor href="https://fullcircle.asu.edu/students/robotic-guide-dog-leads-asu-team-first-prize-intel-cup/" className="flex items-center justify-between text-sm font-bold text-white/85 hover:text-white">
                ASU News Article
                <ExternalLink size={15} />
              </ExternalAnchor>
            </div>
          </div>
          <div className="rounded-xl bg-white p-8 shadow-sm md:col-span-2">
            <h3 className="mb-4 text-xl font-black text-asu-grey-900">Previous Camp Years</h3>
            <p className="mb-5 text-sm font-medium leading-relaxed text-asu-grey-600">The legacy site includes previous camp archives and closing ceremony reports from 2006 through 2025.</p>
            <div className="flex flex-wrap gap-2">
              {previousCampYears.map((year) => (
                <span key={year} className="rounded-full bg-asu-grey-50 px-3 py-1 text-[10px] font-black text-asu-grey-600 ring-1 ring-asu-grey-100">
                  {year}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

const ProgramView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-7xl px-6 py-20">
    <SectionTitle subtitle="What students learn">Academic Program</SectionTitle>
    <div className="mb-14 max-w-4xl space-y-5 text-base font-medium leading-relaxed text-asu-grey-600">
      <p>
        The program consists of two camps: 7Up Camp for students entering grades 7 and 8, and 9Up Camp for students entering grades 9, 10, 11, and 12. The two camps use different tools and have different emphases.
      </p>
      <p>
        7Up emphasizes 3D animation, robotics construction, and EV3 programming. 9Up emphasizes visual IoT/robotics programming, web programming, and smartphone app development.
      </p>
    </div>

    <div className="mb-20 grid gap-12 lg:grid-cols-2">
      <div className="rounded-xl border-t-4 border-asu-maroon bg-white p-8 shadow-sm">
        <h3 className="mb-6 flex items-center gap-3 text-2xl font-black">
          <Bot className="text-asu-maroon" /> 7Up Camp Topics
        </h3>
        <BulletList items={programTopics7Up} />
      </div>
      <div className="rounded-xl border-t-4 border-asu-gold bg-white p-8 shadow-sm">
        <h3 className="mb-6 flex items-center gap-3 text-2xl font-black">
          <Cpu className="text-asu-maroon" /> 9Up Camp Topics
        </h3>
        <BulletList items={programTopics9Up} />
      </div>
    </div>

    <SectionTitle subtitle="Core competencies">Skills & Technologies</SectionTitle>
    <div className="grid gap-6 md:grid-cols-4">
      {sharedSkills.map((skill) => (
        <div key={skill.title} className="rounded-xl bg-asu-grey-900 p-6 text-center text-white">
          <div className="mb-4 flex justify-center text-asu-gold">{skill.icon}</div>
          <div className="mb-2 text-sm font-black tracking-tight">{skill.title}</div>
          <p className="text-xs font-medium leading-relaxed text-white/65">{skill.detail}</p>
        </div>
      ))}
    </div>

    <div className="mt-16 grid gap-8 lg:grid-cols-3">
      <div className="asu-card border-asu-maroon lg:col-span-2">
        <h3 className="mb-4 flex items-center gap-3 text-2xl font-black text-asu-grey-900">
          <Rocket className="text-asu-maroon" /> End-of-Camp Challenge
        </h3>
        <p className="text-sm font-medium leading-relaxed text-asu-grey-600">
          A robotics competition and demonstration is organized for participants at the end of camp. Students apply the engineering design process, system development process, hands-on skill, logic reasoning, teamwork, and presentation skills they practice throughout the program.
        </p>
      </div>
      <div className="asu-card border-asu-gold">
        <h3 className="mb-4 flex items-center gap-3 text-2xl font-black text-asu-grey-900">
          <FileText className="text-asu-maroon" /> Flyers
        </h3>
        <div className="space-y-3">
          <ExternalAnchor href={ASSETS.flyerEnglish} className="flex items-center justify-between rounded bg-asu-grey-50 px-4 py-3 text-sm font-black text-asu-maroon hover:bg-asu-grey-100">
            English PDF
            <ExternalLink size={15} />
          </ExternalAnchor>
          <ExternalAnchor href={ASSETS.flyerSpanish} className="flex items-center justify-between rounded bg-asu-grey-50 px-4 py-3 text-sm font-black text-asu-maroon hover:bg-asu-grey-100">
            Spanish PDF
            <ExternalLink size={15} />
          </ExternalAnchor>
        </div>
      </div>
    </div>
  </motion.div>
);

const ScheduleView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-7xl px-6 py-20">
    <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <SectionTitle subtitle="A day in the lab">Daily Schedule</SectionTitle>
        <div className="overflow-hidden rounded-xl border border-asu-grey-100 bg-white shadow-sm">
          {dailySchedule.map((item) => (
            <div key={item.time} className="flex flex-col gap-4 border-b border-asu-grey-100 p-6 transition-colors last:border-b-0 hover:bg-asu-grey-50 sm:flex-row sm:items-center">
              <div className="flex shrink-0 items-center gap-2 text-sm font-black text-asu-maroon sm:w-44">
                <Clock size={16} />
                {item.time}
              </div>
              <div className="font-bold text-asu-grey-900">{item.activity}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionTitle subtitle="Location and parking">ASU Brickyard</SectionTitle>
        <div className="mb-8 rounded-xl bg-asu-maroon p-8 text-white">
          <MapPin className="mb-5 text-asu-gold" size={36} />
          <h3 className="mb-3 text-3xl font-black tracking-tight">Brickyard Engineering Building</h3>
          <p className="mb-4 text-lg font-bold text-white">699 S. Mill Ave, Tempe, AZ 85281</p>
          <p className="text-sm font-medium leading-relaxed text-white/75">
            The building is at the northeast corner of Mill Avenue and East 7th Street. The Brickyard basement parking entrance is on South Myrtle Avenue. Public transportation, including light rail and bus service, is available near Mill Avenue.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[0.75fr_1fr]">
          <LegacyImage src={ASSETS.parking} alt="Legacy Brickyard parking reference map" className="min-h-[280px]" imageClassName="object-cover" />
          <div className="space-y-4">
            <ContactBlock icon={<Navigation size={24} />} title="Directions">
              <p>Use the ASU driving directions page for current routing to Tempe campus.</p>
              <ExternalAnchor href={ASU_DIRECTIONS_URL} className="inline-flex items-center gap-2 font-black text-asu-maroon hover:underline">
                ASU driving directions <ExternalLink size={14} />
              </ExternalAnchor>
            </ContactBlock>
            <ContactBlock icon={<Building2 size={24} />} title="Transit">
              <p>Light rail, bus shuttles, intercampus buses, and ASU Flash/Orbit routes serve the Tempe area.</p>
              <ExternalAnchor href={VALLEY_METRO_URL} className="inline-flex items-center gap-2 font-black text-asu-maroon hover:underline">
                Valley Metro <ExternalLink size={14} />
              </ExternalAnchor>
            </ContactBlock>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const FAQView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-4xl px-6 py-20">
    <SectionTitle subtitle="Common inquiries">Frequently Asked Questions</SectionTitle>
    <div className="space-y-4">
      {faqItems.map((item) => (
        <div key={item.q} className="asu-card">
          <h4 className="mb-4 flex gap-3 font-black text-asu-grey-900">
            <HelpCircle className="shrink-0 text-asu-gold" />
            {item.q}
          </h4>
          <p className="border-l border-asu-grey-100 pl-9 text-sm leading-relaxed text-asu-grey-600">{item.a}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

const ContactView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-7xl px-6 py-20">
    <SectionTitle subtitle="Registration and contacts">Contact</SectionTitle>
    <div className="mb-10 grid gap-6 lg:grid-cols-3">
      <ContactBlock icon={<Calendar size={24} />} title="Registration">
        <p>The camp has fixed capacity. Seats are guaranteed after payment and confirmation. For financial-aid applicants, seats are granted if aid is approved.</p>
        <ExternalAnchor href={ENROLLMENT_URL} className="inline-flex items-center gap-2 font-black text-asu-maroon hover:underline">
          Online enrollment <ExternalLink size={14} />
        </ExternalAnchor>
      </ContactBlock>

      <ContactBlock icon={<Phone size={24} />} title="General Inquiry">
        <p>Call {CONTACTS.generalPhone}</p>
        <p>
          Email <a className="font-black text-asu-maroon hover:underline" href={`mailto:${CONTACTS.generalEmail}`}>{CONTACTS.generalEmail}</a>
        </p>
        <ExternalAnchor href={CAMP_WEBSITE_URL} className="inline-flex items-center gap-2 font-black text-asu-maroon hover:underline">
          SCAI summer camps page <ExternalLink size={14} />
        </ExternalAnchor>
      </ContactBlock>

      <ContactBlock icon={<Mail size={24} />} title="Technical Inquiry">
        <p>Dr. Yinong Chen, Camp Director and Instructor, ASU SCAI.</p>
        <ExternalAnchor href={DR_CHEN_PROFILE_URL} className="inline-flex items-center gap-2 font-black text-asu-maroon hover:underline">
          ASU profile <ExternalLink size={14} />
        </ExternalAnchor>
      </ContactBlock>
    </div>

    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-xl bg-asu-grey-900 p-8 text-white">
        <ShieldCheck className="mb-5 text-asu-gold" size={36} />
        <h3 className="mb-4 text-2xl font-black">Accommodations: Special Needs</h3>
        <p className="mb-4 text-sm font-medium leading-relaxed text-white/75">
          If your child has a disability and needs an accommodation to participate, notify Carrie Clemens at the School of Computing and Augmented Intelligence to discuss your child's needs.
        </p>
        <p className="text-sm font-bold text-white">
          <a href={`mailto:${CONTACTS.accommodationsEmail}`} className="text-asu-gold hover:underline">{CONTACTS.accommodationsEmail}</a> | {CONTACTS.generalPhone}
        </p>
        <p className="mt-4 text-xs font-medium leading-relaxed text-white/60">
          Receiving accommodation requests at least 4 weeks before the program start date provides a reasonable amount of time to review, consider, and meet the request if possible. ASU complies with the Americans with Disabilities Act of 1990 and other applicable federal, state, and local laws.
        </p>
      </div>

      <div className="rounded-xl bg-white p-8 shadow-sm">
        <FileText className="mb-5 text-asu-maroon" size={36} />
        <h3 className="mb-4 text-2xl font-black text-asu-grey-900">Flyers and Resources</h3>
        <p className="mb-6 text-sm font-medium leading-relaxed text-asu-grey-600">The legacy flyers are now served from this site so families do not need access to the old downloaded folder.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <ExternalAnchor href={ASSETS.flyerEnglish} className="flex items-center justify-between rounded-lg bg-asu-grey-50 px-5 py-4 text-sm font-black text-asu-maroon ring-1 ring-asu-grey-100 hover:bg-asu-grey-100">
            PDF Flyer in English
            <ExternalLink size={16} />
          </ExternalAnchor>
          <ExternalAnchor href={ASSETS.flyerSpanish} className="flex items-center justify-between rounded-lg bg-asu-grey-50 px-5 py-4 text-sm font-black text-asu-maroon ring-1 ring-asu-grey-100 hover:bg-asu-grey-100">
            PDF Flyer en espa&ntilde;ol
            <ExternalLink size={16} />
          </ExternalAnchor>
        </div>
        <div className="mt-8 rounded-lg border border-asu-grey-100 bg-asu-grey-50 p-5">
          <h4 className="mb-2 font-black text-asu-grey-900">Teacher training contact</h4>
          <p className="text-sm font-medium text-asu-grey-600">
            Teachers involved in computing, game programming, or robotics courses/clubs may contact <a className="font-black text-asu-maroon hover:underline" href={`mailto:${CONTACTS.teacherEmail}`}>{CONTACTS.teacherEmail}</a>.
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- Header Components ---
const AsuUnitHeader = ({ view, setView, isMobileMenuOpen, setIsMobileMenuOpen }: AsuUnitHeaderProps) => {
  const universalLinks = (
    <>
      <a className="asu-universal-link" href="https://www.asu.edu">ASU Home</a>
      <a className="asu-universal-link" href="https://my.asu.edu">My ASU</a>
      <a className="asu-universal-link" href="https://www.asu.edu/academics/colleges-schools">Colleges and Schools</a>
      <a className="asu-universal-link" href="https://search.asu.edu/search?site=scai.engineering.asu.edu">
        <span>Search</span>
        <Search size={12} aria-hidden="true" />
      </a>
      <a className="asu-universal-link" href="https://weblogin.asu.edu/cas/login">Sign In</a>
    </>
  );

  return (
    <header id="asuHeader" className="asu-emulated-header">
      <div className="asu-universal-nav" data-elastic-exclude="data-elastic-exclude">
        <div className="asu-container-xl">
          <div className="asu-header-top">
            <nav className="asu-universal-links" aria-label="ASU Global">
              {universalLinks}
            </nav>
          </div>
        </div>
      </div>

      <div className="asu-header-main">
        <div className="asu-container-xl">
          <div className="asu-navbar">
            <a href="https://www.asu.edu" className="asu-navbar-brand" title="ASU homepage" aria-label="ASU homepage">
              <img src="https://www.asu.edu/themes/custom/asu_edu/logo.svg" alt="Arizona State University" />
            </a>

            <button
              className="asu-navbar-toggler"
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>

            <div className="asu-expand-title">
              <div className="asu-title">
                <a className="asu-unit-name" href={SCAI_URL} title="School of Computing and Augmented Intelligence home page">
                  School of Computing and Augmented Intelligence
                </a>
                <a
                  className="asu-subunit-name"
                  href="/"
                  title="SCAI Robotics Camps home page"
                  onClick={(event) => {
                    event.preventDefault();
                    setView('home');
                  }}
                >
                  SCAI Robotics Camps
                </a>
              </div>

              <nav className={`asu-primary-nav ${isMobileMenuOpen ? 'asu-primary-nav-open' : ''}`} aria-label="SCAI Robotics Camps">
                <div className="asu-primary-nav-content">
                  <ul className="asu-main-nav-list">
                    {campNavItems.map((item) => (
                      <li className="asu-main-nav-item" key={item.label}>
                        {item.type === 'view' ? (
                          <NavLink isActive={view === item.view} onClick={() => setView(item.view)}>
                            {item.label}
                          </NavLink>
                        ) : (
                          <a href={item.href} className="asu-main-nav-link">
                            {item.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="asu-mobile-universal-links" aria-label="ASU Global links">
                  {universalLinks}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const AsuFooter = ({ setView }: AsuFooterProps) => {
  const goToView = (nextView: View) => {
    setView(nextView);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="asu-site-footer" role="contentinfo">
      <div className="asu-footer-endorsed">
        <div className="asu-footer-container asu-footer-endorsed-row">
          <a className="asu-footer-endorsed-logo" href={SCAI_URL}>
            <img src={FOOTER_LOGO_URL} alt="School of Computing and Augmented Intelligence logo" />
          </a>
          <nav className="asu-footer-social" aria-label="Social Media">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} aria-label={link.label}>
                {link.icon}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="asu-footer-columns">
        <div className="asu-footer-container asu-footer-columns-row">
          <section className="asu-footer-info" aria-labelledby="footer-site-title">
            <h2 id="footer-site-title">SCAI Robotics Camps</h2>
            <p>School of Computing and Augmented Intelligence</p>
            <a className="asu-footer-contact-link" href={`mailto:${CONTACTS.generalEmail}`}>Contact Us</a>
            <a className="asu-footer-support-button" href={SUPPORT_ASU_URL}>Support ASU</a>
          </section>

          <nav className="asu-footer-link-columns" aria-label="SCAI Robotics Camps footer navigation">
            <section>
              <h3>Camp</h3>
              <button type="button" onClick={() => goToView('home')}>Overview</button>
              <button type="button" onClick={() => goToView('program')}>Program</button>
              <button type="button" onClick={() => goToView('schedule')}>Schedule and Location</button>
              <button type="button" onClick={() => goToView('faq')}>FAQ</button>
              <button type="button" onClick={() => goToView('contact')}>Contact</button>
            </section>

            <section>
              <h3>Resources</h3>
              <a href={ENROLLMENT_URL}>Register online</a>
              <a href={ASSETS.flyerEnglish}>PDF flyer in English</a>
              <a href={ASSETS.flyerSpanish}>PDF flyer en espa&ntilde;ol</a>
              <a href={CAMP_WEBSITE_URL}>SCAI summer camps</a>
            </section>

            <section>
              <h3>Contact</h3>
              <a href={`mailto:${CONTACTS.generalEmail}`}>{CONTACTS.generalEmail}</a>
              <a href={`tel:${CONTACTS.generalPhone.replace(/\D/g, '')}`}>{CONTACTS.generalPhone}</a>
              <span>Registration open</span>
            </section>
          </nav>
        </div>
      </div>

      <div className="asu-footer-innovation">
        <div className="asu-footer-container asu-footer-innovation-row">
          <nav aria-label="University Services">
            {universityServiceLinks.map((link) => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </nav>
          <a className="asu-footer-ranking-link" href="https://www.asu.edu/rankings">#1 in the U.S. for innovation</a>
        </div>
      </div>

      <div className="asu-footer-colophon">
        <div className="asu-footer-container">
          <nav aria-label="University Legal and Compliance">
            {legalLinks.map((link) => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
            <button type="button" id="manualConsentoptout">Manage my privacy settings</button>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [view, setView] = useState<View>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [view]);

  const renderView = () => {
    switch (view) {
      case 'program':
        return <ProgramView />;
      case 'schedule':
        return <ScheduleView />;
      case 'faq':
        return <FAQView />;
      case 'contact':
        return <ContactView />;
      default:
        return <HomeView setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-asu-grey-50 font-sans">
      <AsuUnitHeader view={view} setView={setView} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <main>{renderView()}</main>

      <AsuFooter setView={setView} />
    </div>
  );
}
