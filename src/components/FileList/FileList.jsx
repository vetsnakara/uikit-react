import { useState, memo } from "react";

import { File } from "../File";

export const getId = () => Math.ceil(1e10 * Math.random()).toString();

const getFileInfo = (file) => ({
    id: getId(),
    ..._.pick(file, ["id", "name", "size", "type"]),
});

const mockFile = null;

export const FileList = memo(
    ({ title, description, files: initFiles = [], onChange, max = Number.POSITIVE_INFINITY }) => {
        //! heres is uncontrolled variant
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
                // <FilePreview file={file} />
                <File
                    key={id ?? getId()} //??? need random id
                    file={file}
                    title={isFirst && title}
                    description={isFirst && description}
                    onChange={(newFile) => handleChange(id, newFile)}
                />
            );
        });
    }
);
