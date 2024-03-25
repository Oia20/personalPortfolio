import React, { Suspense, useRef, useState, useEffect, Fragment } from 'react';
import Media from 'react-media';
import Wide from "./wide"
import Skin from "./skinny"


export default function UI() {
    return (
  <Media queries={{ large: { minWidth: 1000 }, small: { maxWidth: 999, minHeight: 100} }}>
    {/* <Wide /> */}
    {matches => (
            <Fragment>
              {matches.large && <Wide />}
              {matches.small && <Skin />}
            </Fragment>
          )}
   </Media>
    )
}
