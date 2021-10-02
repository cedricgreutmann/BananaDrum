declare interface Note {
  timing: string,
  file: string
}

declare interface PlayableNote {
  realTime: number,
  note: Note,
  played?: boolean
}

declare interface PlayableNoteSource {
  getPlayableNotes(intervalStart: number, intervalEnd: number): PlayableNote[]
}

declare interface Track {
  notes: Note[]
}

declare interface Arrangement {
  timeSignature: string,
  tempo: number,
  tracks: Track[]
}

declare interface TimeConverter {
  convertToRealTime(timing:string): number
}

declare interface NoteStyle {
  file: string,
  audio?: ArrayBuffer
}

declare interface NoteStyleSet {
  [styleId: string]: NoteStyle
}

declare interface Instrument {
  displayName: string,
  noteStyles: NoteStyleSet
}

declare interface InstrumentLibrary {
  [instrumentId: string]: Instrument
}
