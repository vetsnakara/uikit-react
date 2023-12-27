import { useState, useRef, memo, forwardRef } from "react";

import { FilePreview } from "./FilePreview";
import { FileAction } from "./constants";
import { useFormControlRef } from "../../hooks";

// todo: select multiple files

export const File = memo(
  forwardRef(
    (
      {
        title,
        labelIcon = "clip",
        labelText = "Прикрепить",
        description,
        error,
        file: initFile = null,
        onChange,
        ...otherProps
      },
      extRef
    ) => {
      const [file, setFile] = useState(initFile);

      const currFileRef = useRef(null); //?! is needed (use inputRef???)
      const actionRef = useRef();

      const { ref: inputRef, callbackRef } = useFormControlRef(
        extRef,
        (el) => ({
          el,
          getValue: () => currFileRef.current,
          setValue: (file) => {
            if (file) {
              // todo: combine setFile and currFileRef.current set to one func
              setFile(file);
              currFileRef.current = file;
              return;
            }

            // reset
            setFile(null);
            currFileRef.current = null;
          },
        })
      );

      // handle add/change
      const handleChange = (event) => {
        const { target: el } = event;

        //???
        if (actionRef.current === FileAction.Change && !el.files.length) return;

        const file = el.files[0] ?? null;

        setFile(file);
        currFileRef.current = file;

        onChange?.(file, event);
      };

      const handleAction = (event) => {
        const { target: el } = event;
        const { el: inputEl } = inputRef.current;

        if (el !== inputEl) {
          event.preventDefault();
          event.stopPropagation();
        }

        const { action } = el.dataset;
        if (!action) return;

        // save current action
        actionRef.current = action;

        switch (action) {
          case FileAction.Add:
          case FileAction.Change:
            inputEl.click();
            break;
          case FileAction.Remove:
            inputEl.value = null;
            inputEl.dispatchEvent(new Event("change", { bubbles: true })); //??? bubbles

            break;
        }
      };

      return (
        <label className="upload" onClick={handleAction}>
          <input
            type="file"
            ref={callbackRef}
            className="upload__control"
            onChange={handleChange}
            {...otherProps}
          />
          {!file && (
            <span
              data-action={FileAction.Add}
              className="upload__label button button_plain button_icontext"
            >
              <svg className="icon button__icon">
                <use href={`uikit/icon/icons.svg#${labelIcon}`}></use>
              </svg>
              {labelText}
            </span>
          )}
          {title && <span className="upload__title">{title}</span>}
          {error && <span className="upload__error">{error}</span>}
          {description && (
            <span className="upload__description">{description}</span>
          )}
          {file && (
            <span className="upload__info">
              <FilePreview file={file} edit remove />
            </span>
          )}
        </label>
      );
    }
  )
);
