import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            lightFont: string;
            darkFont: string;
            lightBg: string;
            darkBg: string;
            darkest: string;
        };
    }
}
