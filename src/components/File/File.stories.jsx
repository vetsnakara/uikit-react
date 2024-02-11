import { File as FileUpload } from "./File";
import { FilePreview } from "./FilePreview";

import { maxWidth } from "@/storybook/decorators";

export default {
    title: "inputs/File",
    tags: ["autodocs"],
    decorators: [maxWidth(500)],
};

const file = {
    id: 1,
    name: "Договор о партнерстве",
    size: 324234,
};

const args = {
    title: "Файл договора",
    description: "Допустимый размер файла 15 Мб",
};

export const Preview = () => <FilePreview file={file} />;

export const PreviewEditable = () => <FilePreview file={file} edit remove />;

export const PreviewDownload = () => <FilePreview file={{ ...file, url: "file-url" }} />;

export const Upload = () => <FileUpload {...args} />;

export const Edit = () => <FileUpload {...args} file={file} />;
