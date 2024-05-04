import React from 'react';

function RightArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="41"
      height="41"
      fill="none"
      viewBox="0 0 41 41"
    >
      <path
        fill="#F3F4E5"
        fillRule="evenodd"
        d="M40.586 20.79L20.6 40.773l-2.284-2.284 16.086-16.086H.616v-3.23h33.787L18.317 3.088 20.6.804l19.985 19.985z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default React.memo(RightArrow);
