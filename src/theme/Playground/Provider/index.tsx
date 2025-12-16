import { usePrismTheme } from '@docusaurus/theme-common';
import React, { type ReactNode } from 'react';
import { LiveProvider } from 'react-live';
import { transform } from 'sucrase';

type PlaygroundProviderProps = React.ComponentProps<typeof LiveProvider> & {
  code?: string;
  metastring?: string;
  children: ReactNode;
};

const DEFAULT_TRANSFORM_CODE = (code: string) => `${code};`;
const transformTypeScript = (code: string) =>
  transform(code, { transforms: ['typescript', 'jsx'] }).code.trim();

export default function PlaygroundProvider({
  code,
  children,
  ...props
}: PlaygroundProviderProps): ReactNode {
  const prismTheme = usePrismTheme();
  const noInline = props.metastring?.includes('noInline') ?? false;

  return (
    <LiveProvider
      noInline={noInline}
      theme={prismTheme}
      enableTypeScript
      {...props}
      code={code?.replace(/\n$/, '')}
      transformCode={props.transformCode ?? ((value) => DEFAULT_TRANSFORM_CODE(transformTypeScript(value)))}
    >
      {children}
    </LiveProvider>
  );
}
