import { EtherPortClient } from 'etherport-client'
import { Board } from 'johnny-five'
import RotaryEncoder from './rotaryEncoder'

import { Board as IBoard } from 'johnny-five'

//Hardware:
//Board manager: esp8266 v2.7.4
//Board: NodeMCU 1.0 (ESP-12E Module)
//Firmware: Firmata v2.5.8
//Rotary encoder EC12

const board: IBoard = new Board({
  port: new EtherPortClient({
    host: '192.168.8.122',
    port: 3030,
  }),
  repl: false,
})

board.on('ready', (): void => {
  let i: number = 0

  RotaryEncoder({
    pinout: { a: 16, b: 5, button: 4 },
    onRight: (): void => {
      i++
      console.log(i)
    },
    onLeft: (): void => {
      i--
      console.log(i)
    },
    onPress: (): void => {
      console.log('press')
    },
  })
})
