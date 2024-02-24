import { memo } from "react";
import cn from "classnames";

import { Icon } from "@/components";
import { FileAction } from "./constants";

const getIcon = (name) => <Icon name={name} className="button__icon" />;

const DownloadButton = ({ file: { url }, downloadName = true }) => (
    <a className="button button_icontext button_plain" download={downloadName} href={url}>
        {getIcon("download")}
        Скачать
    </a>
);

const EditButton = () => (
    <button data-action={FileAction.Change} className="file-preview__action button button_plain" type="button">
        {getIcon("pen")}
    </button>
);

const RemoveButton = () => (
    <button data-action={FileAction.Remove} className="button-close file-preview__action" type="button">
        {getIcon("close")}
    </button>
);

const ActionButtons = (props) => {
    const {
        edit = false,
        remove = false,
        file: { url = "" },
    } = props;

    const Components = {
        ...(edit && { edit: EditButton }),
        ...(remove && { remove: RemoveButton }),
        ...(url && { download: DownloadButton }),
    };

    const hasActions = Object.keys(Components).length > 0;

    return hasActions ? (
        <span className="file-preview__actions">
            {Object.entries(Components).map(([key, Component]) => (
                <Component key={key} {...props} />
            ))}
        </span>
    ) : null;
};

const Info = ({ file: { name, size } }) => (
    <span className="file-preview__wrapper">
        {/* link ??? */}
        <a className="file-preview__name link" href="#" target="_blank">
            {name}
        </a>
        <span className="file-preview__data">{size}</span>
    </span>
);

export const FilePreview = memo((props) => {
    const { file } = props;

    const classNames = cn("file-preview", { "file-preview_extended": Boolean(file.url) });

    return (
        <span className={classNames}>
            <img
                className="file-preview__type-img"
                src="uikit/file-preview/pdf.svg"
                width="32"
                height="32"
                alt="Файл"
            />
            <Info file={file} />
            <ActionButtons {...props} />
        </span>
    );
});
