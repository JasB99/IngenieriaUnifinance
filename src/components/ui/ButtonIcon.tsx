//clase para definir un boton con imagen - CTA
interface ButtonIconProps {
  style: string;
  text?: string;
  urlImg?: string;
  altImg?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export default function ButtonIcon(props: ButtonIconProps) {
  return (
    <button className={props.style} onClick={props.onClick} type="button">
      <img src={props.urlImg} alt={props.altImg} />
      {props.text}
    </button>
  );
}
