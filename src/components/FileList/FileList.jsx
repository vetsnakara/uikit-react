import { memo, useState } from "react";

import { File } from "@/components";

export const getId = () => Math.ceil(1e10 * Math.random()).toString();

const getFileInfo = (file) => ({
    id: getId(),
    ..._.pick(file, ["id", "name", "size", "type"]),
});

const mockFile = null;

export const FileList = memo((props) => {
    const { title, description, files: initFiles = [], onChange, max = Number.POSITIVE_INFINITY } = props;

    const [files, setFiles] = useState(initFiles);

    const handleChange = (id = null, file) => {
        setFiles((files) => {
            if (!id) return [...files, getFileInfo(file)];
            else if (!file) return files.filter((f) => f.id !== id);
            else return files.map((f) => (f.id === id ? getFileInfo(file) : f));
        });

        onChange({ id, file });
    };

    const canAdd = files.length < max;
    const filesToRender = [...files].concat(canAdd ? mockFile : []);

    return filesToRender.map((file, index) => {
        const { id } = file ?? {};
        const isFirst = index === 0;

        return (
            <File
                key={id ?? getId()}
                file={file}
                title={isFirst && title}
                description={isFirst && description}
                onChange={(newFile) => handleChange(id, newFile)}
            />
        );
    });
});
