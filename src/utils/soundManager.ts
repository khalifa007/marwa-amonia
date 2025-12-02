import { Howl } from 'howler';
import { SOUND_CONFIG } from './constants';

export class SoundManager {
  private sounds: Map<string, Howl> = new Map();
  private initialized: boolean = false;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    try {
      // Note: In production, actual sound files should be in /public/sounds/
      // For now, we'll set up the structure without actual files

      this.sounds.set('bubbling', new Howl({
        src: ['/sounds/bubbling.mp3'],
        loop: true,
        volume: SOUND_CONFIG.VOLUME.BUBBLING,
        onloaderror: () => console.warn('Bubbling sound not found'),
      }));

      this.sounds.set('electrical', new Howl({
        src: ['/sounds/electrical.mp3'],
        loop: true,
        volume: SOUND_CONFIG.VOLUME.ELECTRICAL,
        onloaderror: () => console.warn('Electrical sound not found'),
      }));

      this.sounds.set('beep', new Howl({
        src: ['/sounds/beep.mp3'],
        volume: SOUND_CONFIG.VOLUME.BEEP,
        onloaderror: () => console.warn('Beep sound not found'),
      }));

      this.sounds.set('ambient', new Howl({
        src: ['/sounds/ambient.mp3'],
        loop: true,
        volume: SOUND_CONFIG.VOLUME.AMBIENT,
        onloaderror: () => console.warn('Ambient sound not found'),
      }));

      this.sounds.set('success', new Howl({
        src: ['/sounds/success.mp3'],
        volume: SOUND_CONFIG.VOLUME.SUCCESS,
        onloaderror: () => console.warn('Success sound not found'),
      }));

      this.initialized = true;
    } catch (error) {
      console.error('Sound manager initialization failed:', error);
    }
  }

  play(soundName: string): void {
    const sound = this.sounds.get(soundName);
    if (sound && this.initialized) {
      sound.play();
    }
  }

  stop(soundName: string): void {
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.stop();
    }
  }

  pause(soundName: string): void {
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.pause();
    }
  }

  stopAll(): void {
    this.sounds.forEach((sound) => sound.stop());
  }

  setVolume(soundName: string, volume: number): void {
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.volume(volume);
    }
  }

  fadeIn(soundName: string, duration: number = 1000): void {
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.fade(0, sound.volume(), duration);
      sound.play();
    }
  }

  fadeOut(soundName: string, duration: number = 1000): void {
    const sound = this.sounds.get(soundName);
    if (sound) {
      const originalVolume = sound.volume();
      sound.fade(originalVolume, 0, duration);
      setTimeout(() => sound.stop(), duration);
    }
  }
}

// Singleton instance
export const soundManager = new SoundManager();
