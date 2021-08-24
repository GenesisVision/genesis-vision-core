import React from "react";
import { ImageQuality } from "utils/gv-api.types";
import { OptionalClickable } from "utils/types";
import ImageBaseElement from "./image-base.element";

export interface IImageProps {
  url: string;
  alt?: string;
  className?: string;
}

export interface IImageBaseProps extends OptionalClickable {
  quality?: ImageQuality;
  title?: string;
  color?: string;
  DefaultImageComponent?: React.ComponentType<any>;
  src?: string;
  alt?: string;
  fullSize?: boolean;
  defaultImage?: string;
  className?: string;
  defaultImageClassName?: string;
}

const _ImageBase: React.FC<IImageBaseProps> = ({
  onClick,
  quality,
  title,
  color,
  DefaultImageComponent,
  src,
  alt,
  defaultImage,
  className,
  defaultImageClassName
}) => {
  return (
    <ImageBaseElement
      onClick={onClick}
      defaultImageClassName={defaultImageClassName}
      defaultImage={defaultImage}
      color={color}
      DefaultImageComponent={DefaultImageComponent}
      title={title}
      alt={alt}
      className={className}
      src={src}
    />
  );
};

const ImageBase = React.memo(_ImageBase);
export default ImageBase;
