import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 100 100"
      {...props}
    >
      <defs>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
          `}
        </style>
      </defs>
      <path
        d="M39,26 C37.895,26 37,26.895 37,28 C37,29.105 37.895,30 39,30 L41,30 C41,32.761 38.761,35 36,35 L34,35 C31.239,35 29,32.761 29,30 L29,28 C29,25.239 31.239,23 34,23 L36,23 C38.761,23 41,25.239 41,28 L39,28"
        fill="hsl(var(--primary))"
      />
      <g transform="skewY(-5) skewX(-10) translate(-5, 0)">
        <text
          x="10"
          y="60"
          fontFamily="Anton, sans-serif"
          fontSize="24"
          fontWeight="bold"
          fill="hsl(var(--primary))"
          letterSpacing="-1"
        >
          SILENT
        </text>
        <text
          x="12"
          y="85"
          fontFamily="Anton, sans-serif"
          fontSize="24"
          fontWeight="bold"
          fill="hsl(var(--primary))"
          letterSpacing="-1"
        >
          SPEAKEASY
        </text>
      </g>
    </svg>
  ),
};