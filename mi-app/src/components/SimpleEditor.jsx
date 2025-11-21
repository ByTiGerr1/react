import { useEffect, useRef } from "react";

export function Editor({ id, value, onTextChange, style, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && value !== undefined && value !== ref.current.innerHTML) {
      ref.current.innerHTML = value;
    }
  }, [value]);

  const manejarCambio = (event) => {
    const htmlValue = event.target.innerHTML;
    const textValue = event.target.innerText;
    onTextChange?.({ htmlValue, textValue, originalEvent: event });
  };

  return (
    <div
      id={id}
      ref={ref}
      contentEditable
      className="p-inputtext p-component"
      style={style}
      onInput={manejarCambio}
      dangerouslySetInnerHTML={{ __html: value || "" }}
      {...props}
    />
  );
}

export default Editor;
