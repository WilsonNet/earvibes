import * as Tone from 'tone';
import type { SynthPreset } from '../types';

class AudioService {
  private vangelisSynth: Tone.PolySynth | null = null;
  private jumpSynth: Tone.PolySynth | null = null;
  private pianoSynth: Tone.PolySynth | null = null;

  private reverb: Tone.Reverb | null = null; // Hall for Vangelis/Jump
  private roomReverb: Tone.Reverb | null = null; // Room for Piano
  private delay: Tone.FeedbackDelay | null = null;

  private currentPreset: SynthPreset = 'PIANO';
  private isInitialized: boolean = false;
  private cleanupInterval: NodeJS.Timeout | null = null;

  // Voice management
  private activeVoices: Map<string, number> = new Map();
  private readonly MAX_VOICE_DURATION = 10; // seconds

  private cleanupOldVoices(): void {
    const now = Tone.now();
    for (const [voiceId, startTime] of this.activeVoices.entries()) {
      if (now - startTime > this.MAX_VOICE_DURATION) {
        this.activeVoices.delete(voiceId);
      }
    }
  }

  private clearActiveVoices(): void {
    this.activeVoices.clear();
  }

  public async init(): Promise<void> {
    if (this.isInitialized) return;

    await Tone.start();

    // Set up voice cleanup interval
    this.cleanupInterval = setInterval(() => {
      this.cleanupOldVoices();
    }, 5000); // Clean up every 5 seconds

    // 1. Create Effects Chains with optimized settings

    // Chain A: Optimized Hall Reverb + Delay (For Vangelis, Jump)
    this.reverb = new Tone.Reverb({
      decay: 3.0, // Reduced from 4.5 for less CPU load
      preDelay: 0.1,
      wet: 0.3, // Reduced from 0.4
    }).toDestination();
    await this.reverb.generate();

    this.delay = new Tone.FeedbackDelay({
      delayTime: '8n.', // Dotted 8th note
      feedback: 0.2, // Reduced from 0.25
      wet: 0.1, // Reduced from 0.15
    });
    this.delay.connect(this.reverb);

    // Chain B: Optimized Room Reverb (For Piano)
    this.roomReverb = new Tone.Reverb({
      decay: 1.0, // Reduced from 1.5
      preDelay: 0.01,
      wet: 0.15, // Reduced from 0.2
    }).toDestination();
    await this.roomReverb.generate();

    // 2. VANGELIS Synth (CS-80 Style) - Optimized
    this.vangelisSynth = new Tone.PolySynth(Tone.MonoSynth, {
      volume: -10, // Reduced from -8 to prevent clipping
      oscillator: {
        type: 'fatsawtooth',
        count: 2, // Reduced from 3 for less CPU load
        spread: 20, // Reduced from 25
      },
      envelope: {
        attack: 0.2, // Reduced from 0.3
        decay: 0.2, // Reduced from 0.3
        sustain: 0.6, // Reduced from 0.7
        release: 1.0, // Reduced from 1.5 for better voice management
      },
      filter: {
        Q: 1,
        type: 'lowpass',
        rolloff: -12,
      },
      filterEnvelope: {
        attack: 0.3, // Reduced from 0.4
        decay: 0.3, // Reduced from 0.5
        sustain: 0.4, // Reduced from 0.5
        release: 1.5, // Reduced from 2.0
        baseFrequency: 200, // Increased from 150 for brighter tone
        octaves: 3.0, // Reduced from 3.5
        exponent: 2,
      },
    });
    this.vangelisSynth.maxPolyphony = 8; // Reduced from 12 for better performance
    this.vangelisSynth.connect(this.delay);

    // 3. JUMP Synth (Oberheim OB-X Style) - Further Optimized
    this.jumpSynth = new Tone.PolySynth(Tone.MonoSynth, {
      volume: -12, // Further reduced for headroom
      oscillator: {
        type: 'square', // More CPU efficient than sawtooth
      },
      envelope: {
        attack: 0.005, // Faster attack for punchier response
        decay: 0.15, // Further reduced for quicker voice recycling
        sustain: 0.5, // Balanced sustain
        release: 0.4, // Faster release for better voice management
      },
      filter: {
        Q: 1.5, // Further reduced for CPU efficiency
        type: 'lowpass',
        rolloff: -12, // Reduced from -24 for less CPU load
        frequency: 800, // Fixed starting frequency
      },
      filterEnvelope: {
        attack: 0.01, // Faster filter response
        decay: 0.1, // Quicker filter decay
        sustain: 0.2, // Lower sustain for cleaner sound
        release: 0.5, // Faster filter release
        baseFrequency: 400, // Optimized starting point
        octaves: 2.5, // Reduced for less modulation overhead
        exponent: 1.5, // Smoother filter curve
      },
    });
    this.jumpSynth.maxPolyphony = 8; // Maintain 8 voices as required
    this.jumpSynth.connect(this.delay);

    // 4. PIANO Synth (Classic/Acoustic-ish) - Optimized
    this.pianoSynth = new Tone.PolySynth(Tone.Synth, {
      volume: -8, // Reduced from -5
      oscillator: {
        type: 'triangle',
      },
      envelope: {
        attack: 0.005,
        decay: 2.0, // Reduced from 3.0
        sustain: 0.0,
        release: 0.6, // Reduced from 0.8
      },
    });
    this.pianoSynth.maxPolyphony = 8; // Reduced from 12
    this.pianoSynth.connect(this.roomReverb);

    this.isInitialized = true;
  }

  public dispose(): void {
    // Clear cleanup interval
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }

    // Clear active voices
    this.clearActiveVoices();

    // Dispose synths
    if (this.vangelisSynth) {
      this.vangelisSynth.dispose();
      this.vangelisSynth = null;
    }
    if (this.jumpSynth) {
      this.jumpSynth.dispose();
      this.jumpSynth = null;
    }
    if (this.pianoSynth) {
      this.pianoSynth.dispose();
      this.pianoSynth = null;
    }

    // Dispose effects
    if (this.reverb) {
      this.reverb.dispose();
      this.reverb = null;
    }
    if (this.roomReverb) {
      this.roomReverb.dispose();
      this.roomReverb = null;
    }
    if (this.delay) {
      this.delay.dispose();
      this.delay = null;
    }

    this.isInitialized = false;
  }

  public async resume(): Promise<void> {
    if (Tone.context.state === 'suspended') {
      await Tone.context.resume();
    }
    if (!this.isInitialized) {
      await this.init();
    }
  }

  public setPreset(preset: SynthPreset): void {
    this.currentPreset = preset;
  }

  public getPreset(): SynthPreset {
    return this.currentPreset;
  }

  private getActiveSynth(): Tone.PolySynth | null {
    if (this.currentPreset === 'VANGELIS') return this.vangelisSynth;
    if (this.currentPreset === 'JUMP') return this.jumpSynth;
    if (this.currentPreset === 'PIANO') return this.pianoSynth;
    return this.pianoSynth;
  }

  public async playNotes(notes: string[], duration: number, timeOffset: number = 0): Promise<void> {
    await this.init();

    const synth = this.getActiveSynth();
    if (!synth) return;

    const now = Tone.now();
    const startTime = now + timeOffset;

    // Prevent rapid re-triggering of same notes to avoid cracking
    const voiceId = `${notes.join('-')}-${Math.floor(startTime)}`;
    if (this.activeVoices.has(voiceId)) {
      return; // Skip if already playing
    }

    // Track voice for cleanup
    this.activeVoices.set(voiceId, startTime);

    // Release voice after duration to prevent hanging notes
    setTimeout(
      () => {
        this.activeVoices.delete(voiceId);
      },
      duration * 1000 + 1000
    ); // Add 1 second buffer

    synth.triggerAttackRelease(notes, duration, startTime);
  }

  public async playProgression(notesMatrix: string[][], tempoBPM: number = 80): Promise<void> {
    await this.init();

    const synth = this.getActiveSynth();
    if (!synth) return;

    const beatDuration = 60 / tempoBPM;
    const chordDuration = beatDuration * 2; // Half notes
    const now = Tone.now();

    // Clear any existing active voices for this preset to prevent accumulation
    this.clearActiveVoices();

    // Schedule all chords with voice tracking
    notesMatrix.forEach((chordNotes, index) => {
      const time = now + index * chordDuration;
      const voiceId = `progression-${index}-${time}`;

      // Track voice for cleanup
      this.activeVoices.set(voiceId, time);

      // Trigger the chord
      synth.triggerAttackRelease(chordNotes, chordDuration, time);

      // Clean up voice after chord duration + buffer
      setTimeout(
        () => {
          this.activeVoices.delete(voiceId);
        },
        chordDuration * 1000 + 2000
      ); // 2 second buffer
    });

    // Return a promise that resolves when the progression (plus tail) finishes
    return new Promise<void>((resolve) => {
      const totalTime = notesMatrix.length * chordDuration;
      // Reduced tail times for better performance
      const tailTime = this.currentPreset === 'PIANO' ? 1.0 : 1.5;
      setTimeout(
        () => {
          this.clearActiveVoices(); // Final cleanup
          resolve();
        },
        (totalTime + tailTime) * 1000
      );
    });
  }
}

export const audioService = new AudioService();
