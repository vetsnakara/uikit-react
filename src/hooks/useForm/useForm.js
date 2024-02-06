import { useCallback, useMemo, useRef, useState } from "react";
// import * as yup from "yup";

import { useProxyState } from "../useProxyState";

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
// todo: validate on init ?
// todo!: case of dynamically added/removed array-like form fields (analog of useArrayField)
// todo!: case of nested form object of values (not flat as now)

//! note: преимущество - хук ничего не знает про типы контролов (для документации)

//   const get = (obj, name, defaultValue) => {};

// !TODO: create TWO refs: mainEl, inputEl
// !TODO: поместить name в ref?

const isUndefined = (value) => value === undefined;

export const useForm = ({ defaultValues = {}, schema } = {}) => {
    const refStore = useRef({});

    // const registerOrder = [];

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    const _names = useMemo(
        () => ({
            watch: new Set(),
            watchAll: false,
        }),
        []
    );

    // todo: formState should be proxied
    // todo: case of error not readed ???
    // todo: set default values to watched fields
    const {
        // state: formState,
        proxyState: proxyFormState,
        updateState: updateFormState,
    } = useProxyState({
        isValid: true, // todo!: calculate initially (use func argument) do it silently (don't show error messages before submit button is clicked)
        isSubmitted: false,
        // dirty: ...,
        //? errors: ...
    });

    // useEffect(() => {
    //     setDefaultValues({ init: true });
    // }, []);

    // todo: don't use setDefaultValues on init
    // todo: don't set default value if current value didn't change
    const setDefaultValues = () => {
        for (const name of Object.keys(refStore.current)) {
            const { mounted, defaultValue, setValue } = refStore.current[name];

            // const hasExternalDefaultValue = !isUndefined(defaultValues[name]);
            const shouldSetValue = mounted && !isUndefined(defaultValue);
            if (shouldSetValue) setValue(defaultValue);

            const watched = _names.watch.has(name);
            if (watched) {
                setValues((values) => ({
                    ...values,
                    [name]: defaultValue,
                }));
            }
        }
    };

    const resetValues = () => {
        for (const name of Object.keys(refStore.current)) {
            const { setValue, mounted } = refStore.current[name];
            if (mounted) setValue();
        }
    };

    const resetErrors = () => setErrors({});

    const getData = () =>
        Object.entries(refStore.current).reduce(
            (acc, [name, { getValue }]) => ({
                ...acc,
                [name]: getValue(),
            }),
            {}
        );
    [];

    const getSchema = () =>
        Object.entries(refStore.current).reduce(
            (acc, [name, { schema }]) => ({
                ...acc,
                [name]: schema,
            }),
            {}
        );

    // todo: extract as util
    const validate = (data, schema) => yup.object(schema).validate(data, { abortEarly: true });

    const validateField = async (name, { shouldUpdateValue = false } = {}) => {
        const { getValue, schema } = refStore.current[name];
        const value = getValue();

        let errorMessage = "";

        try {
            if (schema) {
                const valueObj = { [name]: value };
                const schemaObj = { [name]: schema };

                await validate(valueObj, schemaObj);
            }
        } catch ({ message }) {
            errorMessage = message;
        }

        if (shouldUpdateValue) {
            setValues((values) => ({
                ...values,
                [name]: value,
            }));
        }

        // todo: разобраться с лишним рендером
        // todo: "1" -> "" -> "1" -> "11" (render here)
        // todo: remove error field if no error case
        setErrors((prevErrors) => {
            const currErrorMessage = prevErrors[name] || "";
            const shouldUpdateError = errorMessage !== currErrorMessage;

            return shouldUpdateError
                ? {
                      ...prevErrors,
                      [name]: errorMessage,
                  }
                : prevErrors;
        });

        const isValid = !hasErrors({ ...errors, [name]: errorMessage });
        updateFormState("isValid", isValid);
    };

    // исключить лишние рендеры при валидации
    // unregister field при демонтировании компонента
    // проверить, что схема настривается автоматически
    const onChange = useCallback(async (value, event) => {
        const {
            target: { name },
        } = event;

        console.log("useForm:onChange", name);

        const shouldUpdateValue = _names.watchAll || _names.watch.has(name);
        validateField(name, { shouldUpdateValue });
    }, []);

    // const onBlur = useCallback(({ target: { name } }) => {
    //     //! validate triggers redundant render
    //     // validateField(name);
    // }, []);

    // todo: reset should work for no defaultValues case (reset to clear form)
    // todo: clear form method is needed to (and clear single field)
    // todo: reset/clear/clearError for single field
    const reset = useCallback(() => {
        setDefaultValues();
        resetErrors();
    }, []);

    const clear = useCallback(() => {
        resetValues();
        resetErrors();
    }, []);

    // use stable callback for every name
    // иначе проискодит двойной вызов ref callback (null (1) => node (2))
    // todo: use refStore
    //?! is needed el in ref object
    // info: callback ref is called with NOT null when dom element is accessible (before mount or after? - check it)
    // info: callback ref is called witn null before unmount (element exists during the call)
    const getCallbackRef = (name) => (ref) => {
        // if (name === "attorneyDateBegin") {
        //     console.log("--- callbackRef", name);
        // }

        // unregister
        if (!ref) {
            // todo: удалять если установлен флаг shouldUnregister
            // delete refStore.current[name];

            // save current value to restore after mount
            // todo?: can we do in onUnmount ? (скорее всего нет, т.к. элемента уже нет - проверить)
            const { getValue } = refStore.current[name];
            refStore.current[name].currentValue = getValue();
            refStore.current[name].mounted = false;

            return;
        }

        // register
        const externalDefaultValue = defaultValues[name];
        const innerDefaultValue = ref.getValue();

        // note: defaultValue can be null
        const hasExternalDefaultValue = !isUndefined(externalDefaultValue);

        Object.assign(refStore.current[name], ref, {
            schema: schema?.[name] ?? null,
            // ? is needed: move to set default values ?
            defaultValue: hasExternalDefaultValue ? externalDefaultValue : innerDefaultValue,
            mounted: true,
        });

        // todo: реализовать setMountFn (setUnmount? use for unregister?) in all components
        // todo: проверить установку и сброс дефолтных значений по кнопке

        ref.setOnMount?.(() => {
            // console.log(name, "mounted");
            // todo: set value here (current or default)?
            const { defaultValue, currentValue } = refStore.current[name];
            refStore.current[name].setValue(_.isUndefined(currentValue) ? defaultValue : currentValue);
        });

        // todo: проверить очередность срабатывания useEffect во внешних и вложенных компонентах (по идее, вначале должны срабатывать во вложенных)
    };

    // todo!
    // проверить последовательность вызовов useEffect (+clean function) and ref callbaak during mount/unmount pahses

    // info: вызывается во время рендера
    const register = (name) => {
        // todo: refactor
        // todo: use deep set
        // note: обеспечиваем стабильность сслки на callbackRef
        // todo: стабилизировать ссылку по-другому, через useEvent
        if (!refStore.current[name]) refStore.current[name] = {}; //! DRY
        if (!refStore.current[name].refCallback) {
            refStore.current[name].refCallback = getCallbackRef(name);
        }

        // set names to watch
        if (_names.watchAll) _names.watch.add(name);

        const registerProps = {
            name,
            ref: refStore.current[name].refCallback,
            onChange,
            // onBlur,
            // todo: если нет схемы валидации, то и ошибку не передавать
            // todo: use shouldExposeError
            error: errors[name], // todo: отдавать ошибку, если isSubmitted: true или isValid: isUsed
        };

        return registerProps;
    };

    // useCallback???
    // todo: unify validation full object and separate field
    // todo: optimize renders (not always rerender is necessary)
    const handleSubmit = (submitHandler) => async (e) => {
        e.preventDefault();

        const data = getData();
        const schema = getSchema();

        // todo: move to utils (and others)
        // Run validation for each field with abortEarly: true
        // https://github.com/jquense/yup/issues/569
        const promises = Object.keys(refStore.current).map((name) => {
            const fieldData = { [name]: data[name] };
            const fieldSchema = { [name]: schema[name] };
            return validate(fieldData, fieldSchema);
        });

        const result = await Promise.allSettled(promises);

        const errors = result
            .filter(({ status }) => status === "rejected")
            .map(({ reason }) => reason)
            .reduce((acc, { path, message }) => ({ ...acc, [path]: message }), {});

        // todo: don't set errors if errors didn't change
        setErrors(errors);

        const isValid = !hasErrors(errors);
        if (isValid) submitHandler(data);

        updateFormState("isSubmitted", true);
    };

    // todo: to utils
    const hasErrors = (errors) => {
        if (!errors) return false;

        const hasKeys = Object.keys(errors).length > 0;
        if (!hasKeys) return false;

        return Object.values(errors).filter(Boolean).length > 0;
    };

    /**
     * @param {string|string[]|undefined} name
     * @returns
     * ! name can be callback function (call on field change, return unsub)
     */
    const watch = (name) => {
        const watchAll = !name;
        if (!name) _names.watchAll = watchAll;

        let namesArr = [];
        if (!watchAll) namesArr = Array.isArray(name) ? name : [name];
        namesArr.forEach((name) => _names.watch.add(name));

        const res = [..._names.watch].reduce(
            (acc, name) => {
                const value = !isUndefined(values[name]) ? values[name] : refStore.current?.[name]?.getValue();

                return {
                    ...acc,
                    ...(!isUndefined(value) && {
                        [name]: value,
                    }),
                };
            },
            watchAll ? defaultValues : _.pick(defaultValues, namesArr)
        );

        return typeof name === "string" ? res[name] : res;
    };

    return {
        register,
        // unregister,
        watch,
        handleSubmit,
        formState: proxyFormState,
        // getFormStateWithoutRedner,
        reset,
        clear,
        getData,
    };
};
