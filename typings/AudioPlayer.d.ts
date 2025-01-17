interface AudioPlayer {
  play(): void
  pause(): void
  getTime(): RealTime
}

declare interface AudioEvent {
  realTime: RealTime
  audioBuffer: AudioBuffer
}

declare interface AudioEventSource {
  get(interval:Interval): AudioEvent[]
}
