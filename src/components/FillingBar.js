import React from 'react';

import Svg, {Rect} from 'react-native-svg';

const FillingBar = props => {
  let totalCount = 100;
  let actualCount = props.count;
  let height = 200;
  let startingY = 2.5;
  if (actualCount < totalCount) {
    height = (actualCount / totalCount) * 200;
    startingY = 200 - height + 2.5;
  }
  return (
    <Svg width="80" height="205">
      <Rect
        x="0"
        y="0"
        width="80"
        height="205"
        rx="10"
        ry="10"
        stroke="#019875"
        strokeWidth="5"
        strokeLinecap="round"
        fill="white"
      />
      <Rect
        x="2.5"
        y={`${startingY}`}
        width="75"
        height={`${height}`}
        rx="5"
        ry="5"
        fill="rgb(191, 216, 52)"
      />
    </Svg>
  );
};

export default FillingBar;
