import styled from "styled-components";

type TagType =
  | React.ComponentType<{ className?: string; style?: any }>
  | string;

interface Prop extends React.HTMLAttributes<HTMLDivElement> {
  tag?: TagType;
  className?: string;
  blur: boolean;
}

const _BlurContainer: React.FC<Prop> = ({
  children,
  className,
  tag: Tag = "span"
}) => <Tag className={className}>{children}</Tag>;

export const BlurContainer = styled(_BlurContainer)<Prop>`
  transition: 0.3s ease-in-out;
  will-change: filter;
  ${({ blur }) =>
    blur &&
    `
    & * {
      user-select: none;
    }
  `};
  filter: blur(${({ blur }) => (blur ? 7 : 0)}px);
`;
