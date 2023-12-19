import { useState, useRef, useMemo, forwardRef, useEffect } from "react";

import { maxWidth } from "../../../.storybook/decorators";
import { Button, ButtonVariant } from "../Button";
import { Input } from "./Input";
import { composeRef } from "../../hooks/useElementRef";

export default {
  title: "uikit/Input",
  decorators: [maxWidth(500)],
};

// todo: password, capcha, with prev text (see assets/redesign-theme)
// todo: search button don't work

export const Default = () => <Input />;

export const Uncontrolled = () => {
  const [value, setValue] = useState("");
  const inputRef = useState(null);
  const renderCountRef = useRef(0);

  renderCountRef.current += 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(inputRef.current.getValue());
  };

  const handleClickFocus = () => {
    inputRef.current.el.focus();
  };

  return (
    <>
      <p>Render count: {renderCountRef.current}</p>
      <p>Input value: {value}</p>
      <form onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          defaultValue="Hello"
          onChange={(value) => {
            console.log("value", value);
            console.log("ref.current.getValue()", inputRef.current.getValue());
          }}
        />
        <Button type="submit">Submit Form</Button>
      </form>
      <Button onClick={handleClickFocus}>Focus</Button>
    </>
  );
};

export const Controlled = () => {
  const [value, setValue] = useState("");
  const renderCountRef = useRef(0);

  renderCountRef.current += 1;

  return (
    <>
      <p>Render count: {renderCountRef.current}</p>
      <p>Input value: {value}</p>
      <Input value={value} onChange={setValue} />
    </>
  );
};

export const Title = () => <Input title="Title" />;

export const Error = () => <Input error="Error text" />;

export const Mask = () => {
  const [mask, setMask] = useState("phone");

  const maskOptions = useMemo(() => {
    if (mask === "phone")
      return {
        mask: "+\\7(99[9]) 999-99-99",
      };
    if (mask === "email")
      return {
        alias: "email",
      };
  }, [mask]);

  console.log("maskOptions", maskOptions);

  return (
    <>
      <Input maskOptions={maskOptions} />
      {/* todo: use HStack */}
      <div>
        <Button variant={ButtonVariant.Plain} onClick={() => setMask("phone")}>
          Change to Phone Mask
        </Button>
        <br />
        <Button variant={ButtonVariant.Plain} onClick={() => setMask("email")}>
          Change to Email Mask
        </Button>
      </div>
    </>
  );
};

export const Disabled = () => <Input disabled />;

export const Required = () => <Input title="Title" required />;

export const Readonly = () => <Input defaultValue="123" readOnly />;

// todo: create separate kind of input
export const Search = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <Input
        defaultValue="123"
        placeholder="Поиск"
        type="search"
        onSubmit={setValue}
        onChange={(value) => console.log("SearchInput:value", value)}
      />
      <div>value: {value}</div>
    </>
  );
};

const InputRef = forwardRef((props, extRef) => {
  const innerRef = useRef({});

  const ref = (el) => {
    innerRef.current = {
      el,
      getValue() {},
      setValue() {},
    };

    if (!extRef) return;
    if (typeof extRef === "function") extRef(innerRef.current);
    else extRef.current = innerRef.current;
  };

  return <input ref={ref} />;
});

export const TestInputRef = () => {
  const ref = useRef();

  useEffect(() => {
    console.log("ref", ref);
  }, []);

  return <InputRef ref={console.log} />;
};
