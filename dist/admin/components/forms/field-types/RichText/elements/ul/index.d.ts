import React from 'react';
import './index.scss';
declare const ul: {
    Button: () => React.JSX.Element;
    Element: ({ attributes, children }: {
        attributes: any;
        children: any;
    }) => React.JSX.Element;
};
export default ul;
