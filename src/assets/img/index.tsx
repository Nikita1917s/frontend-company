import * as React from "react";
import type { SVGProps } from "react";

export const NoPhotoIcon: React.FC<SVGProps<SVGSVGElement>> = ({
  fill = "#DDD",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 340 340"
    role="img"
    aria-label="No profile available"
    {...props}
  >
    <path
      fill={fill}
      d="M169 .5a169 169 0 1 0 2 0zm0 86a76 76 0 1 1-2 0zM57 287q27-35 67-35h92q40 0 67 35a164 164 0 0 1-226 0"
    />
  </svg>
);
