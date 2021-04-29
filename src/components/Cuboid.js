import React from 'react'
import {PathLine} from 'react-svg-pathline'
import { dx as dex, dy as dey, cube, flap, skew, mirX, rotR, path, t, o as oPos } from '../calc'
import fl from 'lodash/flow'

// import { Div } from 'glamorous'

const paperSize = 60
const paperRatio = 1/1.4142


// const glueH = 15
const r = 0.7

const Rect = ({ vecs, o }) => (
    <PathLine
        points={fl([o, path])(vecs)} 
        stroke="black" 
        strokeWidth="1"
        fill="none"
        r={0}
    />
)

const Cuboid = ({ l=380, w=100, h=160, al=0, offX=100, offY=200 }) => {
  const dx = dex(h, al), dy = dey(h, al)
  const glueH = Math.min(l, w, h)/3
  const o = oPos([offX, offY])
  return (
  <svg height={`${paperRatio*paperSize}vw`} width={`${paperSize}vw`}  style={{border: '2px solid blue'}}>
    {/* left to right middle */ }
    <Rect o={o} vecs={fl([cube])(h, w)}/>
    <Rect o={o} vecs={fl([cube, t([h, 0])])(l, w)}/>
    <Rect o={o} vecs={fl([cube, t([h + l, 0])])(h, w)}/>
    <Rect o={o} vecs={fl([cube, t([2 * h + l, 0])])(l, w)}/>
    {/* top and bottom pieces */ }
    <Rect o={o} vecs={fl([cube, mirX, skew(al), t([h, 0])])(l, h)}/>
    <Rect o={o} vecs={fl([cube, skew(al), mirX, t([h-dx, w+h-dy])])(l, h)}/>
    {/* glue, top and bottom */ }
    <Rect o={o} vecs={fl([flap(r), mirX, t([h - dx, -h + dy])])(l, glueH)}/>
    <Rect o={o} vecs={fl([flap(r), t([h-dx, w+h-dy])])(l, glueH)}/>
    {/* glue, all to left */ }
    <Rect o={o} vecs={fl([flap(r), rotR, t([0, 0])])(w, glueH)}/>
    <Rect o={o} vecs={fl([flap(r), rotR, skew(al), t([h-dx, -h+dy])])(h, glueH)}/>
    <Rect o={o} vecs={fl([flap(r), rotR, mirX, skew(-al), t([h-dx, w+h-dy])])(h, glueH)}/>
    {/* glue, all to right */ }
    <Rect o={o} vecs={fl([flap(r), mirX, rotR, skew(al), t([h + l-dx, -h+dy])])(h, glueH)}/>
    <Rect o={o} vecs={fl([flap(r), mirX, rotR, mirX, skew(-al), t([h + l-dx, w+h-dy])])(h, glueH)}/>
  </svg>
)}


export const params = {
  length: {
    type: 'integer',
    title: 'Length',
    minimum: 1,
    maximum: 600,
    default: 300
  },
  width: {
    type: 'integer',
    title: 'Width',
    minimum: 1,
    maximum: 400,
    default: 100
  },
  height: {
    type: 'integer',
    title: 'Height',
    minimum: 1,
    maximum: 400,
    default: 150
  },
  skew: {
    type: 'integer',
    title: 'Skew',
    minimum: 0,
    maximum: 80,
    default: 0
  },
  offsetX: {
    type: 'integer',
    title: 'Offset X',
    minimum: -800,
    maximum: 300,
    default: 100
  },
  offsetY: {
    type: 'integer',
    title: 'Offset Y',
    minimum: 0,
    maximum: 600,
    default: 200
  }
}



export default Cuboid
