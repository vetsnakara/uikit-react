import { Avatar, AvatarSize } from "./Avatar";

export default {
    title: "uikit/Avatar",
};

const options = {
    src: "https://via.placeholder.com/640x480.jpg?text=Image",
};

export const Default = () => (
    <>
        <Avatar {...options} size={AvatarSize.Smallest} />
        <Avatar {...options} size={AvatarSize.Small} />
        <Avatar {...options} />
        <Avatar {...options} size={AvatarSize.Medium} />
        <Avatar {...options} size={AvatarSize.Big} />
    </>
);

export const Rounded = () => <Avatar {...options} rounded />;
