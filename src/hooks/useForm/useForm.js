import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import * as yup from "yup";

// todo: schema should be optional
// todo: useCallbacks
// todo: if select:multiple => validate field and create errors on close dropdown (чтобы при выборе отдельных пунктов не перередирвался селект из-за возвожной ошибки валидации)
// todo: focus on first form element initially
// todo: what if control unmounted (see RHF): update refStore, schema etc.
// todo: process mount/unount components (tune state, schema)
// todo: нужна инструкция по добавлению нового контрола, совместимого с useForm
// todo: сделать story useForm со всеми контролами
// todo: how to process disabled fields
// todo: reset single field
// todo: set single field
// todo: validate onBlur flag
// todo: check useForm with outer lib components react-select, react-datepicker
// todo: scroll to first error (+ flat scrollToFirstError, and focus?)
// todo: focus on first error
// todo: ability to add hidden no validate fileds?
// todo: mv to hooks utils
// todo: create getValues to get all form values without rerenders and subscription
// todo: check case with nested data object (not flat)
// todo: flag unregisterOnUnmount
// todo: case of deeply nested components in form (need context?)
// todo: check rerenders and make story for it
// todo: add controls: Range, SelectList (sorting, add, delete,...), ...
// todo: test with File, FileList
// todo: выделить в SB инпуты отдельно
// todo: should have setError in ref? (like setValue, getValue)

function useCallbackWithParam(fn) {
    return useCallback(function factoryFn(param) {
        if (!factoryFn.propFunction) factoryFn.propFunction = {};

        if (!factoryFn.propFunction[param]) {
            factoryFn.propFunction[param] = fn(param);
        }

        return factoryFn.propFunction[param];
    }, []);
}

// !TODO: create TWO refs: mainEl, inputEl
// !TODO: поместить name в ref?

export const useForm = ({ defaultValues = {}, schema } = {}) => {
    // console.log("⚡ useForm:render");

    // todo: rename
    // todo: use useMemo to avoid .current part
    const refStore = useRef({});

    const registerOrder = [];

    // todo: formState should be proxied ???
    // todo: case of error not readed ???
    // todo: set default values to watched fields
    const [formState, setFormState] = useState({
        // submited: ...,
        // dirty: ...,
        errors: {}, //?! defaultErrors ???
        values: {
            ...defaultValues, //!
        },
    });

    useEffect(() => {
        setDefaultValues();
    }, []);

    const setDefaultValues = () => {
        for (const name of Object.keys(refStore.current)) {
            const { setValue } = refStore.current[name];
            setValue?.(defaultValues[name]);
        }
    };

    const validateField = async (name, { shouldUpdateValue = false } = {}) => {
        const { getValue, schema } = refStore.current[name];
        const value = getValue();

        let errorMessage = "";

        try {
            if (schema) {
                const dataObj = { [name]: value };
                const schemaObj = { [name]: schema };

                await yup.object(schemaObj).validate(dataObj, { abortEarly: false });
            }
        } catch ({ message }) {
            errorMessage = message;
        }

        // todo: разобраться с лишним рендером
        // todo: "1" -> "" -> "1" -> "11" (render here)
        setFormState((prevState) => {
            const currErrorMessage = prevState.errors[name] || "";
            const shouldUpdateError = errorMessage !== currErrorMessage;

            // console.log("shouldUpdateError", shouldUpdateError);
            // console.log("shouldUpdateValue", shouldUpdateValue);

            if (shouldUpdateError || shouldUpdateValue) {
                // console.log("-- set new state");

                const newState = {
                    ...prevState,
                    ...(shouldUpdateError && {
                        errors: {
                            ...prevState.errors,
                            [name]: errorMessage,
                        },
                    }),
                    ...(shouldUpdateValue && {
                        values: {
                            ...prevState.values,
                            [name]: value,
                        },
                    }),
                };

                // console.log("newState", newState);
                return newState;
            }

            // console.log("prevState", prevState);
            return prevState;
        });
    };

    // исключить лишние рендеры при валидации
    // unregister field при демонтировании компонента
    // проверить, что схема настривается автоматически

    const onChange = useCallback(async (value, { target: { name } }) => {
        const shouldUpdateValue = refStore.current[name].watch;
        validateField(name, { shouldUpdateValue });
    }, []);

    const onBlur = useCallback(({ target: { name } }) => {
        //! validate triggers redundant render
        // console.log("❗ BLUR");
        // validateField(name);
    }, []);

    const reset = useCallback(() => {
        setDefaultValues();

        // reset errors (DRY)
        setFormState((state) => ({
            ...state,
            errors: {},
        }));
    }, []);

    // use stable callback for every name
    // иначе проискодит двойной вызов ref callback (null (1) => node (2))
    // todo: use refStore
    // const getCallbackRef = useCallbackWithParam(
    const getCallbackRef = (name) => (ref) => {
        // unregister
        if (!ref) {
            delete refStore.current[name];
            return;
        }

        // register
        refStore.current[name] = Object.assign(
            refStore.current[name] ?? {},
            {
                schema: schema?.[name] ?? null,
            },
            ref
        );
    };

    const register = (name) => {
        // todo: refactor
        if (!refStore.current[name]) refStore.current[name] = {}; //! DRY
        if (!refStore.current[name].refCallback) {
            refStore.current[name].refCallback = getCallbackRef(name);
        }

        const registerProps = {
            name,
            ref: refStore.current[name].refCallback,
            onChange,
            // onBlur,
            // todo: если нет схемы валидации, то и ошибку не передавать
            error: formState.errors[name],
        };

        return registerProps;
    };

    // useCallback???
    // todo: unify validation full object and separate field
    // todo: optimize renders (not always rerender is necessary)
    const handleSubmit = (submitHandler) => async (e) => {
        e.preventDefault();

        // todo: getData helper
        const [dataObj, schemaObj] = Object.entries(refStore.current).reduce(
            ([accData, accSchema], [name, { schema, getValue }]) => {
                const updAccData = {
                    ...accData,
                    [name]: getValue(),
                };

                const updAccSchema = schema
                    ? {
                          ...accSchema,
                          [name]: schema,
                      }
                    : accSchema;

                return [updAccData, updAccSchema];
            },
            [{}, {}]
        );

        try {
            await yup.object(schemaObj).validate(dataObj, { abortEarly: false });

            // todo: don't do anything if no errors were

            // reset errors
            setFormState((state) => ({
                ...state,
                errors: {},
            }));

            submitHandler(dataObj);
        } catch (err) {
            const errors = err.inner.reduce(
                (acc, { path, message }) => ({
                    ...acc,
                    [path]: message,
                }),
                {}
            );

            setFormState((state) => ({
                ...state,
                errors,
            }));
        }
    };

    const watch = (name) => {
        //! DRY
        if (!refStore.current[name]) refStore.current[name] = {};
        // todo: use deep set/get
        refStore.current[name].watch = true;
        return formState.values[name];
    };

    return {
        register,
        watch,
        handleSubmit,
        formState,
        reset,
        isValid: true /* get from schema*/,
    };
};
