import { maxWidth } from "../../../.storybook/decorators";
import { FileList, getId } from "./FileList";

export default {
    title: "inputs/FileList",
    decorators: [maxWidth(500)],
};

const file = {
    name: "Договор о партнерстве",
    size: 324234,
};

const getFiles = (count) =>
    Array(count)
        .fill(null)
        .map((id) => ({ id: getId(), ...file }));

const args = {
    title: "Вложения",
    description: "Допустимый размер файла 15 Мб",
};

export const Default = () => {
    const handleChange = (data) => {
        console.log("data", data);
    };

    const files = getFiles(3);
    console.log("files", files);

    return <FileList files={files} max={5} {...args} onChange={handleChange} />;
};

// export const PreviewEditable = () => <FilePreview {...file} edit remove />;

// export const PreviewDownload = () => <FilePreview {...file} url="file-url" />;

// export const Upload = () => <FileUpload {...args} />;
