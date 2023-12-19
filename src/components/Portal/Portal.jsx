import { createPortal } from "react-dom";

// todo: should have stories for Portal ???
export const Portal = ({ children, element = document.body }) => createPortal(children, element);
