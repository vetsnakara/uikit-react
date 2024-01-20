import { Paragraph, SectionSubtitle, SectionTitle, Span, Subtitle, TextColor, TextSize, Title } from "./Text";

export default {
    title: "uikit/Text",
    tags: ["autodocs"],
};

export const Default = () => (
    <>
        <Title>Title</Title>
        <Subtitle>Subtitle</Subtitle>
        <SectionTitle>SectionTitle</SectionTitle>
        <SectionSubtitle>SectionSubtitle</SectionSubtitle>
        <Paragraph>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse optio dolorem quaerat nobis nemo harum
            aperiam mollitia nulla tenetur quam atque consequatur quas temporibus officiis, nostrum cum vel iure
            architecto.
        </Paragraph>

        <Span size={TextSize.Big}>Span</Span>
        <Span>Span</Span>
        <Span size={TextSize.Small}>Span</Span>
        <Span size={TextSize.Smaller}>Span</Span>

        <br />

        <Span strong>Span</Span>
        <Span upper>Span</Span>

        <br />

        <Span color={TextColor.Approved}>Span</Span>
        <Span color={TextColor.Brand}>Span</Span>
        <Span color={TextColor.Important}>Span</Span>
        <Span color={TextColor.Muted}>Span</Span>
        <Span color={TextColor.Pale}>Span</Span>
        <Span color={TextColor.Positive}>Span</Span>
        <Span color={TextColor.Warning}>Span</Span>
    </>
);
