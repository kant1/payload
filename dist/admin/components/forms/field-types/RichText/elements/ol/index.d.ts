import React from 'react';
import './index.scss';
declare const ol: {
    Button: () => React.JSX.Element;
    Element: ({ attributes, children }: {
        attributes: any;
        children: any;
    }) => React.JSX.Element;
};
export default ol;
