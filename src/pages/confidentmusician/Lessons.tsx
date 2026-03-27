import { useEffect } from 'react';
import CMLayout from '../../components/confidentmusician/CMLayout';

const GOLD = '#d4af37';

interface LessonCard {
  title: string;
  description: string;
  tags: string[];
  body: string;
}

const lessons: LessonCard[] = [
  {
    title: 'Major Scale Fundamentals',
    description: 'Master the five CAGED positions of the major scale across the neck.',
    tags: ['Theory', 'Scales', 'Beginner–Intermediate'],
    body: 'Understanding the major scale in every position gives you a map of the entire fretboard. We cover the root note locations, position shifts, and how to connect patterns smoothly. Practice with a metronome at 60 BPM before increasing speed.',
  },
  {
    title: 'Chord Voicings for Worship',
    description: 'Open, barre, and partial chord shapes that sit in a band mix.',
    tags: ['Chords', 'Worship', 'Intermediate'],
    body: 'Full six-string chords can clash with a piano or keys player. This lesson covers upper-register voicings (capo shapes, triads on strings 1–3) that cut through without muddying the low end. Includes diagrams for G, C, D, Em, and Am families.',
  },
  {
    title: 'Fingerpicking Patterns',
    description: 'Right-hand independence exercises for alternating bass and melody lines.',
    tags: ['Technique', 'Fingerstyle', 'All Levels'],
    body: 'We start with a basic thumb–index–middle pattern and build to Travis picking. The goal is independence between the thumb (bass strings) and fingers (treble strings). Use a slow tempo (50 BPM) and a simple G chord until the pattern is automatic.',
  },
];

{/* ADD NEW LESSON CARDS HERE */}

export default function CMLessons() {
  useEffect(() => {
    document.title = 'Deeper Dive Lessons | Confident Musician';
  }, []);

  return (
    <CMLayout
      title="Deeper Dive Lessons"
      subtitle="Lesson write-ups that go deeper than your session — take your time with each one."
    >
      <div className="space-y-5">
        {lessons.map(lesson => (
          <div
            key={lesson.title}
            className="rounded-xl border border-white/10 bg-white/5 p-6"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              {lesson.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full border font-medium"
                  style={{ borderColor: 'rgba(212,175,55,0.4)', color: GOLD }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-semibold text-white mb-1">{lesson.title}</h2>
            <p className="text-sm text-gray-400 font-light mb-4">{lesson.description}</p>
            <p className="text-sm text-gray-300 font-light leading-relaxed border-t border-white/10 pt-4">
              {lesson.body}
            </p>
            <button
              type="button"
              className="mt-5 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-[#0f0f1a]"
              style={{ backgroundColor: GOLD }}
            >
              Read More
            </button>
          </div>
        ))}

        {/* ADD NEW LESSON CARDS HERE */}
      </div>
    </CMLayout>
  );
}
