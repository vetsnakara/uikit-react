declare namespace _default {
    let title: string;
    let decorators: ((Story: any) => import("react/jsx-runtime").JSX.Element)[];
    namespace argTypes {
        namespace status {
            let options: string[];
            namespace control {
                let type: string;
            }
        }
        namespace userRole {
            let options_1: string[];
            export { options_1 as options };
            export namespace control_1 {
                let type_1: string;
                export { type_1 as type };
            }
            export { control_1 as control };
        }
        namespace principalType {
            let options_2: string[];
            export { options_2 as options };
            export namespace control_2 {
                let type_2: string;
                export { type_2 as type };
            }
            export { control_2 as control };
        }
        namespace legalEntityPrincipalType {
            let options_3: string[];
            export { options_3 as options };
            export namespace control_3 {
                let type_3: string;
                export { type_3 as type };
            }
            export { control_3 as control };
        }
    }
}
export default _default;
export function Default(args: any): import("react/jsx-runtime").JSX.Element;
export namespace Default {
    namespace args {
        let status_1: string;
        export { status_1 as status };
        let userRole_1: string;
        export { userRole_1 as userRole };
        let principalType_1: string;
        export { principalType_1 as principalType };
        let legalEntityPrincipalType_1: string;
        export { legalEntityPrincipalType_1 as legalEntityPrincipalType };
    }
    namespace parameters {
        namespace msw {
            let handlers: import("msw").RestHandler<import("msw/lib/glossary-de6278a9").M<import("msw/lib/glossary-de6278a9").h>>[];
        }
    }
}
