import React from "react";

export const UserCircle = ({ color = "#49536E", size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 24.5C19.799 24.5 24.5 19.799 24.5 14C24.5 8.20101 19.799 3.5 14 3.5C8.20101 3.5 3.5 8.20101 3.5 14C3.5 19.799 8.20101 24.5 14 24.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 17.5C16.4162 17.5 18.375 15.5412 18.375 13.125C18.375 10.7088 16.4162 8.75 14 8.75C11.5838 8.75 9.625 10.7088 9.625 13.125C9.625 15.5412 11.5838 17.5 14 17.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.97852 21.8096C7.63685 20.5128 8.64141 19.4237 9.88083 18.663C11.1202 17.9022 12.5461 17.4995 14.0004 17.4995C15.4547 17.4995 16.8805 17.9022 18.12 18.663C19.3594 19.4237 20.3639 20.5128 21.0223 21.8096"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
