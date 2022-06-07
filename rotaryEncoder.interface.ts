export interface IRotaryEncoder {
  pinout: {
    a: number
    b: number
    button: number
  }
  holdtime?: number
  onRight(): void
  onLeft(): void
  onPress?(): void
  onRelease?(): void
  onHold?(): void
}
