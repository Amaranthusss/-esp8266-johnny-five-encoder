import { Button } from 'johnny-five'

import { Button as IButton } from 'johnny-five'
import { IRotaryEncoder } from './rotaryEncoder.interface'

const RotaryEncoder = ({
  pinout,
  holdtime,
  onHold,
  onLeft,
  onRight,
  onPress,
  onRelease,
}: IRotaryEncoder): void => {
  const pinA: IButton = new Button(pinout.a)
  const pinB: IButton = new Button(pinout.b)
  const button: IButton = new Button({ pin: pinout.button, holdtime })

  let stateA: number = 0
  let stateB: number = 0
  let lastEncoded: number = 0

  const updateEncoder = (): void => {
    const MSB: number = stateA
    const LSB: number = stateB
    const encoded: number = (MSB << 1) | LSB
    const sum: number = (lastEncoded << 2) | encoded

    if (sum === 13 || sum === 4 || sum === 2 || sum === 11) onLeft()
    if (sum === 14 || sum === 7 || sum === 1 || sum === 8) onRight()

    lastEncoded = encoded
  }

  const onChange = (pin: 'a' | 'b', nextPinValue: number): void => {
    switch (pin) {
      case 'a':
        stateA = nextPinValue
        break
      case 'b':
        stateB = nextPinValue
        break
    }

    updateEncoder()
  }

  pinA.on('up', (): void => onChange('a', 0))
  pinA.on('down', (): void => onChange('a', 1))
  pinB.on('up', (): void => onChange('b', 0))
  pinB.on('down', (): void => onChange('b', 1))
  button.on('press', (): void => onPress())
  button.on('release', (): void => onRelease())
  button.on('hold', (): void => onHold())
}

export default RotaryEncoder
