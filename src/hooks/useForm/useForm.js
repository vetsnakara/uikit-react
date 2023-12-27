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
// todo: validate on init ?
// todo!: case of dynamically added/removed array-like form fields (analog of useArrayField)
// todo!: case of nested form object of values (not flat as now)

//! note: преимущество - хук ничего не знает про типы контролов (для документации)

//   const get = (obj, name, defaultValue) => {};

// !TODO: create TWO refs: mainEl, inputEl
// !TODO: поместить name в ref?

const isUndefined = (value) => value === undefined;

export const useForm = ({ defaultValues = {}, schema } = {}) => {
  console.log("⚡ useForm: render");

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
  const [formState, setFormState] = useState({
    // isValid: ...,
    // submited: ...,
    // dirty: ...,
    //? errors: ...
  });

  useEffect(() => {
    setDefaultValues({ init: true });
  }, []);

  const setDefaultValues = ({ init = false } = {}) => {
    for (const name of Object.keys(refStore.current)) {
      // note: defaultValue = defaultValues[name] || innerDefaultValue
      const { setValue, defaultValue } = refStore.current[name];

      const hasExternalDefaultValue = !isUndefined(defaultValues[name]);
      const shouldSetDefaultValue = !init || (init && hasExternalDefaultValue);

      // todo: don't set default value if current value didn't change

      if (shouldSetDefaultValue) setValue(defaultValue);
    }
  };

  const resetValues = () => {
    for (const name of Object.keys(refStore.current)) {
      const { setValue } = refStore.current[name];
      setValue();
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
  const validate = (data, schema) =>
    yup.object(schema).validate(data, { abortEarly: true });

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
  };

  // исключить лишние рендеры при валидации
  // unregister field при демонтировании компонента
  // проверить, что схема настривается автоматически
  const onChange = useCallback(async (value, event) => {
    const {
      target: { name },
    } = event;

    const shouldUpdateValue = _names.watchAll || _names.watch.has(name);
    validateField(name, { shouldUpdateValue });
  }, []);

  const onBlur = useCallback(({ target: { name } }) => {
    //! validate triggers redundant render
    // validateField(name);
  }, []);

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
  const getCallbackRef = (name) => (ref) => {
    // unregister
    if (!ref) {
      delete refStore.current[name];
      return;
    }

    // register
    const externalDefaultValue = defaultValues[name];
    const innerDefaultValue = ref.getValue();

    // note: defaultValue can be null
    const hasExternalDefaultValue = !isUndefined(externalDefaultValue);

    Object.assign(refStore.current[name], ref, {
      schema: schema?.[name] ?? null,
      defaultValue: hasExternalDefaultValue
        ? externalDefaultValue
        : innerDefaultValue,
    });
  };

  const register = (name) => {
    // todo: refactor
    // todo: use deep set
    // note: обеспечиваем стабильность сслки на callbackRef
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
      error: errors[name],
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

    const isValid = Object.keys(errors).length === 0;
    if (isValid) submitHandler(data);
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
        const value = !isUndefined(values[name])
          ? values[name]
          : refStore.current?.[name]?.getValue();

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
    formState, //! proxy: codesandbox
    // getFormStateWithoutRedner,
    reset,
    clear,
    getData,
  };
};
