import { useState, useRef, memo } from "react";

import { FilePreview } from "./FilePreview";
import { FileAction } from "./constants";

export const File = memo(
    ({ title, labelIcon = "clip", labelText = "Прикрепить", description, error, file: initFile = null, onChange }) => {
        const inputRef = useRef();
        const actionRef = useRef();

        const [file, setFile] = useState(initFile);

        const handleChange = ({ target: { files } }) => {
            //???
            if (actionRef.current === FileAction.Change && !files.length) return;

            const file = _.first(files) ?? null;

            setFile(file);
            onChange?.(file);
        };

        const handleAction = (event) => {
            const { target: targetEl } = event;
            const { current: inputEl } = inputRef;

            if (targetEl !== inputEl) {
                event.preventDefault();
                event.stopPropagation();
            }

            const { action } = targetEl.dataset;
            if (!action) return;

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
                <input ref={inputRef} type="file" className="upload__control" onChange={handleChange} />
                {!file && (
                    <span data-action={FileAction.Add} className="upload__label button button_plain button_icontext">
                        <svg className="icon button__icon">
                            <use href={`uikit/icon/icons.svg#${labelIcon}`}></use>
                        </svg>
                        {labelText}
                    </span>
                )}
                {title && <span className="upload__title">{title}</span>}
                {error && <span class="upload__error">{error}</span>}
                {description && <span className="upload__description">{description}</span>}
                {file && (
                    <span className="upload__info">
                        <FilePreview file={file} edit remove />
                    </span>
                )}
            </label>
        );
    }
);
